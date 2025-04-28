import Image from "next/image"
import { RegisterForm } from "./components/registerForm"
import { GetUserInfo } from "@/app/actions"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"


const Page = async () => {
    const user = await GetUserInfo()
    if (user.data.user) {
        redirect("/profiil")
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
            <div className="lg:px-[64px] w-[300px] sm:w-[450px] md:w-[700px] lg:w-[1000px] xl:w-[1400px] max-w-[1440px]">
                <RegisterForm />
            </div>
            <div className="hidden md:block w-full relative h-[944px] mb-[324px] overflow-hidden">
                <div className="absolute left-0 md:left-[-350px] lg:left-[0px]">
                    <Image src={"/images/couch.svg"} height={532} width={1063} style={{ objectFit: "contain" }} alt="couch" />
                </div>
            </div>
        </div>
    )
}

export default Page