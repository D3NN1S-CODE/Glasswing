"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { ButterflySwarm } from "./butterfly-swarm"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.75_0.15_240)] via-[oklch(0.85_0.10_220)] to-white animate-gradient" />

      <div className="absolute inset-0 overflow-hidden opacity-60">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[oklch(0.75_0.18_40)] to-[oklch(0.85_0.12_35)] rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[oklch(0.65_0.18_240)] to-[oklch(0.75_0.12_220)] rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[oklch(0.70_0.20_35)] to-[oklch(0.70_0.15_240)] rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <ButterflySwarm />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Logo/Brand */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[oklch(0.85_0.15_240)] shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-[oklch(0.65_0.22_40)] animate-pulse" />
            <span className="text-sm font-medium text-[oklch(0.35_0.08_250)]">A safe space for your mind</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-balance leading-tight">
            <span className="text-white drop-shadow-lg">GLASSWING</span>
          </h1>

          <p className="text-2xl md:text-3xl text-white drop-shadow-md font-light text-balance">
            Where transformation takes flight
          </p>

          <p className="text-lg md:text-xl text-white/95 drop-shadow max-w-2xl mx-auto text-pretty leading-relaxed">
            Like the glasswing butterfly, find clarity and strength through your journey. Track your emotions, practice
            mindfulness, and nurture your mental wellbeing with gentle, supportive guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/app">
              <Button
                size="lg"
                className="group text-lg px-8 py-6 rounded-xl bg-[oklch(0.65_0.22_40)] hover:bg-[oklch(0.60_0.22_40)] text-white shadow-xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl bg-white/90 backdrop-blur text-[oklch(0.35_0.08_250)] border-2 border-white hover:bg-white shadow-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm text-white/90 drop-shadow">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.65_0.22_40)] animate-pulse shadow-lg" />
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-[oklch(0.65_0.22_40)] animate-pulse shadow-lg"
                style={{ animationDelay: "300ms" }}
              />
              <span>No Judgement</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-[oklch(0.65_0.22_40)] animate-pulse shadow-lg"
                style={{ animationDelay: "700ms" }}
              />
              <span>Always Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
