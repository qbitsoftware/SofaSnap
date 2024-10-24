"use client"

import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button"
import { getURL } from "next/dist/shared/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "./hooks/use-toast";


const LogOut = () => {

    const router = useRouter()
    const toast = useToast()

    async function logout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        let currentPage = getURL()
        // if (currentPage == "/protected") {
        currentPage = "/"
        // }
        router.push(currentPage)
        router.refresh()
        toast.toast({
            title: "Successfully logged out",
        })
    }

    return (
        <div>
            <Button onClick={logout} className="rounded-full bg-accent text-bg-foreground px-[25px] lg:py-[11px] lg:px-[25px] xl:p-[11px] xl:px-[40px] shadow-xl">
                Log out
            </Button>
        </div>
    )
}

export { LogOut }