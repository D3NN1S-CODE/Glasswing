import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar } from "lucide-react"
import Link from "next/link"
import type { Room } from "@/lib/types"
import { FollowButton } from "@/components/follow-button"

export default async function ArtistProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await createClient()

  const { data: artist, error: artistError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single()

  if (artistError || !artist) {
    notFound()
  }

  const { data: rooms } = await supabase
    .from("rooms")
    .select("*, artworks(count)")
    .eq("artist_id", artist.id)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  const { data: upcomingExhibits } = await supabase
    .from("exhibits")
    .select("*, room:rooms(*)")
    .eq("artist_id", artist.id)
    .eq("is_released", false)
    .gte("scheduled_date", new Date().toISOString())
    .order("scheduled_date", { ascending: true })

  const { data: followerCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", artist.id)

  const { data: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", artist.id)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isFollowing = false
  if (user) {
    const { data: followData } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", user.id)
      .eq("following_id", artist.id)
      .single()

    isFollowing = !!followData
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 space-y-8">
        <Card className="border-2 shadow-xl">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl font-bold text-primary-foreground">
                {artist.display_name?.[0] || "A"}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">{artist.display_name}</h1>
                  <p className="text-muted-foreground text-lg">@{artist.username}</p>
                </div>

                {artist.bio && <p className="text-lg text-muted-foreground leading-relaxed">{artist.bio}</p>}

                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="font-bold text-xl">{followerCount?.count || 0}</span>
                    <span className="text-muted-foreground ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl">{followingCount?.count || 0}</span>
                    <span className="text-muted-foreground ml-1">following</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl">{rooms?.length || 0}</span>
                    <span className="text-muted-foreground ml-1">galleries</span>
                  </div>
                </div>

                {user && user.id !== artist.id && (
                  <FollowButton artistId={artist.id} isFollowing={isFollowing} currentUserId={user.id} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {upcomingExhibits && upcomingExhibits.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Upcoming Exhibits</h2>
            <div className="grid gap-4">
              {upcomingExhibits.map((exhibit) => (
                <Card key={exhibit.id} className="border-orange-500/30 bg-orange-500/5">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{exhibit.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{exhibit.room?.title}</p>
                        {exhibit.description && (
                          <p className="text-sm text-muted-foreground mt-2">{exhibit.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(exhibit.scheduled_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Galleries</h2>

          {!rooms || rooms.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                <User className="w-16 h-16 text-muted-foreground" />
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">No galleries yet</h3>
                  <p className="text-muted-foreground">This artist hasn't published any galleries</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room: Room & { artworks: { count: number }[] }) => (
                <Link key={room.id} href={`/gallery/${artist.id}/${room.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
                    <CardHeader>
                      <div
                        className="w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: getCubeColor(room.color_theme),
                        }}
                      />
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {room.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {room.description || "No description"}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <span className="text-xs text-muted-foreground">{room.artworks?.[0]?.count || 0} artworks</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getCubeColor(theme: string) {
  const colors: Record<string, string> = {
    blue: "oklch(0.52 0.19 252)",
    red: "oklch(0.59 0.23 25)",
    orange: "oklch(0.62 0.23 28)",
    yellow: "oklch(0.92 0.15 94)",
    green: "oklch(0.54 0.16 145)",
    white: "oklch(0.95 0.01 0)",
  }
  return colors[theme] || colors.blue
}
