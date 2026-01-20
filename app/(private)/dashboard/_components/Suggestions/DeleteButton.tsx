'use client'

import { deleteSuggestionAction } from "@/app/actions/suggestions";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteButtonProps {
    suggestionId: string;
    isAuthor: boolean
}

export default function DeleteButton({ suggestionId, isAuthor }: DeleteButtonProps) {
    const handleDelete = async () => {

        const result = await deleteSuggestionAction(suggestionId);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex px-0 group hover:bg-gray-100/50 cursor-pointer"
                    variant='ghost'
                    size='lg'
                    hidden={!isAuthor}
                >
                    <Trash
                        className={`group-hover:text-red-600 cursor-pointer`}
                        size={20}
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-red-600 font-normal">This action is destructive</DialogTitle>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


