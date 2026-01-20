'use client'

import { useOptimistic, startTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleVoteAction } from "@/app/actions/votes";

interface VoteButtonProps {
    userId: string;
    suggestionId: string;
    initialVoteCount: number;
    hasVoted: boolean;
}

interface VoteState {
    voteCount: number;
    hasVoted: boolean;
}

export default function VoteButton({ userId, suggestionId, initialVoteCount, hasVoted }: VoteButtonProps) {
    const [optimisticState, addOptimisticVote] = useOptimistic<VoteState, boolean>(
        { voteCount: initialVoteCount, hasVoted: hasVoted },
        (currentState, optimisticValue) => {
            return {
                voteCount: optimisticValue ? currentState.voteCount + 1 : currentState.voteCount - 1,
                hasVoted: optimisticValue
            };
        }
    );

    const handleVote = async () => {
        const newHasVoted = !optimisticState.hasVoted;

        startTransition(() => {
            addOptimisticVote(newHasVoted)
        });


        const result = await toggleVoteAction({ userId, suggestionId });

        if (!result.success) {
            toast.error(result.message);
            return;
        }

    };

    return (
        <Button
            className="flex px-0 group hover:bg-gray-100/50 cursor-pointer"
            variant='ghost'
            size='lg'
            onClick={handleVote}
        >
            <span>{optimisticState.voteCount}</span>
            <ThumbsUp
                className={`group-hover:text-green-500 cursor-pointer ${optimisticState.hasVoted ? 'text-green-500' : ''}`}
                size={20}
            />
        </Button>
    );
}
