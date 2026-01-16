'use client'

import { logoutAction } from "@/app/actions/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
// import { useState } from "react"


export default function Logout() {
    const router = useRouter()
    // const [session, setSession] = useState(true)

    const Logout = async () => {
        const response = await logoutAction();

        if (!response?.success) {
            toast.error(response?.message)
            return
        }

        toast.success(response?.message)
        setTimeout(() => {
            router.push('/')
        }, 1500)
    }

    return (
        <Button variant="secondary" onClick={Logout}>Logout</Button>
    )
}
