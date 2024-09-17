"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/client"

const LoginGoogle = () => {

    const supabase = createClient()

    async function Login() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
          })
    }

    return (
        <div>
            <Button className='md:w-[130px] md:h-[44px] bg-background hover:bg-background border-[1px] border-[#D2D5DA]' onClick={() => Login()}>
                <Image src={"/icons/google.svg"} alt='google' width={20} height={24} />
            </Button>
        </div>
    )
}

export { LoginGoogle }