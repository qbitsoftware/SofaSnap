"use client"
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { useToast } from '@/components/hooks/use-toast';
import { productSchema, TProductClient } from '@/lib/product-validation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar"
import { Label } from '@/components/ui/label';
import { CalendarDays, Map } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Address, TAddressSearchSchema } from '@/lib/search-validation';
import { Feature } from '@/lib/coordinates-validation';
import { Suggestions } from '@/app/(auth-pages)/account/components/suggestions';
import { debounce } from 'lodash';
import { AdvancedImageInput } from './uploadForm';
import { Category } from '@/utils/supabase/supabase.types';
import { capitalize } from '@/utils/utils';
import { SubmitButton } from '@/components/submit-button';
import { Calender } from '@/components/calender';


const AddProductForm = ({ id, categories }: { id: string, categories: Category[] }) => {
    const toast = useToast()
    const [category, setCategory] = useState<string>('')
    const [width, setW] = useState<number>(0)
    const [heigth, setH] = useState<number>(0)
    const [length, setL] = useState<number>(0)
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [chosenSuggestion, setChosenSuggestion] = useState<Feature>();
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [listingType, setListingType] = useState<"rent" | "sell" | null>("rent")

    const handleListingTypeChange = async (value: "rent" | "sell") => {
        setListingType(value)
        setValue("type", value)
        await trigger("type")
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        trigger,
        setError,
        setValue,
        getValues,
    } = useForm<TProductClient>({
        resolver: zodResolver(productSchema),
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

    const onSubmit = async (data: TProductClient) => {
        const formData = {
            ...data,
            address: chosenSuggestion,
        };
        const response = await fetch("/api/product", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseData = await response.json()

        if (!response.ok) {
            toast.toast({
                title: "Something went wrong. Try again later!",
            })
            return;
        }
        if (responseData.error) {
            toast.toast({
                title: responseData.error
            })
            return;
        }

        if (responseData.errors) {
            const errors = responseData.errors;
            if (errors.address) {
                setError("address", {
                    type: "server",
                    message: errors.address,
                })
            }
            if (errors.category) {
                setError("category", {
                    type: "server",
                    message: errors.category,
                })
            }
            if (errors.description) {
                setError("description", {
                    type: "server",
                    message: errors.description,
                })
            }
            if (errors.width) {
                setError("width", {
                    type: "server",
                    message: errors.width,
                })
            }
            if (errors.heigth) {
                setError("heigth", {
                    type: "server",
                    message: errors.heigth,
                })
            }
            if (errors.length) {
                setError("length", {
                    type: "server",
                    message: errors.length,
                })
            }
            if (errors.material) {
                setError("material", {
                    type: "server",
                    message: errors.material,
                })
            }
            if (errors.details) {
                setError("sub_category", {
                    type: "server",
                    message: errors.sub_category,
                })
            }
            if (errors.start_date) {
                setError("start_date", {
                    type: "server",
                    message: errors.start_date,
                })
            }
            if (errors.end_date) {
                setError("end_date", {
                    type: "server",
                    message: errors.end_date,
                })
            }
            if (errors.type) {
                setError("type", {
                    type: "server",
                    message: errors.type,
                })
            }
            if (errors.price) {
                setError("price", {
                    type: "server",
                    message: errors.price,
                })
            }
            if (errors.primary_img) {
                setError("primary_img", {
                    type: "server",
                    message: errors.primary_img,
                })
            }
            if (errors.secondary_img) {
                setError("secondary_img", {
                    type: "server",
                    message: errors.secondary_img,
                })
            }
            if (errors.all_img) {
                setError("all_img", {
                    type: "server",
                    message: errors.all_img,
                })
            }
            return
        }

        if (responseData.success) {
            toast.toast({
                title: "Successfully changed password",
            })
        }

        reset()
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
            console.log("DATA", data)
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
        []
    );

    const handleDates = async (item: DateRange | undefined) => {
        setValue("start_date", item?.from!);
        setValue("end_date", item?.to!);
        await trigger("start_date");
        await trigger("end_date");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setIsLoading(true)
        fetchSuggestions(value);
    };

    const handleCategoryChange = async (value: string) => {
        await trigger("category");
        setCategory(value.toLocaleLowerCase())
    }

    const setImages = async (value: string[]) => {
        setValue("all_img", value)
        await trigger("all_img")
    }

    const handleSubCategoryChange = async (value: string) => {
        setValue("sub_category", value);
        await trigger("sub_category");
    }

    const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("price", event.target.value)
        await trigger("price");
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[46px]">
                <div className="mb-[27px]">
                    <h2 className="font-medium text-lg">Kategooriad</h2>
                </div>
                <div className="flex flex-col gap-[11px] leading-4 min-w-[424px] lg:w-[500px] max-w-[1440px]">
                    <Select onValueChange={handleCategoryChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Vali kategooria" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((item, index) => (
                                <SelectItem key={index} value={item.name}>{capitalize(item.name)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    <div className="flex flex-col mt-[44px] gap-[30px]">
                        <div>
                            <h2 className="font-medium text-lg">Toote kirjeldus</h2>
                            <Select onValueChange={handleSubCategoryChange} disabled={category === ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Mis tootega on tegemist" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        c.name.toLocaleLowerCase() === category && c.sub_categories ? (
                                            c.sub_categories.map((sub_c, i) => (
                                                <SelectItem key={i} value={sub_c}>
                                                    {sub_c}
                                                </SelectItem>
                                            ))
                                        ) : null
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.sub_category && <p className="text-red-500">{errors.sub_category.message}</p>}
                        </div>
                        {/* Size input */}
                        <div className='flex items-center gap-2'>
                            <div>
                                <Input {...register("width", { valueAsNumber: true })} value={width} placeholder='Laius' type='number' className="w-20 text-center" autoComplete='off' onChange={data => setW(Number(data.target.value))} />
                                {errors.width && <p className="text-red-500">{errors.width.message}</p>}
                            </div>
                            <span className="text-gray-500">x</span>
                            <div>
                                <Input {...register("heigth", { valueAsNumber: true })} value={heigth} placeholder='Korgus' type='number' className="w-20 text-center" autoComplete='off' onChange={data => setH(Number(data.target.value))} />
                                {errors.heigth && <p className="text-red-500">{errors.heigth.message}</p>}
                            </div>
                            <span className="text-gray-500">x</span>
                            <div>
                                <Input {...register("length", { valueAsNumber: true })} value={length} placeholder='Pikkus' type='number' className="w-20 text-center" autoComplete='off' onChange={data => setL(Number(data.target.value))} />
                                {errors.length && <p className="text-red-500">{errors.length.message}</p>}
                            </div>
                            <p className="text-sm text-gray-500">
                                {width || '0'} cm x {heigth || '0'} cm x {length || '0'} cm
                            </p>
                        </div>
                        {/* Some random easy inputs */}
                        <div>
                            <Input {...register("material")} placeholder='Materjal' autoComplete='off' />
                            {errors.material && <p className="text-red-500">{errors.material.message}</p>}

                        </div>
                        <div>
                            <Input {...register("description")} placeholder='Uksikasjad' autoComplete='off' />
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </div>
                    </div>



                    {/* CALENDER COMES HERE */}
                    {listingType == "rent" && <div>
                        <Calender changeValueFunc={handleDates} disabled={["test", "test1", "test2", 'test3']} />
                        {errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
                        {errors.end_date && <p className="text-red-500">{errors.end_date.message}</p>}
                    </div>}

                    <RadioGroup
                        value={listingType || ""}
                        onValueChange={handleListingTypeChange}
                        className="flex flex-col space-y-1 mt-2 h-full mb-[100px]"
                    >
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="rent" className='w-[50px]'>Rent</Label>
                            <RadioGroupItem value="rent" id="rent" />
                            <div className="relative pl-[20px]">
                                <Input
                                    disabled={listingType != "rent"}
                                    placeholder="Rendi hind"
                                    className={`max-w-[200px] rounded-xl`}
                                    onChange={handleInput}
                                    type='number'
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="sell" className='w-[50px]'>Müük</Label>
                            <RadioGroupItem value="sell" id="sell" />
                            <div className="relative pl-[20px]">
                                <Input
                                    disabled={listingType != "sell"}
                                    placeholder="Müügi hind"
                                    className={`max-w-[200px] rounded-xl`}
                                    onChange={handleInput}
                                    type='number'
                                />
                            </div>
                        </div>
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </RadioGroup>
                    <p className='flex items-center gap-1'>Aadress <span><Map /></span></p>
                    <div className="relative mb-[167px]">
                        <Input
                            {...register("address")}
                            placeholder="Sisesta aadress"
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
                        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    </div>
                    <div>
                        <AdvancedImageInput insertFunc={setImages} />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <SubmitButton disabled={isSubmitting} onClick={() => console.log(getValues())} className="bg-accent hover:bg-accent md:w-[202px] md:h-[55px] text-black cursor" type="submit">
                    <h1 className={cn(isSubmitting ? " hidden " : "block")}>
                        Lisa toode
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
    )
}

export { AddProductForm }
