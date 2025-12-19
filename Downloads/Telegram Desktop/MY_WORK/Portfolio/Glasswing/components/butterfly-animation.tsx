"use client"

export function ButterflyAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Glasswing butterfly SVG */}
      <svg
        className="absolute top-1/4 right-1/4 w-32 h-32 opacity-20 animate-float"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left wing */}
        <path
          d="M100 100 Q70 70, 50 80 Q30 90, 40 110 Q50 130, 70 120 Q90 110, 100 100"
          fill="url(#leftWing)"
          stroke="#f97316"
          strokeWidth="2"
          opacity="0.6"
        />
        {/* Right wing */}
        <path
          d="M100 100 Q130 70, 150 80 Q170 90, 160 110 Q150 130, 130 120 Q110 110, 100 100"
          fill="url(#rightWing)"
          stroke="#f97316"
          strokeWidth="2"
          opacity="0.6"
        />
        {/* Body */}
        <ellipse cx="100" cy="100" rx="4" ry="20" fill="#64748b" />

        <defs>
          <linearGradient id="leftWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="rightWing" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Second butterfly */}
      <svg
        className="absolute bottom-1/3 left-1/4 w-24 h-24 opacity-15 animate-float"
        style={{ animationDelay: "1s" }}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 100 Q70 70, 50 80 Q30 90, 40 110 Q50 130, 70 120 Q90 110, 100 100"
          fill="url(#leftWing2)"
          stroke="#f97316"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          d="M100 100 Q130 70, 150 80 Q170 90, 160 110 Q150 130, 130 120 Q110 110, 100 100"
          fill="url(#rightWing2)"
          stroke="#f97316"
          strokeWidth="2"
          opacity="0.6"
        />
        <ellipse cx="100" cy="100" rx="4" ry="20" fill="#64748b" />

        <defs>
          <linearGradient id="leftWing2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="rightWing2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
