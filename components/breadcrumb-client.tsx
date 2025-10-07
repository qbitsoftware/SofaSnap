"use client"
import { useTranslation } from "@/lib/i18n/i18n-provider"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface props {
    link: string
}

export const BreadcrumbAddProduct = ({ link }: props) => {
    const { t } = useTranslation()
    return (
        <div className='flex max-w-[1440px] w-full items-center'>
            <div className='flex pr-[20px] sm:pr-[40px] md:pr-[45px] lg:pr-[85px] items-center'>
                <Link className="cursor-pointer w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]" href={link}>
                    <ChevronLeft strokeWidth={1} className="w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]" />
                </Link>

            </div>
            <div>
                <h2 className='font-medium text-[24px] sm:text-[36px] md:text-[44px]'>{t("addProduct.breadcrumb")}</h2>
            </div>
        </div>
    )
}