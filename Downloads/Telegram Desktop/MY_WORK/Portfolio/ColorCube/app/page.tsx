import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CubeIcon } from "@/components/cube-icon"
import { FloatingCube } from "@/components/floating-cube"
import { ArrowRight, ImageIcon, Layout, Calendar, Sparkles, Compass } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cube-white/50 to-primary/5">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CubeIcon className="w-10 h-10" />
            <span className="text-2xl font-bold tracking-tight">Colorcube</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/discover">
              <Button variant="ghost" className="font-medium">
                <Compass className="mr-2 w-4 h-4" />
                Discover
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="font-medium">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="w-4 h-4" />A Virtual Gallery Experience
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-balance">
                Your Art,
                <span className="block text-primary">Beautifully</span>
                <span className="block text-accent">Curated</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg text-pretty">
                A small, serene digital museum where your photos and artworks come alive. Create stunning exhibits,
                track your creative journey, and share your vision with the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Start Creating
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent">
                    Explore Galleries
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center justify-center">
              <FloatingCube />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Gallery-First Experience</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every feature designed to showcase your art in the most beautiful way possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`w-7 h-7 text-${feature.color}`}
                    style={{ color: `var(--${feature.color})` }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary p-12 lg:p-16 text-center">
              <div className="relative z-10 space-y-6 text-primary-foreground">
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-balance">Our Mission</h2>
                <p className="text-lg lg:text-xl leading-relaxed text-primary-foreground/90 text-pretty">
                  We believe every artist deserves a beautiful space to showcase their work. Colorcube transforms the
                  way you organize, present, and share your creative journey— combining the intimacy of a personal
                  gallery with the innovation of digital technology.
                </p>
                <div className="pt-4">
                  <Link href="/signup">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                      Join the Gallery
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative cubes */}
              <div className="absolute top-10 right-10 w-20 h-20 opacity-20">
                <div className="w-full h-full bg-cube-yellow rounded-lg rotate-12" />
              </div>
              <div className="absolute bottom-10 left-10 w-16 h-16 opacity-20">
                <div className="w-full h-full bg-cube-green rounded-lg -rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">Ready to Build Your Gallery?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Join artists and creators who are already showcasing their work in stunning virtual exhibits.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-lg px-10 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
                Create Your Space
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <CubeIcon className="w-8 h-8" />
              <span className="text-lg font-semibold">Colorcube</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Colorcube. A serene space for digital art.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Upload & Organize",
    description: "Seamlessly upload your photos and artworks. Organize them into beautiful rooms and exhibits.",
    icon: ImageIcon,
    color: "cube-blue",
  },
  {
    title: "Gallery Navigation",
    description: "Smooth, immersive walkthrough mode that feels like strolling through a real museum.",
    icon: Layout,
    color: "cube-red",
  },
  {
    title: "Exhibit Calendar",
    description: "Schedule releases and track your creative timeline. Perfect for artists building their portfolio.",
    icon: Calendar,
    color: "cube-green",
  },
  {
    title: "Floating Info Cards",
    description: "Elegant hover cards reveal artwork details without disrupting your viewing experience.",
    icon: Sparkles,
    color: "cube-orange",
  },
]
