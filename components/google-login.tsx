"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/client"

const LoginGoogle = () => {

    const supabase = createClient()

    async function Login() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: "https://seatly.eu/auth/callback",
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
    }

    return (
        <div>
            <Button className='w-[80px] md:w-[130px] h-[44px] bg-background hover:bg-background border-[1px] border-[#D2D5DA]' onClick={() => Login()}>
                <Image src={"/icons/google.svg"} alt='google' width={24} height={24} />
            </Button>
        </div>
    )
}

export { LoginGoogle }