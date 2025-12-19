import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ImageIcon, CalendarIcon } from "lucide-react"
import Link from "next/link"
import type { Room, Exhibit } from "@/lib/types"

export default async function TimelinePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  const { data: rooms } = await supabase
    .from("rooms")
    .select("*, artworks(count)")
    .eq("artist_id", user.id)
    .order("created_at", { ascending: false })

  const { data: exhibits } = await supabase
    .from("exhibits")
    .select("*, room:rooms(*)")
    .eq("artist_id", user.id)
    .order("scheduled_date", { ascending: false })

  // Group items by year and month
  const timelineItems = [
    ...(rooms?.map((room) => ({
      type: "room" as const,
      date: new Date(room.created_at),
      data: room,
    })) || []),
    ...(exhibits?.map((exhibit) => ({
      type: "exhibit" as const,
      date: new Date(exhibit.scheduled_date),
      data: exhibit,
    })) || []),
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  const groupedTimeline = timelineItems.reduce(
    (acc, item) => {
      const yearMonth = `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, "0")}`
      if (!acc[yearMonth]) {
        acc[yearMonth] = []
      }
      acc[yearMonth].push(item)
      return acc
    },
    {} as Record<string, typeof timelineItems>,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Project Timeline</h1>
            <p className="text-muted-foreground mt-2">Track your creative journey and upcoming exhibits</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/exhibits/new">
                <CalendarIcon className="mr-2 w-5 h-5" />
                Schedule Exhibit
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/dashboard/rooms/new">
                <Plus className="mr-2 w-5 h-5" />
                Create Room
              </Link>
            </Button>
          </div>
        </div>

        {Object.keys(groupedTimeline).length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
              <CalendarIcon className="w-16 h-16 text-muted-foreground" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">No timeline events yet</h3>
                <p className="text-muted-foreground">Create rooms and schedule exhibits to build your timeline</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedTimeline).map(([yearMonth, items]) => {
              const [year, month] = yearMonth.split("-")
              const monthName = new Date(Number.parseInt(year), Number.parseInt(month) - 1).toLocaleString("default", {
                month: "long",
              })

              return (
                <div key={yearMonth} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold">
                      {monthName} {year}
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="space-y-4 pl-8 border-l-2 border-primary/30">
                    {items.map((item, index) => (
                      <div key={index} className="relative">
                        <div
                          className="absolute -left-[calc(2rem+1px)] top-3 w-4 h-4 rounded-full border-4 border-background"
                          style={{
                            background:
                              item.type === "room"
                                ? getCubeColor((item.data as Room).color_theme)
                                : "oklch(0.62 0.23 28)",
                          }}
                        />

                        {item.type === "room" ? (
                          <Link href={`/dashboard/rooms/${(item.data as Room).id}`}>
                            <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3">
                                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                      <CardTitle className="text-xl">{(item.data as Room).title}</CardTitle>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        Room created •{" "}
                                        {(item.data as Room & { artworks: { count: number }[] }).artworks?.[0]?.count ||
                                          0}{" "}
                                        artworks
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {item.date.toLocaleDateString()}
                                  </span>
                                </div>
                              </CardHeader>
                              {(item.data as Room).description && (
                                <CardContent>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {(item.data as Room).description}
                                  </p>
                                </CardContent>
                              )}
                            </Card>
                          </Link>
                        ) : (
                          <Card
                            className={`${
                              (item.data as Exhibit).is_released
                                ? "border-green-500/30 bg-green-500/5"
                                : "border-orange-500/30 bg-orange-500/5"
                            }`}
                          >
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                                  <div>
                                    <CardTitle className="text-xl">{(item.data as Exhibit).title}</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Exhibit{" "}
                                      {(item.data as Exhibit).is_released
                                        ? "released"
                                        : new Date((item.data as Exhibit).scheduled_date) > new Date()
                                          ? "scheduled"
                                          : "pending"}{" "}
                                      • {(item.data as Exhibit).room?.title}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground">{item.date.toLocaleDateString()}</span>
                              </div>
                            </CardHeader>
                            {(item.data as Exhibit).description && (
                              <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {(item.data as Exhibit).description}
                                </p>
                              </CardContent>
                            )}
                          </Card>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
