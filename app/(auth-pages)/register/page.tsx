import Image from "next/image"
import { RegisterForm } from "./components/registerForm"
import { GetUserInfo } from "@/app/actions"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"


const Page = async () => {
    const user = await GetUserInfo()
    if (user.data.user) {
        redirect("/account")
    }
    return (
        <div className="bg-card md:bg-background flex flex-col items-center md:mt-[68px] mx-auto">
            <div className='flex md:hidden w-full items-center pl-[14px] pb-[13px] pt-[30px]'>
                <div className='cursor-pointer'>
                    <Link href={"/"}>
                        <ChevronLeft width={36} height={36} />
                    </Link>
                </div>
            </div>
            <div className="mb-[64px] lg:px-[64px] w-[300px] sm:w-[450px] md:w-[700px] lg:w-[1000px] xl:w-[1400px] max-w-[1440px]">
                <RegisterForm />
            </div>
            <div className="hidden md:flex w-full h-[532px] mb-[324px] ml-[-350px] lg:ml-[-200px] lg:scale-125 xl:ml-[0px] xl:scale-150 2xl:scale-175 2xl:ml-[250px] overflow-hidden">
                <Image src={"/images/couch.svg"} height={532} width={1063} objectFit="contain" alt="couch" />
            </div>
        </div>
    )
}

export default Page