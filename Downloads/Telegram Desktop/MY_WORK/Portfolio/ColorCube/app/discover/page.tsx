import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, User } from "lucide-react"
import Link from "next/link"
import type { Profile, Room } from "@/lib/types"
import { FollowButton } from "@/components/follow-button"

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let artistsQuery = supabase
    .from("profiles")
    .select("*, rooms(count)")
    .order("created_at", { ascending: false })
    .limit(20)

  if (q) {
    artistsQuery = artistsQuery.or(`display_name.ilike.%${q}%,username.ilike.%${q}%`)
  }

  const { data: artists } = await artistsQuery

  const { data: featuredRooms } = await supabase
    .from("rooms")
    .select("*, artist:profiles(*), artworks(count)")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6)

  let following: string[] = []
  if (user) {
    const { data: followingData } = await supabase.from("follows").select("following_id").eq("follower_id", user.id)

    following = followingData?.map((f) => f.following_id) || []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-balance">Discover Artists</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Explore virtual galleries from creators around the world
          </p>
        </div>

        <form action="/discover" method="GET" className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input name="q" placeholder="Search for artists..." defaultValue={q} className="h-14 pl-12 text-base" />
          </div>
        </form>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Galleries</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredRooms?.map((room: Room & { artist: Profile; artworks: { count: number }[] }) => (
              <Link key={room.id} href={`/gallery/${room.artist_id}/${room.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-16 h-16 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: getCubeColor(room.color_theme),
                        }}
                      />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{room.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{room.description || "No description"}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{room.artist.display_name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{room.artworks?.[0]?.count || 0} works</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Artists</h2>

          <div className="grid gap-4">
            {artists?.map((artist: Profile & { rooms: { count: number }[] }) => (
              <Card key={artist.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Link href={`/artist/${artist.username}`} className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                        {artist.display_name?.[0] || "A"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold hover:text-primary transition-colors">
                          {artist.display_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">@{artist.username}</p>
                        {artist.bio && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{artist.bio}</p>}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{artist.rooms?.[0]?.count || 0} galleries</span>
                        </div>
                      </div>
                    </Link>
                    {user && user.id !== artist.id && (
                      <FollowButton
                        artistId={artist.id}
                        isFollowing={following.includes(artist.id)}
                        currentUserId={user.id}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
