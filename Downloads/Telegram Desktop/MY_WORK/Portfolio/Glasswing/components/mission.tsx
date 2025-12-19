"use client"

import Image from "next/image"

export function Mission() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance leading-tight">
              A safe haven for your mental health journey
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                Just like the glasswing butterfly's delicate translucent wings, mental health requires gentle care and
                attention. We created GLASSWING to be your steady companion through life's complex moments.
              </p>
              <p className="text-pretty">
                Our approach is rooted in compassion, privacy, and evidence-based wellness practices. We believe
                everyone deserves access to supportive tools that help them understand and nurture their emotional
                wellbeing.
              </p>
              <p className="text-pretty font-medium text-foreground">
                We're here to listen, support, and walk alongside you—never to judge or diagnose.
              </p>
            </div>

            <div className="pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Non-clinical Support</p>
                  <p className="text-sm text-muted-foreground">Empathetic guidance without medical advice</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Your Privacy Matters</p>
                  <p className="text-sm text-muted-foreground">Your data stays private and secure, always</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Accessible to All</p>
                  <p className="text-sm text-muted-foreground">Designed with universal accessibility in mind</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/serene-nature-scene-with-translucent-glasswing-but.jpg"
                alt="Peaceful nature scene representing mental wellness"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
