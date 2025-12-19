import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Plus, ImageIcon, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Room } from "@/lib/types"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: rooms } = await supabase
    .from("rooms")
    .select("*, artworks(count)")
    .eq("artist_id", user.id)
    .order("created_at", { ascending: false })

  const { data: stats } = await supabase.from("artworks").select("id", { count: "exact" }).eq("artist_id", user.id)

  const { data: upcomingExhibits } = await supabase
    .from("exhibits")
    .select("*", { count: "exact" })
    .eq("artist_id", user.id)
    .eq("is_released", false)
    .gte("scheduled_date", new Date().toISOString())

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Welcome back, {profile?.display_name || "Artist"}</h1>
            <p className="text-muted-foreground mt-2">Manage your virtual galleries and exhibitions</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/timeline">
                <Clock className="mr-2 w-5 h-5" />
                Timeline
              </Link>
            </Button>
            <Button asChild size="lg" className="h-12">
              <Link href="/dashboard/rooms/new">
                <Plus className="mr-2 w-5 h-5" />
                Create Room
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rooms?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Virtual exhibition spaces</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.count || 0}</div>
              <p className="text-xs text-muted-foreground">Pieces in collection</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exhibits</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingExhibits?.count || 0}</div>
              <p className="text-xs text-muted-foreground">Scheduled releases</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Rooms</h2>
          </div>

          {!rooms || rooms.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardHeader className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <CardTitle>No rooms yet</CardTitle>
                <CardDescription>Create your first exhibition room to get started</CardDescription>
                <Button asChild className="mt-6">
                  <Link href="/dashboard/rooms/new">
                    <Plus className="mr-2 w-4 h-4" />
                    Create Your First Room
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room: Room & { artworks: { count: number }[] }) => (
                <Link key={room.id} href={`/dashboard/rooms/${room.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div
                          className="w-12 h-12 rounded-xl"
                          style={{
                            background: getCubeColor(room.color_theme),
                          }}
                        />
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${room.is_published ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}`}
                        >
                          {room.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">{room.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{room.description || "No description"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>{room.artworks?.[0]?.count || 0} artworks</span>
                        </div>
                      </div>
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
