"use client"

import { useToast } from "@/components/hooks/use-toast"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eraklient, registerValidator, TSignUpSchema } from "@/lib/register-validation"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { Contract } from "./contract"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ContractCompany } from "./contract-company"
import { useTranslation } from "@/lib/i18n/i18n-provider"
import { sendRegistrationEmailAction } from "@/app/actions"

type UserType = "Eraisik" | "Äriklient";

const RegisterForm = () => {

    const router = useRouter()
    const toast = useToast()
    const { t } = useTranslation()

    const [userType, setUserType] = useState<UserType>("Eraisik");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
        setValue,
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(registerValidator),
        defaultValues: {
            userType: "Eraisik"
        }
    });

    useEffect(() => {
        reset();
        setValue('userType', userType);
    }, [userType, reset, setValue]);

    const onSubmit = async (data: TSignUpSchema) => {
        const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseData = await response.json()

        if (!response.ok) {
            const { code } = responseData
            if (code == "user_already_exists") {
                toast.toast({
                    title: t('auth.register.errorUserExists'),
                })
                return
            }
            toast.toast({
                title: t('auth.register.errorGeneric'),
            })
            return;
        }

        if (responseData.errors) {
            const errors = responseData.errors;

            if (errors.email) {
                setError("email", {
                    type: "server",
                    message: errors.email,
                })
                toast.toast({
                    title: errors.email,
                })
            }
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
            if (errors.password) {
                setError("password", {
                    type: "server",
                    message: errors.password,
                })
            }
            if (errors.confirm_password) {
                setError("confirm_password", {
                    type: "server",
                    message: errors.confirm_password,
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
            switch (userType) {
                case "Eraisik":
                    const newData = data as Eraklient
                    await sendRegistrationEmailAction(data.email, newData.first_name + " " + newData.last_name)
                    break
                case "Äriklient":
                    await sendRegistrationEmailAction(data.email, data.email)
                    break
            }
            toast.toast({
                title: t('auth.register.successMessage'),
            })
            router.push("/")
            router.refresh()
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("userType")} value={userType} />

            <div className="mb-[40px]">
                <div className="flex gap-[20px] justify-center md:justify-start md:pl-[75px]">
                    <Button
                        type="button"
                        onClick={() => setUserType("Eraisik")}
                        className={cn(
                            "w-[150px] h-[45px] rounded-lg transition-colors",
                            userType === "Eraisik"
                                ? "bg-accent text-black"
                                : "bg-[#D9D9D9] text-black hover:bg-[#C0C0C0]"
                        )}
                    >
                        {t('auth.register.userTypes.individual')}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setUserType("Äriklient")}
                        className={cn(
                            "w-[150px] h-[45px] rounded-lg transition-colors",
                            userType === "Äriklient"
                                ? "bg-accent text-black"
                                : "bg-[#D9D9D9] text-black hover:bg-[#C0C0C0]"
                        )}
                    >
                        {t('auth.register.userTypes.business')}
                    </Button>
                </div>
            </div>

            {userType === "Eraisik" ? (
                <>
                    <div className="mb-[26px] md:mb-[52px]">
                        <div className="mb-[29px] pl-[4px] md:pl-[0px] md:mb-[22px]">
                            <h2 className="font-medium text-lg">{t('auth.register.personalData')}</h2>
                        </div>
                        <div className="flex flex-col w-full gap-[5px] md:gap-[11px] md:w-[500px] md:pl-[75px] leading-4">
                            <Input {...register("first_name")} placeholder={t('auth.register.firstName')} autoComplete="off" />
                            {(errors as any).first_name && <p className="text-red-500">{(errors as any).first_name.message}</p>}
                            <Input {...register("last_name")} placeholder={t('auth.register.lastName')} autoComplete="off" />
                            {(errors as any).last_name && <p className="text-red-500">{(errors as any).last_name.message}</p>}
                            <Input {...register("address")} placeholder={t('auth.register.address')} autoComplete="off" />
                            {(errors as any).address && <p className="text-red-500">{(errors as any).address.message}</p>}
                            <Input {...register("phone")} placeholder={t('auth.register.phone')} autoComplete="off" />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div className="mb-[46px]">
                        <div className="pl-[4px] md:pl-[0px] mb-[26px]">
                            <h2 className="font-medium text-lg">{t('auth.register.userInfo')}</h2>
                        </div>
                        <div className="flex flex-col w-full gap-[5px] md:gap-[11px] md:w-[500px] md:pl-[75px] leading-4">
                            <Input {...register("email")} placeholder={t('auth.register.email')} autoComplete="off" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            <Input {...register("password")} placeholder={t('auth.register.password')} type="password" autoComplete="off" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            <Input {...register("confirm_password")} placeholder={t('auth.register.confirmPassword')} type="password" autoComplete="off" />
                            {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-[26px] md:mb-[52px]">
                        <div className="mb-[29px] pl-[4px] md:pl-[0px] md:mb-[22px]">
                            <h2 className="font-medium text-lg">{t('auth.register.companyData')}</h2>
                        </div>
                        <div className="flex flex-col w-full gap-[5px] md:gap-[11px] md:w-[500px] md:pl-[75px] leading-4">
                            <Input {...register("company_name")} placeholder={t('auth.register.companyName')} autoComplete="off" />
                            {(errors as any).company_name && <p className="text-red-500">{(errors as any).company_name.message}</p>}
                            <Input {...register("registry_code")} placeholder={t('auth.register.registryCode')} autoComplete="off" />
                            {(errors as any).registry_code && <p className="text-red-500">{(errors as any).registry_code.message}</p>}
                            <Input {...register("vat_number")} placeholder={t('auth.register.vatNumber')} autoComplete="off" />
                            {(errors as any).vat_number && <p className="text-red-500">{(errors as any).vat_number.message}</p>}
                            <Input {...register("phone")} placeholder={t('auth.register.phone')} autoComplete="off" />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                            <Input {...register("email")} placeholder={t('auth.register.email')} autoComplete="off" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            <Input {...register("contact_person")} placeholder={t('auth.register.contactPerson')} autoComplete="off" />
                            {(errors as any).contact_person && <p className="text-red-500">{(errors as any).contact_person.message}</p>}
                        </div>
                    </div>
                    <div className="mb-[46px]">
                        <div className="pl-[4px] md:pl-[0px] mb-[26px]">
                            <h2 className="font-medium text-lg">{t('auth.register.userInfo')}</h2>
                        </div>
                        <div className="flex flex-col w-full gap-[5px] md:gap-[11px] md:w-[500px] md:pl-[75px] leading-4">
                            <Input {...register("password")} placeholder={t('auth.register.password')} type="password" autoComplete="off" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            <Input {...register("confirm_password")} placeholder={t('auth.register.confirmPassword')} type="password" autoComplete="off" />
                            {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                        </div>
                    </div>
                </>
            )}

            <div className="w-full md:mb-[54px]">
                <div className="mb-[10px] md:mb-[32px]">
                    <h2 className="font-medium text-lg pl-[10px]">{t('auth.register.contract')}</h2>
                </div>
                <div className="w-full">
                    {userType === "Eraisik" ? (
                        <Contract />
                    ) : (
                        <ContractCompany />
                    )
                    }
                </div>
            </div>
            <div className={cn("flex flex-col items-start w-full pl-[10px] mb-[35px] md:mb-[188px]")}>
                {!errors.agreement && <p className="pb-2 h-[32px]"></p>}
                {errors.agreement && <p className="text-red-500 pb-2">* {errors.agreement.message}</p>}
                <label className="flex items-center gap-[10px] cursor-pointer w-full">
                    <Input {...register("agreement")} type="checkbox" id="custom-checkbox" className="hidden peer" />
                    <div className="w-[26px] h-[26px] bg-[#FCC9B9] hidden peer-checked:flex shadow-inner-light items-center justify-center">
                        <Check width={24} height={24} className="text-black peer-checked:text-white" />
                    </div>
                    <div className="w-[26px] h-[26px] bg-[#FCC9B9] peer-checked:hidden shadow-inner-light flex items-center justify-center">
                    </div>
                    <h2 className="font-medium text-base w-[90%]">{t('auth.register.agreementText')}</h2>
                </label>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-end gap-[20px] md:mr-[70px] md:mb-[51px]">
                <Button onClick={(e) => {
                    e.preventDefault()
                    router.push("/")
                }} className="order-2 md:order-1 w-[226px] h-[42px] rounded-full md:rounded-lg md:w-[202px] md:h-[75px] bg-[#D9D9D9] hover:text-white text-black">
                    {t('auth.register.cancel')}
                </Button>
                <SubmitButton disabled={isSubmitting} className="bg-accent w-[226px] h-[42px] rounded-full md:rounded-lg hover:bg-accent md:w-[202px] md:h-[75px] text-black cursor">
                    <h1 className={cn(isSubmitting ? " hidden " : "block")}>
                        {t('auth.register.confirm')}
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

export { RegisterForm }