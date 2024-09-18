import Image from "next/image"
import { RegisterForm } from "./components/registerForm"
import { GetUserInfo } from "@/app/actions"
import { redirect } from "next/navigation"


const Page = async () => {
    const user = await GetUserInfo()
    if (user.data.user) {
      redirect("/account")
    }
    return (
        <div className="flex flex-col items-center mt-[68px] mx-auto">
            <div className="px-[64px] max-w-[1440px]">
                <RegisterForm />
            </div>
            <div className="flex w-full h-[532px] mb-[324px] ml-[-350px] lg:ml-[-200px] lg:scale-125 xl:ml-[0px] xl:scale-150 2xl:scale-175 2xl:ml-[250px] overflow-hidden">
                <Image src={"/images/couch.svg"} height={532} width={1063} objectFit="contain" alt="couch" />
            </div>
        </div>
    )
}

export default Page