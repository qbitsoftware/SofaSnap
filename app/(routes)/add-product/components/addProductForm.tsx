"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { useToast } from '@/components/hooks/use-toast';
import { productSchema, TProduct } from '@/lib/product-validation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar"
import { Label } from '@/components/ui/label';
import { CalendarDays, CalendarIcon, Map } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Address, TAddressSearchSchema } from '@/lib/search-validation';
import { Feature } from '@/lib/coordinates-validation';
import { Suggestions } from '@/app/(auth-pages)/account/components/suggestions';
import { debounce } from 'lodash';
import { AdvancedImageInput } from './uploadForm';


const AddProductForm = ({ id }: { id: string }) => {
    const toast = useToast()
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [width, setW] = useState<string>()
    const [heigth, setH] = useState<string>()
    const [length, setL] = useState<string>()
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [chosenSuggestion, setChosenSuggestion] = useState<Feature>();
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [listingType, setListingType] = useState<"rent" | "sell" | null>(null)

    const handleListingTypeChange = (value: "rent" | "sell") => {
        setListingType(value)
    }

    const formatDate = (date: Date | undefined) => {
        if (!date) return ''
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
        trigger,
        setError,
        setValue,
    } = useForm<TProduct>({
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

    const onSubmit = async (data: TProduct) => {
        const response = await fetch("/api/product", {
            method: "POST",
            body: JSON.stringify(data),
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
                setError("details", {
                    type: "server",
                    message: errors.details,
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setIsLoading(true)
        fetchSuggestions(value);
    };

    const handleSelectChange = async (value: string) => {
        setValue("category", value);
        await trigger("category");
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[46px]">
                <div className="mb-[27px]">
                    <h2 className="font-medium text-lg">Kategooriad</h2>
                </div>
                <div className="flex flex-col gap-[11px] leading-4 min-w-[424px] lg:w-[500px] max-w-[1440px]">
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Vali kategooria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Esik</SelectItem>
                            <SelectItem value="option2">Elutuba</SelectItem>
                            <SelectItem value="option3">Kook</SelectItem>
                            <SelectItem value="option4">Vannituba</SelectItem>
                            <SelectItem value="option5">Piduvark</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-col mt-[44px] gap-[30px]">
                        <h2 className="font-medium text-lg">Toote kirjeldus</h2>
                        <Input {...register("description")} placeholder="Mis tootega on tegemist" autoComplete='off' />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        {/* Size input */}
                        <div className='flex items-center gap-2'>
                            <Input {...register("width")} placeholder='Laius' className="w-20 text-center" onChange={data => setW(data.target.value)} />
                            {errors.width && <p className="text-red-500">{errors.width.message}</p>}
                            <span className="text-gray-500">x</span>
                            <Input {...register("heigth")} placeholder='Korgus' className="w-20 text-center" onChange={data => setH(data.target.value)} />
                            {errors.heigth && <p className="text-red-500">{errors.heigth.message}</p>}
                            <span className="text-gray-500">x</span>
                            <Input {...register("length")} placeholder='Pikkus' className="w-20 text-center" onChange={data => setL(data.target.value)} />
                            {errors.length && <p className="text-red-500">{errors.length.message}</p>}
                            <p className="text-sm text-gray-500">
                                {width || '0'} cm x {heigth || '0'} cm x {length || '0'} cm
                            </p>
                        </div>
                        {/* Some random easy inputs */}
                        <Input {...register("material")} placeholder='Materjal' autoComplete='off' />
                        {errors.material && <p className="text-red-500">{errors.material.message}</p>}
                        <Input {...register("details")} placeholder='Uksikasjad' autoComplete='off' />
                        {errors.details && <p className="text-red-500">{errors.details.message}</p>}
                    </div>
                    {/* Date picker */}
                    <div className="py-[108px]">
                        <div className="">
                            <Popover>
                                <PopoverTrigger asChild className='py-8 px-2'>
                                    <Button
                                        id="date-range"
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-center text-center font-normal rounded-2xl",
                                            !dateRange?.from
                                        )}
                                    >
                                        <CalendarDays className="mr-2 h-[26px] w-[29px] " />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                                                </>
                                            ) : (
                                                formatDate(dateRange.from)
                                            )
                                        ) : (
                                            <span className='text-muted-foreground'>Kuulutuse algus ja lopu kuupaevad</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateRange?.from}
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        {dateRange?.from && dateRange.to && (
                            <p className="text-sm text-center text-muted-foreground">
                                Valitud vahemik: {formatDate(dateRange.from)} to {formatDate(dateRange.to)}
                            </p>
                        )}
                    </div>
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
                                />
                            </div>
                        </div>
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
                    </div>
                    <div>
                        <AdvancedImageInput />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button disabled={isSubmitting} className="bg-accent hover:bg-accent md:w-[202px] md:h-[55px] text-black cursor" type="submit">
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
                </Button>
            </div>
        </form>
    )
}

export { AddProductForm }
