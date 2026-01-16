import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"
import { getUserStatsAction } from "@/app/actions/user";

export default async function PostCounter() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const result = await getUserStatsAction(user.id)
    const postCounter = result.data?._count.suggestions;
    const label = postCounter === 1 ? 'post' : 'posts';

    return (
        <p className="">{postCounter} {label}</p>
    )
}