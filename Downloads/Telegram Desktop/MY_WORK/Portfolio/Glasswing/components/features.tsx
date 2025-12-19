"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, Sparkles, TrendingUp, Wind, Bell } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Daily Check-ins",
    description:
      "Track how you're feeling with gentle, supportive prompts that help you understand your emotional patterns.",
    image: "/person-meditating-peacefully-soft-blue-orange-colo.jpg",
  },
  {
    icon: TrendingUp,
    title: "Mood Garden",
    description:
      "Watch your emotional journey grow like a beautiful digital plant, visualizing your progress over time.",
    image: "/growing-digital-plant-garden-blue-orange-aesthetic.jpg",
  },
  {
    icon: Wind,
    title: "Grounding Exercises",
    description: "Access calming breathing exercises and mindfulness techniques whenever you need them.",
    image: "/breathing-meditation-peaceful-nature.jpg",
  },
  {
    icon: BookOpen,
    title: "Private Journal",
    description: "A safe space to express your thoughts and feelings without judgment or pressure.",
    image: "/journal-notebook-writing-peaceful-setting.jpg",
  },
  {
    icon: Sparkles,
    title: "Comfort Themes",
    description: "Choose from soothing environments like forest, ocean, or dusk to match your mood.",
    image: "/nature-forest-ocean-sunset-calming-scenes.jpg",
  },
  {
    icon: Bell,
    title: "Gentle Reminders",
    description: "Soft notifications to check in with yourself, never intrusive, always supportive.",
    image: "/peaceful-notification-bell-soft-colors.jpg",
  },
]

export function Features() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-[oklch(0.92_0.08_240)] to-[oklch(0.88_0.10_35)]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance text-[oklch(0.25_0.05_250)]">
            Everything you need to nurture your wellbeing
          </h2>
          <p className="text-lg text-[oklch(0.40_0.05_250)] max-w-2xl mx-auto text-pretty">
            Thoughtfully designed features that support your mental health journey with care and compassion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-2 border-[oklch(0.85_0.08_240)] hover:border-[oklch(0.65_0.22_40)] animate-fade-in-up bg-white/90 backdrop-blur overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Feature image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[oklch(0.75_0.18_40)] to-[oklch(0.65_0.22_40)] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[oklch(0.25_0.05_250)]">{feature.title}</h3>
                <p className="text-[oklch(0.40_0.05_250)] leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
