"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const CUBE_COLORS = [
  { name: "Blue", value: "blue", color: "oklch(0.52 0.19 252)" },
  { name: "Red", value: "red", color: "oklch(0.59 0.23 25)" },
  { name: "Orange", value: "orange", color: "oklch(0.62 0.23 28)" },
  { name: "Yellow", value: "yellow", color: "oklch(0.92 0.15 94)" },
  { name: "Green", value: "green", color: "oklch(0.54 0.16 145)" },
  { name: "White", value: "white", color: "oklch(0.95 0.01 0)" },
]

export default function NewRoomPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color_theme: "blue",
    is_published: false,
  })

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

      const { data, error } = await supabase
        .from("rooms")
        .insert({
          ...formData,
          artist_id: user.id,
        })
        .select()
        .single()

      if (error) throw error

      router.push(`/dashboard/rooms/${data.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create room")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto p-6 lg:p-12 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Link>
        </Button>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Create New Room</CardTitle>
            <CardDescription>Set up a new exhibition space for your artworks</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Room Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Summer Collection 2024"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what visitors will find in this room..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {CUBE_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color_theme: color.value })}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        formData.color_theme === color.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg" style={{ background: color.color }} />
                      <span className="font-medium">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="published" className="cursor-pointer">
                  Publish room immediately
                </Label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1 h-12">
                  {isLoading ? "Creating..." : "Create Room"}
                </Button>
                <Button type="button" variant="outline" asChild className="h-12 bg-transparent">
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
