"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckIn } from "./check-in"
import { MoodTracker } from "./mood-tracker"
import { GroundingExercises } from "./grounding-exercises"
import { Journal } from "./journal"
import { ThemeSelector } from "./theme-selector"
import { Home, Heart, Wind, BookOpen, Palette, Menu, X } from "lucide-react"
import Link from "next/link"

type View = "home" | "checkin" | "mood" | "grounding" | "journal"

export function AppDashboard() {
  const [activeView, setActiveView] = useState<View>("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { id: "home" as View, label: "Home", icon: Home },
    { id: "checkin" as View, label: "Check-in", icon: Heart },
    { id: "mood" as View, label: "Mood Garden", icon: Palette },
    { id: "grounding" as View, label: "Grounding", icon: Wind },
    { id: "journal" as View, label: "Journal", icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.95_0.05_240)] via-white to-[oklch(0.95_0.08_35)]">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl">
            <Heart className="w-5 h-5 text-primary" />
            <span>GLASSWING</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/50 p-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveView(item.id)
                  setMobileMenuOpen(false)
                }}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 min-h-screen border-r border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="sticky top-0 p-6 space-y-8">
            <Link href="/" className="flex items-center gap-2 font-serif font-bold text-2xl">
              <Heart className="w-6 h-6 text-primary" />
              <span>GLASSWING</span>
            </Link>

            <nav className="space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveView(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="pt-8">
              <ThemeSelector />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {activeView === "home" && <DashboardHome onNavigate={setActiveView} />}
            {activeView === "checkin" && <CheckIn />}
            {activeView === "mood" && <MoodTracker />}
            {activeView === "grounding" && <GroundingExercises />}
            {activeView === "journal" && <Journal />}
          </div>
        </main>
      </div>
    </div>
  )
}

function DashboardHome({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [userName] = useState("Friend")
  const [quote] = useState("You are braver than you believe, stronger than you seem, and more capable than you know.")

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2">Welcome back, {userName}</h1>
        <p className="text-lg text-muted-foreground">How are you feeling today?</p>
      </div>

      {/* Quote Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <p className="text-lg font-medium text-balance leading-relaxed italic">"{quote}"</p>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
          onClick={() => onNavigate("checkin")}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Daily Check-in</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Take a moment to reflect on how you're feeling right now
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
          onClick={() => onNavigate("grounding")}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <Wind className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quick Grounding</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Try a breathing exercise to center yourself
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
          onClick={() => onNavigate("mood")}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <Palette className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Mood Garden</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Watch your emotional journey grow and bloom
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
          onClick={() => onNavigate("journal")}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Journal</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Express your thoughts in a safe, private space
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
