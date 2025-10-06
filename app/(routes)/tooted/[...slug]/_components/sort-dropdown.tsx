'use client'

import { useState } from 'react'
import { AlignLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from '@/lib/i18n/i18n-provider'

interface SortDropdownProps {
    currentPage?: number
}


export const SortDropdown: React.FC<SortDropdownProps> = ({ currentPage }) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const handleSort = (sortOption: 'date' | 'price_asc' | 'price_desc' | 'popularity') => {
        window.location.assign(`?page=${currentPage}&sort=${sortOption}`)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                    <AlignLeft strokeWidth={1.4} color='#000000' size={44} />
                    <span className="sr-only">{t('products.sortLabel')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort('date')}>
                    {t('products.sortByDate')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price_asc')}>
                    {t('products.sortByPriceAsc')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price_desc')}>
                    {t('products.sortByPriceDesc')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('popularity')}>
                    {t('products.sortByPopularity')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
