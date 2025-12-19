import { NextResponse } from "next/server"

// Breathing exercises API with audio guidance support
export async function GET() {
  const exercises = [
    {
      id: "4-7-8",
      name: "4-7-8 Breathing",
      description: "Calming technique for anxiety reduction",
      phases: [
        { phase: "inhale", duration: 4, instruction: "Breathe in slowly through your nose" },
        { phase: "hold", duration: 7, instruction: "Hold your breath gently" },
        { phase: "exhale", duration: 8, instruction: "Breathe out slowly through your mouth" },
      ],
      benefits: ["Reduces anxiety", "Promotes sleep", "Calms nervous system"],
    },
    {
      id: "box",
      name: "Box Breathing",
      description: "Military-grade stress management technique",
      phases: [
        { phase: "inhale", duration: 4, instruction: "Breathe in slowly" },
        { phase: "hold", duration: 4, instruction: "Hold your breath" },
        { phase: "exhale", duration: 4, instruction: "Breathe out slowly" },
        { phase: "hold", duration: 4, instruction: "Hold your breath" },
      ],
      benefits: ["Improves focus", "Reduces stress", "Enhances performance"],
    },
    {
      id: "coherent",
      name: "Coherent Breathing",
      description: "Balance your nervous system",
      phases: [
        { phase: "inhale", duration: 5, instruction: "Breathe in gently" },
        { phase: "exhale", duration: 5, instruction: "Breathe out softly" },
      ],
      benefits: ["Increases HRV", "Balances autonomic system", "Enhances well-being"],
    },
  ]

  return NextResponse.json({
    exercises,
    timestamp: new Date().toISOString(),
  })
}
