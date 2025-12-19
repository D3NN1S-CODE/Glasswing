"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MoodEntry {
  date: string
  mood: number
  anxiety: number
  energy: number
}

export function MoodTracker() {
  const [moodData, setMoodData] = useState<MoodEntry[]>([])
  const [plantGrowth, setPlantGrowth] = useState(0)

  useEffect(() => {
    // Simulate loading mood data
    // In a real app, this would come from a database
    const mockData: MoodEntry[] = Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      mood: Math.floor(Math.random() * 5) + 3,
      anxiety: Math.floor(Math.random() * 5) + 3,
      energy: Math.floor(Math.random() * 5) + 3,
    }))
    setMoodData(mockData)

    // Calculate plant growth based on check-ins
    setPlantGrowth(Math.min(mockData.length * 7, 100))
  }, [])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2">Your Mood Garden</h1>
        <p className="text-lg text-muted-foreground">Watch your emotional journey bloom</p>
      </div>

      {/* Plant Visualization */}
      <Card className="bg-gradient-to-b from-secondary/20 to-background">
        <CardHeader>
          <CardTitle>Your Growth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <PlantVisualization growth={plantGrowth} />
            <p className="mt-6 text-center text-lg font-medium">
              {plantGrowth < 30 && "Your seedling is just starting to sprout 🌱"}
              {plantGrowth >= 30 && plantGrowth < 60 && "Your plant is growing beautifully 🌿"}
              {plantGrowth >= 60 && plantGrowth < 90 && "Look at those blooms developing! 🌸"}
              {plantGrowth >= 90 && "Your garden is in full bloom! 🌺"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">{moodData.length} check-ins completed</p>
          </div>
        </CardContent>
      </Card>

      {/* Mood Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {moodData.slice(-7).map((entry, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="w-full aspect-square rounded-lg transition-all hover:scale-110"
                    style={{
                      backgroundColor: `oklch(${0.5 + entry.mood * 0.08} ${0.15} ${35})`,
                      opacity: 0.3 + (entry.mood / 10) * 0.7,
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Lower mood</span>
              <span className="text-muted-foreground">Higher mood</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Gentle Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            💫 You've been consistently checking in with yourself this week. That takes courage and self-awareness.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            🌸 Your mood garden shows that you're nurturing your emotional wellbeing. Keep going.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            ✨ Remember: Every emotion is temporary. The difficult moments will pass, just as the good ones do.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function PlantVisualization({ growth }: { growth: number }) {
  const stemHeight = Math.min(growth, 50)
  const leavesCount = Math.floor(growth / 20)
  const flowersCount = Math.floor(Math.max(0, growth - 60) / 20)

  return (
    <svg width="200" height="250" viewBox="0 0 200 250" className="drop-shadow-lg">
      {/* Pot */}
      <path d="M70 220 L60 250 L140 250 L130 220 Z" fill="oklch(0.62 0.15 35)" opacity="0.3" />

      {/* Soil */}
      <ellipse cx="100" cy="220" rx="35" ry="8" fill="oklch(0.4 0.04 40)" opacity="0.4" />

      {/* Main stem */}
      {stemHeight > 0 && (
        <line
          x1="100"
          y1="220"
          x2="100"
          y2={220 - stemHeight * 2}
          stroke="oklch(0.5 0.1 120)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}

      {/* Leaves */}
      {Array.from({ length: leavesCount }).map((_, i) => {
        const y = 220 - (i + 1) * 30
        const direction = i % 2 === 0 ? 1 : -1
        return (
          <ellipse
            key={`leaf-${i}`}
            cx={100 + direction * 20}
            cy={y}
            rx="15"
            ry="8"
            fill="oklch(0.65 0.12 130)"
            opacity="0.7"
            className="animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        )
      })}

      {/* Flowers */}
      {Array.from({ length: flowersCount }).map((_, i) => {
        const angle = (i / flowersCount) * Math.PI * 2
        const x = 100 + Math.cos(angle) * 30
        const y = 120 + Math.sin(angle) * 20
        return (
          <g key={`flower-${i}`} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
            {/* Petals */}
            {Array.from({ length: 5 }).map((_, j) => {
              const petalAngle = (j / 5) * Math.PI * 2
              const px = x + Math.cos(petalAngle) * 8
              const py = y + Math.sin(petalAngle) * 8
              return <circle key={j} cx={px} cy={py} r="5" fill="oklch(0.75 0.15 35)" opacity="0.8" />
            })}
            {/* Center */}
            <circle cx={x} cy={y} r="4" fill="oklch(0.85 0.2 80)" />
          </g>
        )
      })}
    </svg>
  )
}
