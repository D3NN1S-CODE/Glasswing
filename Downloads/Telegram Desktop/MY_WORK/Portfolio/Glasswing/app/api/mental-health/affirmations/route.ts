import { NextResponse } from "next/server"

// Mental health affirmations API endpoint
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mood = searchParams.get("mood") || "neutral"

  const affirmations = {
    great: [
      "Your positive energy lights up the world around you.",
      "You're exactly where you need to be right now.",
      "Your joy is a gift to yourself and others.",
    ],
    good: [
      "You're making wonderful progress on your journey.",
      "Every small step forward is worth celebrating.",
      "Your efforts are creating positive change.",
    ],
    neutral: [
      "It's okay to have days that feel in-between.",
      "You're still moving forward, even if it doesn't feel like it.",
      "Balance is a natural part of growth.",
    ],
    struggling: [
      "You are stronger than you know.",
      "This feeling is temporary. You will get through this.",
      "Reaching out for support is a sign of strength.",
      "Be gentle with yourself today.",
    ],
  }

  const moodKey = mood as keyof typeof affirmations
  const messages = affirmations[moodKey] || affirmations.neutral
  const randomAffirmation = messages[Math.floor(Math.random() * messages.length)]

  return NextResponse.json({
    affirmation: randomAffirmation,
    mood: mood,
    timestamp: new Date().toISOString(),
  })
}
