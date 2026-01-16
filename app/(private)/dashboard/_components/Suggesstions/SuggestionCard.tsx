import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getSuggestionsAction } from "@/app/actions/suggestions"
import { Icon, ThumbsUp } from "lucide-react";


export default async function SuggestionCard() {
    const result = await getSuggestionsAction();

    if (!result.success) {
        toast.error('Sorry! We are facing a problem to fetch suggestions!');
        return null
    }

    const suggestions = result.data;

    return (
        <div className="flex flex-col gap-y-6 items-center">
            {suggestions?.map((content) => (
                <Card className="w-4/5" key={content.id}>
                    <CardHeader className="align-middle">
                        <CardTitle>
                            {content.title}
                        </CardTitle>
                        <CardAction>
                            <ThumbsUp className="hover:text-green-500 cursor-pointer" size={18}/> 
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        {content.description}
                    </CardContent>
                    <CardFooter className="flex pt-2 gap-x-2 text-gray-500 text-sm">
                        <p>Created by</p>
                        <p>{content.author.name}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
