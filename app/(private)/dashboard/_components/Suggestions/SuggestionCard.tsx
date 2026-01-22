import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSuggestionsAction } from "@/app/actions/suggestions"
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import VoteButton from "./VoteButton";
import DeleteButton from "./DeleteButton";
import SuggestionForm from "../Navbar/suggestion-form/SuggestionForm";
import AnimatedSuggestionList from "./AnimatedSuggestionList";

const badgesStyle = [
    { name: "BUG", style: "border-red-600" },
    { name: "FEATURE", style: "border-blue-600" },
    { name: "IMPROVEMENT", style: "border-green-600" },
    { name: "OPEN", style: "border-purple-600" },
    { name: "PLANNED", style: "border-slate-800" },
    { name: "IN_PROGRESS", style: "border-yellow-600" },
    { name: "LIVE", style: "border-green-700" },
]

export function getStyle(name: string) {
    const findBadge = badgesStyle.find((option) => option.name === name);
    const style = findBadge?.style
    return style
};

export function getDisplayName(name: string) {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}


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

    const suggestionIds = suggestions?.map((s) => s.id) ?? [];

    return (
        <AnimatedSuggestionList suggestionIds={suggestionIds}>
            {suggestions?.map((content) => (
                <Card className="w-full lg:w-[90%]" key={content.id}>
                    <CardHeader className="flex flex-col justify-between items-middle">
                        <div className="flex flex-row w-full justify-between">
                            <CardTitle className="pr-2 lg:pr-6">
                                {content.title}
                            </CardTitle>
                            <div className="flex gap-x-4">
                                <Badge variant='secondary' className={`${getStyle(content.category)} bg-background text-gray-800 font-normal`}>{getDisplayName(content.category)}</Badge>
                                <Badge variant='secondary' className={`${getStyle(content.status)} bg-background text-gray-800 font-normal`}>{getDisplayName(content.status)}</Badge>
                            </div>
                        </div>
                        <hr className="border/65 w-full mt-4"></hr>
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
                            {userId === content.authorId && (
                                <SuggestionForm
                                    mode="edit"
                                    suggestion={{
                                        id: content.id,
                                        title: content.title,
                                        description: content.description,
                                        category: content.category,
                                        status: content.status
                                    }}
                                    trigger={
                                        <Button className="px-0 hover:bg-background hover:text-gray-900 cursor-pointer" variant='ghost' size='lg'>
                                            <Pencil size={20} />
                                        </Button>
                                    }
                                />
                            )}
                            <DeleteButton
                                suggestionId={content.id}
                                isAuthor={userId === content.authorId}
                            />
                        </CardAction>
                    </CardFooter>
                </Card>
            )) ?? []}
        </AnimatedSuggestionList>
    )
}
