import { GetUserInfo } from "@/app/actions"
import { redirect } from "next/navigation"
import { RegisterPageWrapper } from "./_components/register-page-wrapper"

const Page = async () => {
    const user = await GetUserInfo()
    if (user.data.user) {
        redirect("/profiil")
    }
    return <RegisterPageWrapper />
}

export default Page
