import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold">
            <Heart className="w-6 h-6 text-primary" />
            <span>GLASSWING</span>
          </div>

          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            A steady lantern for complex days. Remember: You're not alone, and it's okay to not be okay.
          </p>

          <div className="text-xs text-muted-foreground space-y-2">
            <p>If you're experiencing a mental health crisis, please contact a professional helpline in your area.</p>
            <p className="font-medium">© 2025 GLASSWING. Made with care for your wellbeing.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
