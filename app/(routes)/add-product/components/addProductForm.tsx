"use client"
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { useToast } from '@/components/hooks/use-toast';
import { IImage, productSchema, productSchemaServer, TProductClient } from '@/lib/product-validation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Map } from 'lucide-react';
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
    const [images, setImages] = useState<IImage[]>([])
    const [listingType, setListingType] = useState<"rent" | "sell" | null>()

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
        // set user name beforehand
        setValue("user_id", id)
        document.addEventListener('mousedown', suggestion);
        return () => {
            document.removeEventListener('mousedown', suggestion);
        };
    }, []);

    const onSubmit = async (data: TProductClient) => {
        let formData = {
            ...data,
            user_id: id,
            address: chosenSuggestion,
            start_date: data.start_date instanceof Date ? data.start_date.toISOString() : "",
            end_date: data.end_date instanceof Date ? data.end_date.toISOString() : "",
            all_img: ["test", "test"],
        };

        //validate with server stuff first
        const validationResult = productSchemaServer.safeParse(formData);
        if (validationResult.error) {
            toast.toast({
                title: "Formi on valesit taidetud!",
            })
            console.log(validationResult.error)
            return
        }
        const imgData = new FormData();

        images.forEach((img) => {
            imgData.append('images', img.file)
        });

        const uploadResp = await fetch('/api/upload', {
            method: 'POST',
            body: imgData,
        });


        const uploadData = await uploadResp.json();

        if (!uploadResp.ok) {
            console.log('Upload successful:', data);
            toast.toast({
                title: "Pildi uleslaadimine ebaonnestus. Proovige hiljem uuesti",
            })
            return;
        }
        //update all_img with correct img data
        formData.all_img = uploadData.data
        //after validation if everythign is okay send the correct data
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
            if (errors.name) {
                setError("name", {
                    type: "server",
                    message: errors.name,
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


        //RESET ALL THE FORM VALUES FOR UX
        setCategory('')
        setValue("category", "")
        setW(0)
        setH(0)
        setL(0)
        setInputValue('')
        setImages([])
        setListingType(null)
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

    const handleDates = async (item: DateRange | undefined) => {
        setValue("start_date", item?.from);
        setValue("end_date", item?.to);
        await trigger(["start_date", "end_date"]);
    };

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setIsLoading(true)
        if (value.length >= 2) {
            fetchSuggestions(value);
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        setValue("address", inputValue)
        await trigger("address")
    };

    const handleCategoryChange = async (value: string) => {
        setCategory(value.toLocaleLowerCase())
        setValue("category", value.toLocaleLowerCase())
        await trigger("category");
    }

    const setImagesBase = async (value: string[]) => {
        setValue("all_img", value)
        await trigger("all_img")
    }

    const handleSubCategoryChange = async (value: string) => {
        setValue("sub_category", value);
        await trigger("sub_category");
    }

    const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("price", event.target.valueAsNumber)
        await trigger("price");
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[46px]">
                <div className="mb-[27px]">
                    <h2 className="font-medium text-lg">Kategooriad</h2>
                </div>
                <div className="flex flex-col gap-[11px] leading-4 min-w-[424px] lg:w-[500px] max-w-[1440px]">
                    <Select value={category} onValueChange={handleCategoryChange}>
                        <SelectTrigger className='bg-white'>
                            <SelectValue placeholder="Vali kategooria" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((item, index) => (
                                <SelectItem key={index} value={item.name_slug} className='bg-[#ffffff]'>{capitalize(item.name)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    <div>
                        <Select onValueChange={handleSubCategoryChange} disabled={category === ''}>
                            <SelectTrigger className='bg-white'>
                                <SelectValue placeholder="Mis tootega on tegemist" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    c.name_slug.toLocaleLowerCase() === category && c.sub_categories ? (
                                        c.sub_categories.map((sub_c, i) => (
                                            <SelectItem className='bg-white' key={i} value={sub_c}>
                                                {sub_c}
                                            </SelectItem>
                                        ))
                                    ) : null
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.sub_category && <p className="text-red-500">{errors.sub_category.message}</p>}
                    </div>
                    <div className="flex flex-col mt-[44px] gap-[30px]">
                        <h2 className="font-medium text-lg">Toote kirjeldus</h2>
                        <Input {...register("name")} placeholder='Nimi' className='bg-white' autoComplete='off' />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        {/* Size input */}
                        <div className=''>
                            <div className='flex items-center gap-2'>

                                <div>
                                    <Input
                                        {...register("width", { valueAsNumber: true })}
                                        value={width}
                                        placeholder='Laius'
                                        type='number'
                                        className="w-20 text-center bg-white"
                                        autoComplete='off'
                                        onChange={data => {
                                            setW(Number(data.target.value))
                                            setValue("width", Number(data.target.value))
                                            trigger("width")
                                        }}
                                    />
                                </div>
                                <span className="text-gray-500">x</span>
                                <div>
                                    <Label htmlFor='heigth'>Korgus</Label>
                                    <Input
                                        {...register("heigth", { valueAsNumber: true })}
                                        id='heigth'
                                        name='heigth'
                                        value={heigth}
                                        placeholder='Korgus'
                                        type='number'
                                        className="w-20 text-center bg-white"
                                        autoComplete='off'
                                        onChange={data => {
                                            setH(Number(data.target.value))
                                            setValue("heigth", Number(data.target.value))
                                            trigger("heigth")
                                        }}
                                    />
                                </div>
                                <span className="text-gray-500">x</span>
                                <div>
                                    <Input
                                        {...register("length", { valueAsNumber: true })}
                                        value={length}
                                        placeholder='Pikkus'
                                        type='number'
                                        className="w-20 text-center bg-white"
                                        autoComplete='off'
                                        onChange={data => {
                                            setL(Number(data.target.value))
                                            setValue("length", Number(data.target.value))
                                            trigger("length")
                                        }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    {width || '0'} cm x {heigth || '0'} cm x {length || '0'} cm
                                </p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                {(() => {
                                    const dimensionErrors = [
                                        errors.width,
                                        errors.heigth,
                                        errors.length
                                    ].filter(Boolean)

                                    if (dimensionErrors.length >= 2) {
                                        return <p className="text-red-500">Sisesta mõõtmed</p>
                                    }

                                    if (dimensionErrors.length === 1) {
                                        return <p className="text-red-500">{dimensionErrors[0]?.message}</p>
                                    }

                                    return null;
                                })()}
                            </div>
                        </div>


                        <div>
                            <Input {...register("material")} placeholder='Materjal' className='bg-white' autoComplete='off' />
                            {errors.material && <p className="text-red-500">{errors.material.message}</p>}

                        </div>
                        <div>
                            <Input {...register("description")} placeholder='Kirjeldus' className='bg-white' autoComplete='off' />
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </div>
                    </div>

                    <RadioGroup
                        value={listingType || ""}
                        onValueChange={handleListingTypeChange}
                        className="flex flex-col space-y-1 mt-2 h-full"
                    >
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="rent" className='w-[50px]'>Rent</Label>
                            <RadioGroupItem value="rent" id="rent" className='cursor-pointer' />
                            <div className="relative pl-[20px]">
                                <Input
                                    disabled={listingType != "rent"}
                                    placeholder="Rendi hind"
                                    className='max-w-[200px] rounded-xl bg-white'
                                    onChange={handleInput}
                                    type='number'
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="sell" className='w-[50px]'>Müük</Label>
                            <RadioGroupItem value="sell" id="sell" className='cursor-pointer' />
                            <div className="relative pl-[20px]">
                                <Input
                                    disabled={listingType != "sell"}
                                    placeholder="Müügi hind"
                                    className='max-w-[200px] rounded-xl bg-white'
                                    onChange={handleInput}
                                    type='number'
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <p className="text-red-500">
                            {errors.type ? errors.type.message : errors.price?.message}
                        </p>
                    </RadioGroup>

                    {listingType == "rent" && <div>
                        <Calender changeValueFunc={handleDates} disabled={["test", "test1", "test2", 'test3']} />
                        {(errors.start_date || errors.end_date) && (
                            <p className="text-red-500">
                                {errors.start_date ? errors.start_date.message : errors.end_date?.message}
                            </p>
                        )}
                    </div>}

                    <p className='flex items-center gap-1'>Aadress <span><Map /></span></p>
                    <div className="relative mb-[167px]">
                        <Input
                            {...register("address")}
                            placeholder="Sisesta aadress"
                            onChange={handleInputChange}
                            value={inputValue}
                            autoComplete="off"
                            className='bg-white'
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
                        <AdvancedImageInput images={images} setImages={setImages} baseValue={setImagesBase} />
                        {errors.all_img && <p className="text-red-500">{errors.all_img.message}</p>}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <SubmitButton onClick={() => { console.log(getValues()) }} disabled={isSubmitting} className="bg-accent hover:bg-accent md:w-[202px] md:h-[55px] text-black cursor" type="submit">
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
