import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { GalleryWalkthrough } from "@/components/gallery-walkthrough"

export default async function GalleryViewPage({
  params,
}: {
  params: Promise<{ artistId: string; roomId: string }>
}) {
  const { artistId, roomId } = await params
  const supabase = await createClient()

  // First, verify the artist exists and get their profile
  const { data: artist } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", artistId)
    .single()

  if (!artist) {
    notFound()
  }

  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .eq("is_published", true)
    .single()

  if (roomError || !room) {
    notFound()
  }

  // Verify the room belongs to the artist
  if (room.artist_id !== artistId) {
    notFound()
  }

  const { data: artworks } = await supabase
    .from("artworks")
    .select("*")
    .eq("room_id", roomId)
    .order("position", { ascending: true })

  return <GalleryWalkthrough room={room} artworks={artworks || []} artist={{ display_name: artist.display_name, username: artist.username }} backHref={`/dashboard/rooms/${roomId}`} />
}
