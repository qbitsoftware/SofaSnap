import { GetUserInfo } from "@/app/actions"
import { UpdateForm } from "./components/updateForm"
import { redirect } from "next/navigation"
import { TSignUpSchema } from "@/lib/register-validation"
import { ChangePassword } from "./components/pwChangeForm"

const Page = async () => {
    const user = await GetUserInfo()
    if (!user.data.user) {
        redirect("/sign-in")
    }
    const userInfo = user.data.user.user_metadata as TSignUpSchema
    return (
        <div className="flex flex-col items-center mt-[68px] lg:mx-auto">
            <div className="flex flex-col  lg:px-[64px] w-[300px] max-w-[1440px]">

                {!userInfo.agreement &&
                    <div className="flex  text-center h-[50px] items-center justify-center py-[20px] my-5  w-full border-2 rounded-lg bg-yellow-100">
                        <h1 className="text-slate-700 ">Accept terms of service in order to rent stuff</h1>
                    </div>
                }

                <div className="flex flex-col md:flex-row w-[300px] lg:w-full">
                    <UpdateForm user={userInfo} email={userInfo.email} id={user.data.user.id} />
                    <ChangePassword />
                </div>
            </div>
        </div>
    )
}

export default Page