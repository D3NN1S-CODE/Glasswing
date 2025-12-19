"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Room } from "@/lib/types"

export default function NewExhibitPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    room_id: "",
    scheduled_date: "",
  })

  useEffect(() => {
    const fetchRooms = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase.from("rooms").select("*").eq("artist_id", user.id).order("created_at", {
        ascending: false,
      })

      if (data) setRooms(data)
    }

    fetchRooms()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase.from("exhibits").insert({
        ...formData,
        artist_id: user.id,
        scheduled_date: new Date(formData.scheduled_date).toISOString(),
        is_released: false,
      })

      if (error) throw error

      router.push("/dashboard/timeline")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to schedule exhibit")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard/timeline">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Timeline
          </Link>
        </Button>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Schedule New Exhibit</CardTitle>
            <CardDescription>Plan a future release or special event for your gallery</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Exhibit Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Winter Showcase 2024"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Associated Room</Label>
                <select
                  id="room"
                  value={formData.room_id}
                  onChange={(e) => setFormData({ ...formData, room_id: e.target.value })}
                  required
                  className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="">Select a room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduled_date">Scheduled Date</Label>
                <Input
                  id="scheduled_date"
                  type="datetime-local"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what makes this exhibit special..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1 h-12">
                  {isLoading ? "Scheduling..." : "Schedule Exhibit"}
                </Button>
                <Button type="button" variant="outline" asChild className="h-12 bg-transparent">
                  <Link href="/dashboard/timeline">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
