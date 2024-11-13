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

interface SortDropdownProps {
    currentPage?: number
}


export const SortDropdown: React.FC<SortDropdownProps> = ({ currentPage }) => {
    // const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const handleSort = (sortOption: 'date' | 'price_asc' | 'price_desc' | 'popularity') => {
        window.location.assign(`?page=${currentPage}&sort=${sortOption}`)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                    <AlignLeft strokeWidth={1.4} color='#000000' size={44} />
                    <span className="sr-only">Sort products</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort('date')}>
                    Kuupäeva järgi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price_asc')}>
                    Hinna järgi kasvavalt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price_desc')}>
                    Hinna järgi kahanevalt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('popularity')}>
                    Populaarsemad
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
