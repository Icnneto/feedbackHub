import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSuggestionsAction } from "@/app/actions/suggestions"
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import VoteButton from "./VoteButton";

const badgesStyle = [
    { name: "BUG", style: "bg-red-400" },
    { name: "FEATURE", style: "bg-blue-400" },
    { name: "IMPROVMENT", style: "bg-green-400" },
    { name: "OPEN", style: "bg-slate-400" },
    { name: "PLANNED", style: "bg-slate-600" },
    { name: "IN_PROGRESS", style: "bg-yellow-400" },
    { name: "LIVE", style: "bg-green-500" },
]

export function getStyle(name: string) {
    const findBadge = badgesStyle.find((option) => option.name === name);
    const style = findBadge?.style
    return style
};


export default async function SuggestionCard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const result = await getSuggestionsAction();

    if (!result.success) {
        toast.error('Sorry! We are facing a problem to fetch suggestions!');
        return null
    }

    const suggestions = result.data;
    const userId = user?.id ?? '';

    return (
        <div className="flex flex-col gap-y-6 items-center">
            {suggestions?.map((content) => (
                <Card className="w-full lg:w-4/5" key={content.id}>
                    <CardHeader className="flex justify-between items-middle">
                        <div className="flex flex-row gap-2">
                            <CardTitle className="pr-2 lg:pr-6">
                                {content.title}
                            </CardTitle>
                            <Badge variant='secondary' className={`${getStyle(content.category)} text-background`}>{content.category}</Badge>
                            <Badge variant='secondary' className={`${getStyle(content.status)} text-background`}>{content.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {content.description}
                    </CardContent>
                    <CardFooter className="flex pt-2 gap-x-2 text-gray-500 text-sm justify-between">
                        <div className="flex flex-row gap-2">
                            <p>Created by</p>
                            <p>{content.author.name}</p>
                        </div>
                        <CardAction className="flex flex-row">
                            <VoteButton
                                userId={userId}
                                suggestionId={content.id}
                                initialVoteCount={content.votes.length}
                                hasVoted={content.votes.some((vote) => vote.userId === userId)}
                            />
                            <Button className={`${userId === content.authorId ? '' : 'hidden'} px-0 hover:bg-background hover:text-gray-500 cursor-pointer`} variant='ghost' size='lg'>
                                <Pencil size={20} />
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
