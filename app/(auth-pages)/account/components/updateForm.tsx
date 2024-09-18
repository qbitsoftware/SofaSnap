"use client"
import { useToast } from "@/components/hooks/use-toast"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TAccountInformationSchema, updateInformation } from "@/lib/register-validation"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { Contract } from "../../register/components/contract"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Address, TAddressSearchSchema } from "@/lib/search-validation"
import { debounce } from "lodash"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@radix-ui/react-separator"

const UpdateForm = ({ user, email, id }: { user: TAccountInformationSchema, email: string, id: string }) => {

    const toast = useToast()
    const router = useRouter()
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

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


    useEffect(() => {
        function suggestion() {
            setShowSuggestions(false);
        }
        document.addEventListener('mousedown', suggestion);
        return () => {
            document.removeEventListener('mousedown', suggestion);
        };
    }, []);

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
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }, 300),
        []
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        fetchSuggestions(value);
    };

    // const handleSuggestionClick = (suggestion: string) => {
    //     setInputValue(suggestion); // Set input value to the selected suggestion
    //     setShowSuggestions(false); // Hide suggestions
    //     // Optionally, you might also want to set this value in the form state
    // };


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
                    <div className="relative">
                        <Input
                            {...register("address")}
                            placeholder="Aadress"
                            onChange={handleInputChange}
                            value={inputValue}
                            autoComplete="off"
                        />
                        {isLoading ?
                            <div className="space-y-2 bg-red-500">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                            :
                            <div>
                            </div>}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-xl z-50">
                                {suggestions.map((suggestion, index) => (
                                    <div key={index} className="hover:bg-gray-200 cursor-pointer w-full">
                                        <div className="p-4">
                                            <h1 className="font-bold pb-3">{suggestion.name}</h1>
                                            <p className="text-slate-500">{suggestion.place_formatted}</p>
                                        </div>
                                        {index + 1 != suggestions.length ?
                                            <Separator className="w-full h-[2px] bg-gray-300" />
                                            :
                                            ""
                                        }
                                    </div>
                                ))}
                            </div>
                        )}
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
                    <div className="flex flex-col items-start pl-[10px] mb-[78px]">
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