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
import { useRouter } from 'next/navigation'
import { useToast } from './hooks/use-toast'
import { createClient } from '@/utils/supabase/client'
import { getURL } from 'next/dist/shared/lib/utils'
import { TSignUpSchema } from '@/lib/register-validation'

interface ProfileProps {
    user: TSignUpSchema | undefined
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
            title: "Edukalt välja logitud",
        })
    }
    const menuItems = [
        { label: 'Profiil', href: '/profiil', protected: false },
        { label: 'Minu kuulutused', href: '/kuulutused', protected: false },
        { label: 'Lisa kuulutus', href: '/lisa-toode', protected: false },
        { label: 'Ostukorv', href: '/ostukorv', protected: false },
        // { label: 'Sõnumid', href: '/messages', protected: false },
        { label: 'Admin', href: '/admin', protected: true },
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
                    {menuItems.map((item, index) => {
                        // console.log("userrole", user?.role)
                        if ((item.protected && Number(user?.role) == 0) || (item.protected && !user?.role)) {
                            return null
                        } else {
                            return (

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
                            )
                        }
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
