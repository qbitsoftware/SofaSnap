"use client"
import { useToast } from "@/components/hooks/use-toast"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TAccountInformationSchema, updateInformation } from "@/lib/register-validation"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Router } from "lucide-react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { Contract } from "../../register/components/contract"
import { useRouter } from "next/navigation"

const UpdateForm = ({ user, email }: { user: TAccountInformationSchema, email: string }) => {

    const toast = useToast()
    const router = useRouter()


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
        setError,
    } = useForm<TAccountInformationSchema>({
        resolver: zodResolver(updateInformation),
        defaultValues: user,
    });


    const onSubmit = async (data: TAccountInformationSchema) => {
        const response = await fetch("/api/account", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseData = await response.json()

        if (!response.ok) {
            toast.toast({
                title: "Updating account information failed. Try again later!",
            })
            return;
        }

        if (responseData.errors) {
            const errors = responseData.errors;

            if (errors.first_name) {
                setError("first_name", {
                    type: "server",
                    message: errors.first_name,
                })
            }
            if (errors.last_name) {
                setError("last_name", {
                    type: "server",
                    message: errors.last_name,
                })
            }
            if (errors.address) {
                setError("address", {
                    type: "server",
                    message: errors.address,
                })
            }
            if (errors.phone) {
                setError("phone", {
                    type: "server",
                    message: errors.phone,
                })
            }
            if (errors.agreement) {
                setError("agreement", {
                    type: "server",
                    message: errors.agreement,
                })
            }
            return
        }

        if (responseData.success) {
            toast.toast({
                title: "Account information updated successfully",
            })
            router.refresh()
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[52px]">
                <div className="mb-[22px]">
                    <h2 className="font-medium text-lg">Isikuandmed</h2>
                </div>
                <div className="flex flex-col gap-[11px] w-[424px] leading-4">
                    <Input disabled={true} placeholder={email} />
                    <Input  {...register("first_name")} placeholder="Nimi" />
                    {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                    <Input {...register("last_name")} placeholder="Perekonnanimi" />
                    {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                    <Input {...register("address")} placeholder="Aadress" />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    <Input {...register("phone")} placeholder="Tel nr" />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
            </div>

            {user.agreement ? "" :
                <div>
                    <div className={cn("w-full mb-[54px]")}>
                        <div className="mb-[32px]">
                            <h2 className="font-medium text-lg">Leping</h2>
                        </div>
                        <div className="w-full">
                            <Contract />
                        </div>
                    </div>
                    <div className={cn("flex flex-col items-start pl-[10px] mb-[188px]")}>
                        {!errors.agreement && <p className="pb-2 h-[32px]"></p>}
                        {errors.agreement && <p className="text-red-500 pb-2">* {errors.agreement.message}</p>}
                        <label className="flex items-center gap-[10px] cursor-pointer">
                            <Input {...register("agreement")} type="checkbox" id="custom-checkbox" className="hidden peer" />
                            <div className="w-[26px] h-[26px] bg-[#FCC9B9] hidden peer-checked:flex shadow-inner-light items-center justify-center">
                                <Check width={24} height={24} className="text-black peer-checked:text-white" />
                            </div>
                            <div className="w-[26px] h-[26px] bg-[#FCC9B9] peer-checked:hidden shadow-inner-light flex items-center justify-center">
                            </div>
                            <h2 className="font-medium text-base">Olen tutvunud lepingu tingimustega ja nõustun käesoleva lepinguga.</h2>
                        </label>
                    </div>
                </div>
            }
            <div className="relative z-10 flex items-center justify-end gap-[20px] mr-[70px] mb-[51px]">
                <Button className="md:w-[202px] md:h-[75px] bg-[#D9D9D9] hover:text-white text-black">
                    Tühista
                </Button>
                <SubmitButton disabled={isSubmitting} className="bg-accent hover:bg-accent md:w-[202px] md:h-[75px] text-black cursor">
                    <h1 className={cn(isSubmitting ? " hidden " : "block")}>
                        Uuenda
                    </h1>
                    <ClipLoader
                        color={"#ffffff"}
                        loading={isSubmitting}
                        size={40}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </SubmitButton>
            </div>
        </form >
    )
}

export { UpdateForm }