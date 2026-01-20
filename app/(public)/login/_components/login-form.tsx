'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginAction } from "@/app/actions/auth"

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
        <section className="flex min-h-screen px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                action={formAction}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Welcome to FeedbackHub</h1>
                        <p className="text-sm">We are happy to see you again!</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                E-mail
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="password"
                                    className="text-sm">
                                    Password
                                </Label>
                            </div>
                            <Input
                                type="password"
                                required
                                name="password"
                                id="password"
                                className="input sz-md variant-mixed"
                            />
                        </div>

                        <Button className="w-full cursor-pointer">Sign In</Button>
                    </div>

                    <div className="p-3">
                        <p className="text-accent-foreground text-center text-sm">
                            Create an account?
                            <Button
                                asChild
                                variant="link"
                                className="px-2">
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </p>
                    </div>
                </div>
            </form>
        </section>
    )
}