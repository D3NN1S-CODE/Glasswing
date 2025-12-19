import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Mission } from "@/components/mission"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Mission />
      <Footer />
    </main>
  )
}
