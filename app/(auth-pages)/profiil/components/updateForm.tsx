"use client"
import { useToast } from "@/components/hooks/use-toast"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TAccountInformationSchemaClient, TSignUpSchema, updateInformationClient } from "@/lib/register-validation"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { Contract } from "../../registreeri/components/contract"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ContractCompany } from "../../registreeri/components/contract-company"

interface Props {
    user: TSignUpSchema
    email: string,
}

const UpdateForm = ({ user, email }: Props) => {

    const toast = useToast()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TAccountInformationSchemaClient>({
        resolver: zodResolver(updateInformationClient),
        defaultValues: {
            ...user,
            userType: user.userType
        },
    });

    const onSubmit = async (data: TAccountInformationSchemaClient) => {
        const formData = {
            ...data,
            userType: user.userType,
        }

        const response = await fetch("/api/account", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseData = await response.json()

        if (!response.ok) {
            toast.toast({
                title: "Profiili uuendamine ebaõnnestus. Proovige hiljem uuesti!",
            })
            return;
        }

        if (responseData.errors) {
            const errors = responseData.errors;

            // Common fields
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

            // Eraisik specific fields
            if (user.userType === "Eraisik") {
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
            }

            // Äriklient specific fields
            if (user.userType === "Äriklient") {
                if (errors.company_name) {
                    setError("company_name", {
                        type: "server",
                        message: errors.company_name,
                    })
                }
                if (errors.registry_code) {
                    setError("registry_code", {
                        type: "server",
                        message: errors.registry_code,
                    })
                }
                if (errors.vat_number) {
                    setError("vat_number", {
                        type: "server",
                        message: errors.vat_number,
                    })
                }
                if (errors.contact_person) {
                    setError("contact_person", {
                        type: "server",
                        message: errors.contact_person,
                    })
                }
            }
            return
        }

        if (responseData.success) {
            toast.toast({
                title: "Profiili uuendamine õnnestus",
            })
            router.refresh()
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("userType")} value={user.userType} />
            <div className="mb-[52px]">
                {user.userType === "Eraisik" ? (
                    <>
                        <div className="mb-[22px]">
                            <h2 className="font-medium text-lg">Isikuandmed</h2>
                        </div>
                        <div className="flex flex-col gap-[11px] leading-4">
                            <Input disabled={true} placeholder={email} />
                            <Input  {...register("first_name")} placeholder="Nimi" autoComplete="off" />
                            {(errors as any).first_name && <p className="text-red-500">{(errors as any).first_name.message}</p>}
                            <Input {...register("last_name")} placeholder="Perekonnanimi" autoComplete="off" />
                            {(errors as any).last_name && <p className="text-red-500">{(errors as any).last_name.message}</p>}
                            <Input {...register("address")} placeholder="Aadress" autoComplete="off" />
                            {(errors as any).address && <p className="text-red-500">{(errors as any).address.message}</p>}
                            <Input {...register("phone")} placeholder="Tel nr" />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                        </div>
                    </>
                ) : (
                    <div className="mb-[26px] md:mb-[52px]">
                        <div className="mb-[29px] pl-[4px] md:pl-[0px] md:mb-[22px]">
                            <h2 className="font-medium text-lg">Ettevõtte andmed</h2>
                        </div>
                        <div className="flex flex-col w-full gap-[5px] md:gap-[11px] md:w-[500px] md:pl-[75px] leading-4">
                            <Input {...register("company_name")} placeholder="Ettevõtte nimi" autoComplete="off" />
                            {(errors as any).company_name && <p className="text-red-500">{(errors as any).company_name.message}</p>}
                            <Input {...register("registry_code")} placeholder="Registri kood" autoComplete="off" />
                            {(errors as any).registry_code && <p className="text-red-500">{(errors as any).registry_code.message}</p>}
                            <Input {...register("vat_number")} placeholder="KMKR (kui on)" autoComplete="off" />
                            {(errors as any).vat_number && <p className="text-red-500">{(errors as any).vat_number.message}</p>}
                            <Input {...register("phone")} placeholder="Tel nr" autoComplete="off" />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                            <Input {...register("contact_person")} placeholder="Kontaktisik" autoComplete="off" />
                            {(errors as any).contact_person && <p className="text-red-500">{(errors as any).contact_person.message}</p>}
                        </div>
                    </div>

                )
                }
            </div>

            <div>
                <div className="w-full">
                    <div className="mb-[32px]">
                        <h2 className="font-medium text-lg">Leping</h2>
                    </div>
                    <div className="w-full">
                        {user.userType === "Eraisik" ? (
                            <Contract />
                        ) : (
                            <ContractCompany />
                        )
                        }

                    </div>
                </div>
                <div className="flex flex-col items-start pt-2 w-full mb-[78px]">
                    {!errors.agreement && <p className="pb-2 h-[32px]"></p>}
                    {errors.agreement && <p className="text-red-500 pb-2">* {errors.agreement.message}</p>}
                    <label className="flex items-center gap-[10px] w-full cursor-pointer">
                        <Input {...register("agreement")} type="checkbox" id="custom-checkbox" className="hidden peer" />
                        <div className="min-w-[26px] min-h-[26px] bg-[#FCC9B9] hidden peer-checked:flex shadow-inner-light items-center justify-center">
                            <Check width={24} height={24} className="text-black peer-checked:text-white" />
                        </div>
                        <div className="min-w-[26px] min-h-[26px] bg-[#FCC9B9] peer-checked:hidden shadow-inner-light flex items-center justify-center">

                        </div>
                        <h2 className="font-medium text-base">Olen tutvunud lepingu tingimustega ja nõustun käesoleva lepinguga.</h2>
                    </label>
                </div>
            </div>
            <div className="z-10 flex flex-col md:flex-row items-center gap-[20px] mb-[51px]">
                <SubmitButton disabled={isSubmitting} className="bg-accent hover:bg-accent w-[150px] rounded-full lg:w-[150px] md:h-[45px] text-black cursor">
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
                <Button className="w-[150px] lg:w-[100px] md:h-[45px] bg-[#D9D9D9] rounded-full hover:text-white text-black">
                    <Link href={"/"}>
                        Tühista
                    </Link>
                </Button>
            </div>
        </form >
    )
}

export { UpdateForm }