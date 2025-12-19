"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wind, Play, Pause, RotateCcw, Volume2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const exercises = [
  {
    id: "4-7-8",
    name: "4-7-8 Breathing",
    description: "A calming breath technique to reduce anxiety and promote relaxation",
    phases: [
      { name: "Inhale", duration: 4, instruction: "Breathe in slowly through your nose" },
      { name: "Hold", duration: 7, instruction: "Hold your breath gently" },
      { name: "Exhale", duration: 8, instruction: "Breathe out slowly through your mouth" },
    ],
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "A grounding technique used by Navy SEALs to maintain calm under pressure",
    phases: [
      { name: "Inhale", duration: 4, instruction: "Breathe in slowly" },
      { name: "Hold", duration: 4, instruction: "Hold your breath" },
      { name: "Exhale", duration: 4, instruction: "Breathe out slowly" },
      { name: "Hold", duration: 4, instruction: "Hold your breath" },
    ],
  },
]

export function GroundingExercises() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0])
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [timeLeft, setTimeLeft] = useState(selectedExercise.phases[0].duration)
  const [totalCycles, setTotalCycles] = useState(0)
  const { toast } = useToast()

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      const nextPhase = (currentPhase + 1) % selectedExercise.phases.length
      setCurrentPhase(nextPhase)
      setTimeLeft(selectedExercise.phases[nextPhase].duration)

      // Speak the instruction
      speak(selectedExercise.phases[nextPhase].instruction)

      if (nextPhase === 0) {
        setTotalCycles((prev) => prev + 1)

        // Show encouraging message every few cycles
        if (totalCycles > 0 && totalCycles % 3 === 0) {
          toast({
            title: "Beautiful progress!",
            description: `You've completed ${totalCycles + 1} cycles. You're doing great.`,
          })
        }
      }
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, currentPhase, selectedExercise, totalCycles, toast])

  const handleStart = () => {
    setIsActive(true)
    speak(selectedExercise.phases[currentPhase].instruction)
  }

  const handlePause = () => setIsActive(false)

  const handleReset = () => {
    setIsActive(false)
    setCurrentPhase(0)
    setTimeLeft(selectedExercise.phases[0].duration)
    setTotalCycles(0)
  }

  const handleExerciseChange = (exercise: (typeof exercises)[0]) => {
    setSelectedExercise(exercise)
    setIsActive(false)
    setCurrentPhase(0)
    setTimeLeft(exercise.phases[0].duration)
    setTotalCycles(0)
  }

  const currentPhaseData = selectedExercise.phases[currentPhase]
  const progress =
    ((selectedExercise.phases[currentPhase].duration - timeLeft) / selectedExercise.phases[currentPhase].duration) * 100

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2">Grounding Exercises</h1>
        <p className="text-lg text-muted-foreground">Center yourself with guided breathing</p>
      </div>

      {/* Exercise Selection */}
      <div className="grid md:grid-cols-2 gap-4">
        {exercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={`cursor-pointer transition-all ${
              selectedExercise.id === exercise.id
                ? "border-2 border-primary shadow-xl bg-gradient-to-br from-[oklch(0.75_0.18_40)]/10 to-[oklch(0.65_0.18_240)]/10"
                : "hover:border-primary/50 border-2"
            }`}
            onClick={() => handleExerciseChange(exercise)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-primary" />
                {exercise.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{exercise.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Breathing Visualizer */}
      <Card className="bg-gradient-to-br from-[oklch(0.85_0.10_240)] via-white to-[oklch(0.90_0.12_35)] border-2">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Breathing Circle */}
            <div className="relative w-72 h-72">
              {/* Background gradient circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.75_0.15_240)] to-[oklch(0.75_0.18_40)] opacity-20" />

              {/* Animated circle */}
              <div
                className="absolute inset-0 rounded-full border-8 border-primary transition-all duration-1000 ease-in-out shadow-2xl"
                style={{
                  transform: isActive ? `scale(${0.5 + (progress / 100) * 0.5})` : "scale(0.5)",
                  opacity: isActive ? 0.9 : 0.3,
                  boxShadow: isActive ? "0 0 60px oklch(0.65 0.22 40)" : "none",
                }}
              />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-7xl font-bold text-primary drop-shadow-lg">{timeLeft}</div>
                <div className="text-xl font-medium mt-3 text-[oklch(0.35_0.08_250)]">{currentPhaseData.name}</div>
              </div>
            </div>

            {/* Instruction */}
            <div className="text-center space-y-2">
              <p className="text-2xl font-medium text-[oklch(0.30_0.06_250)]">{currentPhaseData.instruction}</p>
              {totalCycles > 0 && (
                <p className="text-sm text-muted-foreground">
                  {totalCycles} {totalCycles === 1 ? "cycle" : "cycles"} completed
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              {!isActive ? (
                <Button size="lg" onClick={handleStart} className="px-8 shadow-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </Button>
              ) : (
                <Button size="lg" onClick={handlePause} variant="outline" className="px-8 border-2 bg-transparent">
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button size="lg" onClick={handleReset} variant="outline" className="border-2 bg-transparent">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>

            {/* Audio indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <span>Audio guidance enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-br from-[oklch(0.75_0.18_40)]/10 to-[oklch(0.65_0.18_240)]/10 border-2 border-primary/30">
        <CardHeader>
          <CardTitle>Breathing Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Find a comfortable, quiet place where you won't be disturbed
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Focus on the sensation of your breath moving in and out
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If your mind wanders, gently bring your attention back to your breath
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Even 2-3 minutes can make a meaningful difference in how you feel
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
