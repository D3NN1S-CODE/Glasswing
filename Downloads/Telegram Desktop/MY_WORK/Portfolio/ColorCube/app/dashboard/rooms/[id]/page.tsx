import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Plus, Eye, Settings, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import type { Artwork } from "@/lib/types"
import { UploadArtworkDialog } from "@/components/upload-artwork-dialog"
import { DeleteArtworkButton } from "@/components/delete-artwork-button"

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

  const { data: artworks } = await supabase
    .from("artworks")
    .select("*")
    .eq("room_id", id)
    .order("position", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl" style={{ background: getCubeColor(room.color_theme) }} />
              <div>
                <h1 className="text-4xl font-bold tracking-tight">{room.title}</h1>
                <p className="text-muted-foreground mt-1">{room.description || "No description"}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!room.is_published ? (
              <Button variant="outline" disabled title="Publish this room first">
                <Eye className="mr-2 w-4 h-4" />
                Preview
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={`/gallery/${user.id}/${id}`}>
                  <Eye className="mr-2 w-4 h-4" />
                  Preview
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href={`/dashboard/rooms/${id}/settings`}>
                <Settings className="w-4 h-4" />
              </Link>
            </Button>
            <UploadArtworkDialog roomId={id} />
          </div>
        </div>

        {!room.is_published && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              To preview your room, you must first publish it. Go to{" "}
              <Button variant="link" asChild className="h-auto p-0 text-amber-800 underline">
                <Link href={`/dashboard/rooms/${id}/settings`}>Settings</Link>
              </Button>{" "}
              to publish.
            </AlertDescription>
          </Alert>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Artworks ({artworks?.length || 0})</h2>
          </div>

          {!artworks || artworks.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">No artworks yet</h3>
                  <p className="text-muted-foreground">Upload your first artwork to this room</p>
                </div>
                <UploadArtworkDialog roomId={id} />
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {artworks.map((artwork: Artwork) => (
                <Card key={artwork.id} className="group overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={artwork.image_url || "/placeholder.svg"}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <DeleteArtworkButton artworkId={artwork.id} />
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-1">
                    <h3 className="font-semibold truncate">{artwork.title}</h3>
                    {artwork.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{artwork.description}</p>
                    )}
                  </CardContent>
                </Card>
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
