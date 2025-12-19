"use client"

import { useEffect, useState } from "react"

interface Butterfly {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

export function ButterflySwarm() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([])

  useEffect(() => {
    // Create 20 butterflies with random positions and animations
    const newButterflies = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
      size: 20 + Math.random() * 15,
    }))
    setButterflies(newButterflies)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {butterflies.map((butterfly) => (
        <div
          key={butterfly.id}
          className="absolute animate-flutter opacity-30"
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
            animationDelay: `${butterfly.delay}s`,
            animationDuration: `${butterfly.duration}s`,
          }}
        >
          {/* Glasswing butterfly SVG */}
          <svg
            width={butterfly.size}
            height={butterfly.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left wing */}
            <path
              d="M12 12C12 12 8 10 6 8C4 6 3 4 3 4C3 4 4 6 5 8C6 10 8 12 12 12Z"
              fill="oklch(0.90 0.05 240)"
              stroke="oklch(0.65 0.22 40)"
              strokeWidth="0.5"
              opacity="0.6"
            />
            {/* Right wing */}
            <path
              d="M12 12C12 12 16 10 18 8C20 6 21 4 21 4C21 4 20 6 19 8C18 10 16 12 12 12Z"
              fill="oklch(0.90 0.05 240)"
              stroke="oklch(0.65 0.22 40)"
              strokeWidth="0.5"
              opacity="0.6"
            />
            {/* Left lower wing */}
            <path
              d="M12 12C12 12 9 14 7 16C5 18 4 20 4 20C4 20 5 18 6 16C7 14 9 12 12 12Z"
              fill="oklch(0.85 0.08 240)"
              stroke="oklch(0.65 0.18 240)"
              strokeWidth="0.5"
              opacity="0.5"
            />
            {/* Right lower wing */}
            <path
              d="M12 12C12 12 15 14 17 16C19 18 20 20 20 20C20 20 19 18 18 16C17 14 15 12 12 12Z"
              fill="oklch(0.85 0.08 240)"
              stroke="oklch(0.65 0.18 240)"
              strokeWidth="0.5"
              opacity="0.5"
            />
            {/* Body */}
            <ellipse cx="12" cy="12" rx="1" ry="4" fill="oklch(0.35 0.08 250)" />
            {/* Orange accents */}
            <circle cx="9" cy="9" r="1.5" fill="oklch(0.65 0.22 40)" opacity="0.8" />
            <circle cx="15" cy="9" r="1.5" fill="oklch(0.65 0.22 40)" opacity="0.8" />
          </svg>
        </div>
      ))}
    </div>
  )
}
