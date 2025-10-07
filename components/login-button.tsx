"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useTranslation } from "@/lib/i18n/i18n-provider";

export default function LoginButton() {
    const { t } = useTranslation()
    return (<div>
        <Link href={"/login"}>
            <Button className="rounded-full bg-accent text-bg-foreground px-[25px] lg:py-[11px] lg:px-[25px] xl:p-[11px] xl:px-[40px] shadow-xl">
                {t('auth.login.loginButton')}
            </Button>
        </Link>
    </div>
    )

}