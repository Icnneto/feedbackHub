'use client'

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import SelectCategory from "./SelectCategory"
import SelectStatus from "./SelectStatus"
import { createSuggestionAction } from "@/app/actions/suggestions"

export default function SuggestionForm() {
    const [state, formAction] = useActionState(createSuggestionAction, null)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!state) return

        if (!state.success) {
            toast.error(state.message)
            return
        }

        toast.success(state.message)
        setOpen(false)
        router.refresh()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">New Suggestion</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <form action={formAction}>
                    <DialogHeader className="mb-6">
                        <DialogTitle>New Suggestion</DialogTitle>
                        <DialogDescription>
                            Share with the community and help us improve!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" />
                        </div>
                        <div className="flex gap-12 my-4">
                            <SelectCategory />
                            <SelectStatus />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Publish</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
