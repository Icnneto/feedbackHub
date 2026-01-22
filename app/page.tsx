import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="flex flex-col items-center text-center max-w-2xl space-y-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to <span className="text-primary">FeedbackHub</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Share ideas, vote on features, and help shape the products you love.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild size="lg" className="w-full sm:w-auto px-8">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8">
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
