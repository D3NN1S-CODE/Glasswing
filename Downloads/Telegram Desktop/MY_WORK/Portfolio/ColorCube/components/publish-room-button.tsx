"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Globe, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export function PublishRoomButton({ roomId, isPublished }: { roomId: string; isPublished: boolean }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [published, setPublished] = useState(isPublished)
  const [error, setError] = useState<string | null>(null)

  const handleTogglePublish = async () => {
    setIsLoading(true)
    setError(null)
    // Optimistic update
    const newPublishedState = !published
    setPublished(newPublishedState)

    const supabase = createClient()

    try {
      const { error: updateError } = await supabase
        .from("rooms")
        .update({ is_published: newPublishedState })
        .eq("id", roomId)

      if (updateError) throw updateError
    } catch (err: unknown) {
      // Revert optimistic update on error
      setPublished(published)
      setError(err instanceof Error ? err.message : "Failed to update room")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        onClick={handleTogglePublish}
        disabled={isLoading}
        variant={published ? "default" : "outline"}
        className="w-full"
      >
        {published ? (
          <>
            <Globe className="mr-2 w-4 h-4" />
            Published - Click to Unpublish
          </>
        ) : (
          <>
            <Lock className="mr-2 w-4 h-4" />
            Private - Click to Publish
          </>
        )}
      </Button>
    </div>
  )
}
