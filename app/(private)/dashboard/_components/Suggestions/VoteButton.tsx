'use client'

import { useState } from "react";
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

export default function VoteButton({ userId, suggestionId, initialVoteCount, hasVoted }: VoteButtonProps) {
    const [voteCount, setVoteCount] = useState(initialVoteCount);
    const [voted, setVoted] = useState(hasVoted);
    const [isLoading, setIsLoading] = useState(false);

    const handleVote = async () => {
        setIsLoading(true);

        const result = await toggleVoteAction({ userId, suggestionId });

        if (!result.success) {
            toast.error(result.message);
            setIsLoading(false);
            return;
        }

        if (result.action === 'added') {
            setVoteCount((prev) => prev + 1);
            setVoted(true);
            toast.success('Vote added!');
        } else {
            setVoteCount((prev) => prev - 1);
            setVoted(false);
            toast.success('Vote removed!');
        }

        setIsLoading(false);
    };

    return (
        <Button
            className="flex px-0 group hover:bg-gray-100/50 cursor-pointer"
            variant='ghost'
            size='lg'
            onClick={handleVote}
            disabled={isLoading}
        >
            <span>{voteCount}</span>
            <ThumbsUp
                className={`group-hover:text-green-500 cursor-pointer ${voted ? 'text-green-500' : ''}`}
                size={20}
            />
        </Button>
    );
}
