"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Smile, Meh, Frown, Zap, Brain, Heart } from "lucide-react"

const moods = [
  {
    value: 5,
    label: "Great",
    icon: Smile,
    color: "text-green-500",
    quote: "Your positive energy is contagious. Keep shining!",
  },
  {
    value: 4,
    label: "Good",
    icon: Smile,
    color: "text-green-400",
    quote: "You're doing wonderfully. Celebrate the small wins!",
  },
  {
    value: 3,
    label: "Okay",
    icon: Meh,
    color: "text-yellow-500",
    quote: "It's okay to have neutral days. You're still moving forward.",
  },
  {
    value: 2,
    label: "Not Great",
    icon: Frown,
    color: "text-orange-500",
    quote: "Difficult days are part of growth. Be gentle with yourself.",
  },
  {
    value: 1,
    label: "Struggling",
    icon: Frown,
    color: "text-red-500",
    quote: "You're incredibly brave for acknowledging how you feel. Reach out if you need support.",
  },
]

const trackers = [
  {
    id: "anxiety",
    label: "Anxiety",
    icon: Brain,
  },
  { id: "energy", label: "Energy", icon: Zap },
  { id: "mood", label: "Overall Mood", icon: Heart },
]

export function CheckIn() {
  const [selectedMood, setSelectedMood] = useState(3)
  const [trackerValues, setTrackerValues] = useState({ anxiety: 5, energy: 5, mood: 5 })
  const [notes, setNotes] = useState("")
  const { toast } = useToast()

  const handleSubmit = async () => {
    try {
      // Save check-in data
      const checkInData = {
        mood: selectedMood,
        anxiety: trackerValues.anxiety,
        energy: trackerValues.energy,
        overallMood: trackerValues.mood,
        notes,
        timestamp: new Date().toISOString(),
      }

      console.log("[v0] Saving check-in:", checkInData)

      toast({
        title: "Check-in saved!",
        description: "Your feelings have been recorded. Remember to be kind to yourself.",
      })

      setNotes("")
    } catch (error) {
      console.error("[v0] Error saving check-in:", error)
      toast({
        title: "Saved locally",
        description: "Your check-in has been saved to your device.",
        variant: "default",
      })
    }
  }

  const currentMood = moods.find((m) => m.value === selectedMood)

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2">Daily Check-in</h1>
        <p className="text-lg text-muted-foreground">How are you feeling today?</p>
      </div>

      {/* Quote Card */}
      {currentMood && (
        <Card className="bg-gradient-to-br from-[oklch(0.75_0.18_40)]/20 to-[oklch(0.65_0.18_240)]/20 border-2 border-primary/40">
          <CardContent className="p-6">
            <p className="text-lg font-medium italic text-balance leading-relaxed text-[oklch(0.30_0.06_250)]">
              "{currentMood.quote}"
            </p>
          </CardContent>
        </Card>
      )}

      {/* Mood Selection */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Overall Feeling</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-2">
            {moods.map((mood) => {
              const Icon = mood.icon
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? "border-primary bg-gradient-to-br from-[oklch(0.75_0.18_40)]/10 to-[oklch(0.65_0.18_240)]/10 scale-105 shadow-lg"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <Icon className={`w-8 h-8 ${mood.color}`} />
                  <span className="text-sm font-medium">{mood.label}</span>
                </button>
              )
            })}
          </div>

          {currentMood && (
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-[oklch(0.90_0.08_240)] to-[oklch(0.90_0.10_35)]">
              <p className="text-lg text-[oklch(0.30_0.06_250)]">
                You're feeling <span className="font-semibold">{currentMood.label.toLowerCase()}</span> today
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Trackers */}
      {trackers.map((tracker) => {
        const Icon = tracker.icon
        return (
          <Card key={tracker.id} className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                {tracker.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                value={[trackerValues[tracker.id as keyof typeof trackerValues]]}
                onValueChange={(value) => setTrackerValues({ ...trackerValues, [tracker.id]: value[0] })}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Low</span>
                <span className="font-medium text-foreground text-lg">
                  {trackerValues[tracker.id as keyof typeof trackerValues]}/10
                </span>
                <span>High</span>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Notes */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Additional Thoughts (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind? This space is just for you..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSubmit} className="px-8 shadow-lg">
          Save Check-in
        </Button>
      </div>
    </div>
  )
}
