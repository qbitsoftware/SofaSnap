import { GetUserInfo } from "@/app/actions"
import { UpdateForm } from "./components/updateForm"
import { redirect } from "next/navigation"
import { TSignUpSchema } from "@/lib/register-validation"
import { ChangePassword } from "./components/pwChangeForm"

const Page = async () => {
    const user = await GetUserInfo()
    if (!user.data.user) {
        redirect("/login")
    }
    const userInfo = user.data.user.user_metadata as TSignUpSchema
    return (
        <div className="flex flex-col items-center mt-[68px] lg:mx-auto">
            <div className="flex flex-col  lg:px-[64px] w-[300px] md:w-[700px] lg:w-[1000px] xl:w-[1200px] max-w-[1440px]">

                {!userInfo.agreement &&
                    <div className="flex  text-center h-[50px] items-center justify-center py-[20px] my-5  w-full border-2 rounded-lg bg-yellow-100">
                        <h1 className="text-slate-700 ">Accept terms of service in order to rent stuff</h1>
                    </div>
                }

                <div className="flex flex-col md:flex-row w-[300px] md:w-full gap-[70px] md:gap-[30px] lg:gap-[50px] xl:gap-[70px] mb-[75px]">
                    <UpdateForm user={userInfo} email={userInfo.email} id={user.data.user.id} />
                    <ChangePassword />
                </div>
            </div>
        </div>
    )
}

export default Page