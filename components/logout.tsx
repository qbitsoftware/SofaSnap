"use client"

import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button"
import { getURL } from "next/dist/shared/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "./hooks/use-toast";
import { useTranslation } from "@/lib/i18n/i18n-provider";


const LogOut = () => {

    const router = useRouter()
    const toast = useToast()
    const { t } = useTranslation()

    async function logout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        let currentPage = getURL()
        currentPage = "/"
        router.push(currentPage)
        router.refresh()
        toast.toast({
            title: t("auth.login.logout_successful"),
        })
    }

    return (
        <div>
            <Button onClick={logout} className="rounded-full bg-accent text-bg-foreground px-[25px] lg:py-[11px] lg:px-[25px] xl:p-[11px] xl:px-[40px] shadow-xl">
                {t('auth.login.logout')}
            </Button>
        </div>
    )
}

export { LogOut }