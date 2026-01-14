import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"
import { getUserById } from "@/lib/services/user/user-service";

export default async function Header() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const result = await getUserById(user.id);
    const username = result.success? result.data?.name : ''; 

    return (
        <header className="text-center mb-24">
            <h1 className="text-3xl font-bold mb-3">Welcome back, {username}</h1>
        </header>
    )
}
