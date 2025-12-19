"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trees, Waves, Sunset } from "lucide-react"

const themes = [
  { id: "glasswing", name: "Glasswing", icon: Sunset, description: "Original translucent theme" },
  { id: "forest", name: "Forest", icon: Trees, description: "Deep greens and earth tones" },
  { id: "ocean", name: "Ocean", icon: Waves, description: "Calm blues and teals" },
]

export function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("glasswing")

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Comfort Theme</Label>
      <div className="space-y-2">
        {themes.map((theme) => {
          const Icon = theme.icon
          return (
            <Card
              key={theme.id}
              className={`cursor-pointer transition-all ${
                selectedTheme === theme.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedTheme(theme.id)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{theme.name}</div>
                  <div className="text-xs text-muted-foreground">{theme.description}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
