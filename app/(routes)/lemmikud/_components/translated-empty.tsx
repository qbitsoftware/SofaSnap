"use client"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/i18n-provider"
import Link from "next/link"

export function TranslatedEmptyPage() {
    const { t } = useTranslation()
    return (
        <div className='w-full md:px-[64px] max-w-[1440px] md:mx-auto px-6'>
            <h1 className='md:text-5xl text-3xl text-center font-semibold md:mt-[100px]'>{t("favorites.emptyTitle")}</h1>
            <div className='flex flex-col gap-4 mx-auto justify-center items-center mt-10'>
                <Link href={"/tooted"} className='w-full max-w-[640px]'>
                    <Button className='py-6  w-full bg-accent text-black mx-auto'>{t("favorites.viewProducts")}</Button>
                </Link>
                <Link href={"/"} className='w-full max-w-[640px]'>
                    <Button className='py-6  w-full bg-secondary mx-auto'>{t("favorites.goHome")}</Button>
                </Link>
            </div>
        </div>
    )
}