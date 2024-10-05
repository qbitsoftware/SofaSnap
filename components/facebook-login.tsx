"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/client"

const LoginFacebook = () => {

    const supabase = createClient()

    async function Login() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
        console.log(data, error)
    }


    return (
        <div>
            <Button className='w-[80px] md:w-[130px] h-[44px] bg-background hover:bg-background border-[1px] border-[#D2D5DA]' onClick={() => Login()}>
                <Image src={"/icons/facebook.svg"} alt='facebook' width={24} height={24} />
            </Button>
        </div>
    )
}

export { LoginFacebook }