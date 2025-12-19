import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CubeIcon } from "@/components/cube-icon"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <CubeIcon className="w-16 h-16" />
          </div>
          <CardTitle className="text-3xl">Check Your Email</CardTitle>
          <CardDescription className="text-base">
            We've sent you a verification link to confirm your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-xl p-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              Please check your inbox and click the verification link to activate your Colorcube account.
            </p>
            <p className="text-sm text-muted-foreground">
              After verifying, you'll be able to sign in and start creating your virtual gallery.
            </p>
          </div>
          <Button asChild className="w-full h-12">
            <Link href="/login">Return to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
