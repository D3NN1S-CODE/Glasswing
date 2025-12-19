import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PublishRoomButton } from "@/components/publish-room-button"

export default async function RoomSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .eq("artist_id", user.id)
    .single()

  if (roomError || !room) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/rooms/${id}`}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Room
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Room Settings</h1>
          <p className="text-muted-foreground">Manage your exhibition room</p>
        </div>

        <div className="grid gap-6 max-w-2xl">
          {/* Publish Section */}
          <Card>
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
              <CardDescription>
                Control who can view your exhibition room
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PublishRoomButton roomId={id} isPublished={room.is_published} />
              <p className="text-xs text-muted-foreground mt-4">
                {room.is_published
                  ? "Your room is publicly visible. Anyone with the link can view your exhibition and artworks."
                  : "Your room is private. Only you can view it from your dashboard. Publish it to share with others."}
              </p>
            </CardContent>
          </Card>

          {/* Room Info Section */}
          <Card>
            <CardHeader>
              <CardTitle>Room Information</CardTitle>
              <CardDescription>Basic details about your exhibition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Title</p>
                <p className="text-lg font-semibold">{room.title}</p>
              </div>
              {room.description && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-base">{room.description}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Color Theme</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-lg" style={{ background: getCubeColor(room.color_theme) }} />
                  <p className="text-base capitalize">{room.color_theme}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p className="text-base">{new Date(room.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
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
