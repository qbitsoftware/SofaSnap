"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"
import { CartItemWithDetails } from "@/utils/supabase/queries/cart"

interface Props {
    cart_items: CartItemWithDetails[] | undefined
}


export function MobileCart({ cart_items }: Props) {
    if (!cart_items) {
        return
    }

    // const router = useRouter()
    const pathName = usePathname()
    if (pathName == "/ostukorv" || pathName.includes("/tooted")) {
        return
    }

    return (
        <div className="md:hidden ">
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F6F6F6] border-t border-gray-300 p-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Ostukorvis on {cart_items.length} {cart_items.length == 1 ? "toode" : "toodet"}</span>
                    </div>
                </div>
                <Link href={"/ostukorv"}>
                    <Button
                        type="submit"
                        className="rounded-2xl bg-accent text-black px-6 py-6 flex items-center"
                    >
                        Maksma
                    </Button>
                </Link>
            </div>
        </div>

    )
}