"use client"
import { useTranslation } from "@/lib/i18n/i18n-provider"

interface Props {
    favProductsCount: number
}

export default function Hero({ favProductsCount }: Props) {
    const { t } = useTranslation()
    return (
        <div className='mb-8'>
            <h1 className='md:text-4xl text-2xl font-semibold mb-2'>{t("favorites.title")}</h1>
            <p className='text-muted-foreground'>{t("favorites.count")} {favProductsCount} {t("favorites.count_second")}</p>
        </div>
    )
}