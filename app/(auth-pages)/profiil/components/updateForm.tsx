"use client"
import { useToast } from "@/components/hooks/use-toast"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TAccountInformationSchemaClient, updateInformationClient } from "@/lib/register-validation"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { Contract } from "../../registreeri/components/contract"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Address, TAddressSearchSchema } from "@/lib/search-validation"
import { debounce } from "lodash"
import { Suggestions } from "./suggestions"
import { Feature } from "@/lib/coordinates-validation"
import Link from "next/link"

const UpdateForm = ({ user, email, id }: { user: TAccountInformationSchemaClient, email: string, id: string }) => {

    const toast = useToast()
    const router = useRouter()
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [chosenSuggestion, setChosenSuggestion] = useState<Feature>();
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TAccountInformationSchemaClient>({
        resolver: zodResolver(updateInformationClient),
        defaultValues: user,
    });


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

    const onSubmit = async (data: TAccountInformationSchemaClient) => {
        console.log(chosenSuggestion)
        const formData = {
            ...data,
            address: chosenSuggestion,
        };

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

    const fetchSuggestions = useCallback(
        debounce(async (value: string) => {
            if (value.length === 0) {
                setShowSuggestions(false);
                return;
            }

            setShowSuggestions(true);

            const data: TAddressSearchSchema = {
                input: value,
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
            <div className="mb-[52px]">
                <div className="mb-[22px]">
                    <h2 className="font-medium text-lg">Isikuandmed</h2>
                </div>
                <div className="flex flex-col gap-[11px] leading-4">
                    <Input disabled={true} placeholder={email} />
                    <Input  {...register("first_name")} placeholder="Nimi" autoComplete="off" />
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
                    <Input {...register("phone")} placeholder="Tel nr" />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
            </div>

            {user.agreement ? "" :
                <div>
                    <div className="w-full">
                        <div className="mb-[32px]">
                            <h2 className="font-medium text-lg">Leping</h2>
                        </div>
                        <div className="w-full">
                            <Contract />
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
            }
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