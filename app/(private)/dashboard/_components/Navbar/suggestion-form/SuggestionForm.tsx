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
import { toast } from "sonner"
import { createSuggestionAction, updateSuggestionAction } from "@/app/actions/suggestions"
import SuggestionFormFields from "./SuggestionFormFields"

interface SuggestionFormProps {
    mode?: 'create' | 'edit';
    suggestion?: {
        id: string;
        title: string;
        description: string;
        category?: string;
        status?: string;
    };
    trigger?: React.ReactNode;
    onSuccess?: () => void;
}

export default function SuggestionForm({
    mode = 'create',
    suggestion,
    trigger,
    onSuccess
}: SuggestionFormProps) {
    const action = mode === 'edit' ? updateSuggestionAction : createSuggestionAction;
    const [state, formAction] = useActionState(action, null)
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
        onSuccess?.()
        router.refresh()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const isEditMode = mode === 'edit';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">New Suggestion</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <form action={formAction}>
                    <DialogHeader className="mb-6">
                        <DialogTitle>
                            {isEditMode ? 'Edit Suggestion' : 'New Suggestion'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? 'Update your suggestion details'
                                : 'Share with the community and help us improve!'}
                        </DialogDescription>
                    </DialogHeader>
                    <SuggestionFormFields
                        defaultValues={isEditMode ? suggestion : undefined}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            {isEditMode ? 'Save Changes' : 'Publish'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
