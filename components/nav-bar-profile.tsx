"use client"
import Link from 'next/link'
import { CircleUser } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { motion } from 'framer-motion'
import { User } from '@/utils/supabase/supabase.types'
import { useRouter } from 'next/navigation'
import { useToast } from './hooks/use-toast'
import { createClient } from '@/utils/supabase/client'
import { getURL } from 'next/dist/shared/lib/utils'

interface ProfileProps {
    user: User | null
}
export default function Profile({ user }: ProfileProps) {

    const router = useRouter()
    const toast = useToast()

    async function logout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        let currentPage = getURL()
        currentPage = "/"
        router.push(currentPage)
        router.refresh()
        toast.toast({
            title: "Successfully logged out",
        })
    }
    const menuItems = [
        { label: 'Profiil', href: '/profiil', protected: true },
        { label: 'Minu kuulutused', href: '/kuulutused', protected: true },
        { label: 'Lisa kuulutus', href: '/lisa-toode', protected: true },
        { label: 'Sõnumid', href: '/messages', protected: true },
        // { label: 'Seaded', href: '/settings' },
        { label: 'Logi välja', action: logout },
    ]

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none'>
                    <motion.div
                        className=''
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >

                        <CircleUser className="h-[32px] w-[32px] cursor-pointer " />
                    </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" sideOffset={12} className="w-56">
                    {menuItems.map((item, index) => (
                        <DropdownMenuItem key={index} asChild>
                            {item.action ? (
                                <button
                                    onClick={item.action}
                                    className="flex w-full items-center px-2 py-2 text-sm transition-colors hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.label}
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="flex w-full items-center px-2 py-2 text-sm transition-colors hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
