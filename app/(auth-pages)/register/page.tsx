"use client"

import { Input } from "@/components/ui/input"
import { Contract } from "./components/contract"
import { Check } from "lucide-react"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { registerValidator, TSignUpSchema } from "@/lib/register-validation"
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipLoader } from "react-spinners"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/hooks/use-toast"
import { GetUserInfo } from "@/app/actions"
import { useEffect } from "react"


const Page = () => {

    const toast = useToast()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/register", {
                    method: "GET",
                });

                if (response.ok) {
                    const user = await response.json();
                    console.log("user", user);
                } else {
                    console.error("Error fetching data:", response.status);
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }

        };


        fetchData(); // Call the async function
    }, []);


    const initialData: TSignUpSchema = {
        first_name: "madis",
        last_name: "timofei",
        phone: "test",
        password: "test",
        confirm_password: "test",
        address: "testaddress",
        agreement: true,
        email: "indrek@gmail.com"
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
        setError,
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(registerValidator),
        defaultValues: initialData,
    });



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
            toast.toast({
                title: "Submitting form failed",
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
            toast.toast({
                title: "Account created successfully",
            })
        }
    }

    return (
        <div className="flex flex-col items-center mt-[68px] mx-auto">
            <div className="px-[64px] max-w-[1440px]">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-[52px]">
                        <div className="mb-[22px]">
                            <h2 className="font-medium text-lg">Isikuandmed</h2>
                        </div>
                        <div className="flex flex-col gap-[11px] pl-[75px] w-[424px] leading-4">
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
                    <div className="mb-[46px]">
                        <div className="mb-[27px]">
                            <h2 className="font-medium text-lg">Kasutaja info</h2>
                        </div>
                        <div className="flex flex-col gap-[11px] pl-[75px] leading-4 w-[424px]">
                            <Input {...register("email")} placeholder="Meiliaadress" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            <Input {...register("password")} placeholder="Parool" type="password" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            <Input {...register("confirm_password")} placeholder="Parool veel kord" type="password" />
                            {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                        </div>
                    </div>
                    <div className="w-full mb-[54px]">
                        <div className="mb-[32px]">
                            <h2 className="font-medium text-lg">Leping</h2>
                        </div>
                        <div className="w-full">
                            <Contract />
                        </div>
                    </div>
                    <div className="flex flex-col items-start pl-[10px] mb-[188px]">
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
                    <div className="relative z-10 flex items-center justify-end gap-[20px] mr-[70px] mb-[51px]">
                        <Button className="md:w-[202px] md:h-[75px] bg-[#D9D9D9] hover:text-white text-black">
                            Tühista
                        </Button>
                        <SubmitButton disabled={isSubmitting} className="bg-accent hover:bg-accent md:w-[202px] md:h-[75px] text-black cursor">
                            <h1 className={cn(isSubmitting ? " hidden " : "block")}>
                                Kinnita
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
                </form>
            </div>
            <div className="flex w-full h-[532px] mb-[324px] ml-[-350px] lg:ml-[-200px] lg:scale-125 xl:ml-[0px] xl:scale-150 2xl:scale-175 2xl:ml-[250px] overflow-hidden">
                <Image src={"/images/couch.svg"} height={532} width={1063} objectFit="contain" alt="couch" />
            </div>
        </div>
    )
}

export default Page