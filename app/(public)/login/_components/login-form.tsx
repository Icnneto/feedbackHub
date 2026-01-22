'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginAction } from "@/app/actions/auth"
import { MessageSquare } from "lucide-react"

export function LoginForm() {
    const [state, formAction] = useActionState(loginAction, null)
    const router = useRouter()

    useEffect(() => {
        if (state && !state.success) {
            toast.error(state.message)
        }

        if (state && state.success) {
            toast.success(state.message)
            setTimeout(() => {
                router.push('/dashboard')
            }, 1500)
        }
    }, [state, router])

    return (
        <section className="flex min-h-screen px-4 py-16 md:py-32 w-full">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
            <form
                action={formAction}
                className="bg-card m-auto h-fit w-full max-w-md overflow-hidden rounded-2xl border shadow-lg shadow-black/5">
                <div className="p-8 space-y-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-1 transition-colors hover:bg-primary/20">
                            <MessageSquare className="w-6 h-6 text-primary" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                            <p className="text-sm text-muted-foreground mt-1">Sign in to your account to continue</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="you@example.com"
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="h-11"
                            />
                        </div>

                        <Button className="w-full h-11 cursor-pointer font-medium">
                            Sign In
                        </Button>
                    </div>

                    <div className="pt-2 border-t">
                        <p className="text-muted-foreground text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Button asChild variant="link" className="px-1 h-auto font-medium">
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </p>
                    </div>
                </div>
            </form>
        </section>
    )
}