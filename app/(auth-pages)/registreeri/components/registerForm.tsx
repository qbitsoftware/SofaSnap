"use client"

import { useToast } from "@/components/hooks/use-toast"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerValidator, TSignUpSchema } from "@/lib/register-validation"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { Contract } from "./contract"
import { Suggestions } from "../../profiil/components/suggestions"
import { Address, TAddressSearchSchema } from "@/lib/search-validation"
import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"
import { useRouter } from "next/navigation"
import { Feature } from "@/lib/coordinates-validation"

const RegisterForm = () => {

    const router = useRouter()
    const toast = useToast()
    //search bar stuff
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [chosenSuggestion, setChosenSuggestion] = useState<Feature>();
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const id = "somerandomuseridchangelater"

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(registerValidator),
    });


    const onSubmit = async (data: TSignUpSchema) => {
        const formData = {
            ...data,
            address: chosenSuggestion,
        };


        const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseData = await response.json()

        if (!response.ok) {
            const { code } = responseData
            if (code == "user_already_exists") {
                toast.toast({
                    title: "User with this email already exists",
                })
                return
            }
            toast.toast({
                title: "Register failed, contact administrator",
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
            router.push("/")
            router.refresh()
        }
    }

    useEffect(() => {
        function suggestion() {
            setTimeout(() => {
                setShowSuggestions(false);
            }, 200)
        }
        document.addEventListener('mousedown', suggestion);
        return () => {
            document.removeEventListener('mousedown', suggestion);
        };
    }, []);

    const fetchSuggestions = useCallback(
        debounce(async (value: string) => {
            if (value.length === 0) {
                setShowSuggestions(false);
                return;
            }

            setShowSuggestions(true);

            const data: TAddressSearchSchema = {
                input: value,
                //just take email instead of userid becuase user is not logged in and does not have id at that moment
                user_id: id,
            };

            try {
                const response = await fetch("/api/suggestion", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const responseData = await response.json();

                if (response.ok) {
                    setSuggestions(responseData.data);
                }
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }, 300),
        [id, setShowSuggestions, setSuggestions, setIsLoading]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setIsLoading(true)
        fetchSuggestions(value);
    };


    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[26px] md:mb-[52px]">
                <div className="mb-[29px] pl-[4px] md:pl-[0px] md:mb-[22px]">
                    <h2 className="font-medium text-lg">Isikuandmed</h2>
                </div>
                <div className="flex flex-col w-full gap-[5px] md:gap-[11px] md:w-[500px] md:pl-[75px] leading-4">
                    <Input {...register("first_name")} placeholder="Nimi" autoComplete="off" />
                    {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                    <Input {...register("last_name")} placeholder="Perekonnanimi" autoComplete="off" />
                    {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                    <div className="relative">
                        <Input
                            {...register("address")}
                            placeholder="Aadress"
                            onChange={handleInputChange}
                            value={inputValue}
                            autoComplete="off"
                        />
                        <Suggestions
                            isLoading={isLoading}
                            suggestions={suggestions}
                            showSuggestions={showSuggestions}
                            inputValue={inputValue}
                            setChosenSuggestion={setChosenSuggestion}
                            setInputValue={setInputValue}
                            id={id}
                        />
                        <p className="italic text-sm pl-1 pt-1 text-slate-700">Naide: Tamme 5</p>
                    </div>
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    <Input {...register("phone")} placeholder="Tel nr" autoComplete="off" />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
            </div>
            <div className="mb-[46px]">
                <div className="pl-[4px] md:pl-[0px] mb-[26px]">
                    <h2 className="font-medium text-lg">Kasutaja info</h2>
                </div>
                <div className="flex flex-col w-full gap-[5px] md:gap-[11px] md:w-[500px] md:pl-[75px] leading-4">
                    <Input {...register("email")} placeholder="Meiliaadress" autoComplete="off" />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    <Input {...register("password")} placeholder="Parool" type="password" autoComplete="off" />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    <Input {...register("confirm_password")} placeholder="Parool veel kord" type="password" autoComplete="off" />
                    {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                </div>
            </div>
            <div className="w-full md:mb-[54px]">
                <div className="mb-[10px] md:mb-[32px]">
                    <h2 className="font-medium text-lg pl-[10px]">Leping</h2>
                </div>
                <div className="w-full">
                    <Contract />
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
                    <h2 className="font-medium text-base w-[90%]">Olen tutvunud lepingu tingimustega ja nõustun käesoleva lepinguga.</h2>
                </label>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-end gap-[20px] md:mr-[70px] md:mb-[51px]">
                <Button onClick={(e) => {
                    e.preventDefault()
                    router.push("/")
                }} className="order-2 md:order-1 w-[226px] h-[42px] rounded-full md:rounded-lg md:w-[202px] md:h-[75px] bg-[#D9D9D9] hover:text-white text-black">
                    Tühista
                </Button>
                <SubmitButton disabled={isSubmitting} className="bg-accent w-[226px] h-[42px] rounded-full md:rounded-lg hover:bg-accent md:w-[202px] md:h-[75px] text-black cursor">
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
        </form >
    )
}

export { RegisterForm }