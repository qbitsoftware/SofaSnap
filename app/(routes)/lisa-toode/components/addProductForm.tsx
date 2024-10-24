"use client"
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { useToast } from '@/components/hooks/use-toast';
import { IImage, productSchema, productSchemaServer, TProductClient, TProductServer } from '@/lib/product-validation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Map } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Address, TAddressSearchSchema } from '@/lib/search-validation';
import { AddressProduct, Feature } from '@/lib/coordinates-validation';
import { Suggestions } from '@/app/(auth-pages)/profiil/components/suggestions';
import { capitalize, debounce } from 'lodash';
import { AdvancedImageInput } from './uploadForm';
import { AddressTS, Category } from '@/utils/supabase/supabase.types';
import { SubmitButton } from '@/components/submit-button';
import { Calender } from '@/components/calender';
import { createProductAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TSignUpSchema } from '@/lib/register-validation';
import { Listing } from '@/types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';

interface ProductFormProps {
    id: string
    categories: Category[]
    user_metadata: TSignUpSchema
    initialData: Listing | null
    address?: AddressTS
}

export const AddProductForm = ({ id, categories, user_metadata, initialData, address }: ProductFormProps) => {
    const toast = useToast()
    const router = useRouter()
    const [suggestions, setSuggestions] = useState<Address[]>([]);
    const [chosenSuggestion, setChosenSuggestion] = useState<Feature>();
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [images, setImages] = useState<IImage[]>([])

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            user_id: id,
            name: "",
            category: "",
            sub_category: "",
            width: 0,
            heigth: 0,
            length: 0,
            material: "",
            description: "",
            start_date: undefined,
            end_date: undefined,
            type: "",
            price: 0,
            address: "",
            all_img: [],
            unique_id: crypto.randomUUID(),
        }
    })

    const [subCategories, setSubCategories] = useState<string[] | null>([]);

    useEffect(() => {
        // Initial load for the subcategories
        const initialCategory = form.getValues("category");
        const selectedCategory = categories.find(c => c.name_slug.toLowerCase() === initialCategory);
        setSubCategories(selectedCategory ? selectedCategory.sub_categories : []);

        // Subscribe to category changes
        const subscription = form.watch((values) => {
            const categoryValue = values.category; // Access the watched category value
            const selectedCategory = categories.find(c => c.name_slug.toLowerCase() === categoryValue);
            setSubCategories(selectedCategory ? selectedCategory.sub_categories : []);
        });

        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
    }, [form, categories]);

    useEffect(() => {
        function suggestion() {
            setTimeout(() => {
                setShowSuggestions(false);
            }, 200)
        }

        if (address) {
            // set address
            setChosenSuggestion({
                type: "",
                geometry: {
                    type: "",
                    coordinates: [address.location.x, address.location.y],
                },
                properties: {
                    context: {
                        country: {
                            country_code: address.country_code,
                            name: address.country_name,
                        },
                        region: {
                            name: address.region,
                        },
                        postcode: {
                            name: address.postal_code,
                        },
                        place: {
                            name: "",
                        },
                        address: {
                            address_number: address.address_number,
                            street_name: "",
                        },
                    },
                    coordinates: {
                        latitude: address.location.x,
                        longitude: address.location.y,
                    },
                    full_address: address.full_address,
                    mapbox_id: "",
                    place_formatted: address.full_address,
                },
            })
            form.setValue("address", address.full_address)
        }
        //set images
        if (initialData && initialData.all_img) {
            const imagesToAdd: IImage[] = []
            initialData.all_img.map((url) => {
                imagesToAdd.push({ name: url.slice(url.lastIndexOf('-') + 1), preview: url, id: Math.random().toString(36).substr(2, 9), file: undefined })
            })
            setImages(imagesToAdd)
        }
        document.addEventListener('mousedown', suggestion);
        return () => {
            document.removeEventListener('mousedown', suggestion);
        };
    }, []);

    const onSubmit = async (data: Listing) => {
        console.log("Submitting", data)


        let converted_address: AddressProduct = {}
        if (chosenSuggestion) {
            converted_address = {
                full_address: chosenSuggestion.properties.full_address,
                location: [chosenSuggestion.geometry.coordinates[0], chosenSuggestion.geometry.coordinates[1]],
                postal_code: chosenSuggestion.properties.context.postcode.name,
                address_number: chosenSuggestion.properties.context.address.address_number,
                region: chosenSuggestion.properties.context.region.name,
                country_code: chosenSuggestion.properties.context.country.country_code,
                country_name: chosenSuggestion.properties.context.country.name,
            }
        }
        const formData: TProductServer = {
            ...data,
            address: converted_address,
            start_date: data.start_date instanceof Date ? data.start_date.toISOString() : "",
            end_date: data.end_date instanceof Date ? data.end_date.toISOString() : "",
        };
        // if (initialData) {
        //     console.log("initialData", initialData)
        //     console.log("formData", formData)
        //     return
        // }
        // //validate with server stuff first
        const validationResult = productSchemaServer.safeParse(formData);
        if (validationResult.error) {
            toast.toast({
                title: "Formi on valesit taidetud!",
            })
            console.log(validationResult.error)
            return
        }

        if (user_metadata.agreement == undefined || !user_metadata.agreement) {
            toast.toast({
                title: "Kuulutuse lisamiseks peate noustuma meie teenuse tingimustega!",
                description: (
                    <>
                        Noustuge meie tingimustega {' '}
                        <Link href="/profiil" className="underline font-medium">
                            siin
                        </Link>
                        .
                    </>
                ),
            })
            return
        }

        const imgData = new FormData();
        console.log("images", images)
        if (initialData) {
            const removedItems = initialData.all_img.filter(item => !data.all_img.includes(item.slice(item.lastIndexOf('-') + 1)));
            if (removedItems.length > 0) {
                removedItems.map((img) => {
                    imgData.append('remove_images', img.split('/resources/')[1].trim())
                })
            }
        }
        images.forEach((img) => {
            if (img.file) {
                imgData.append('images', img.file)
            }
        });

        const uploadResp = await fetch('/api/upload', {
            method: 'POST',
            body: imgData,
        });

        // if (initialData) {
        //     console.log("returing")
        //     return
        // }
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
        if (initialData) {
            formData.all_img.push(...initialData.all_img.filter(item => data.all_img.includes(item.slice(item.lastIndexOf('-') + 1))))
        }
        console.log("formData", formData.all_img)

        const response = await createProductAction(formData)
        if (response.status === 400) {
            toast.toast({
                title: "Midagi laks valesti :(",
                description: "Proovige hiljem uuesti!"
            })
            return
        } else if (response.status === 500) {
            toast.toast({
                title: "Midagi laks valesti :(",
                description: "Proovige hiljem uuesti!"
            })
            return
        } else if (response.status === 200) {
            console.log("Everything is okay")
            toast.toast({
                title: "Kuulutus edukalt lisatud",
                description: (
                    <>
                        Saad enda kuulutusi hallata{' '}
                        <Link href="/kuulutused" className="underline font-medium">
                            siit
                        </Link>
                        .
                    </>
                ),
            })
        }

        form.reset()
        setImages([])
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
                user_id: form.getValues("user_id"),
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

    const handleDates = async (item: DateRange | undefined) => {
        form.setValue("start_date", item?.from);
        form.setValue("end_date", item?.to);
        await form.trigger(["start_date", "end_date"]);
    };

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setIsLoading(true)
        if (value.length >= 2) {
            fetchSuggestions(value);
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        form.setValue("address", value)
        await form.trigger("address")
    };

    const setFormValue = (value: string) => {
        form.setValue("address", value)
    }

    const handleImages = async (value: string[]) => {
        form.setValue("all_img", value)
        await form.trigger("all_img")
    }

    const handleInputChangeSize = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: number | '') => void) => {
        const value = e.target.value
        if (value === '' || value === '0') {
            onChange('')
        } else {
            onChange(+value)
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className='flex flex-col gap-[10px]'>
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Kategooria</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className='bg-white'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Valige kategooria" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className=''>
                                        {categories.map((category) => (
                                            <SelectItem key={category.name} value={category.name}>{capitalize(category.name)}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sub_category"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange}
                                    disabled={form.getValues("category") === ''}
                                    defaultValue={field.value}>
                                    <FormControl className='bg-white'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Mis tootega on tegemist" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        {subCategories.map((sub_c, i) => (
                                            <SelectItem className='bg-white' key={i} value={sub_c}>
                                                {capitalize(sub_c)}
                                            </SelectItem>
                                        ))}
                                        {/* {categories.map((c) => (
                                            c.name_slug.toLocaleLowerCase() === form.getValues("category") && c.sub_categories ? (
                                                c.sub_categories.map((sub_c, i) => (
                                                    <SelectItem className='bg-white' key={i} value={sub_c}>
                                                        {capitalize(sub_c)}
                                                    </SelectItem>
                                                ))
                                            ) : null
                                        ))} */}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <h2 className="font-medium text-lg">Toote kirjeldus</h2>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl className='bg-white'>
                                <Input placeholder="Nimi" {...field} autoComplete='off' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col items-center">
                    <div className='flex items-end space-x-2 sm:space-x-4'>
                        <FormField
                            control={form.control}
                            name="width"
                            render={({ field }) => (
                                <FormItem className='flex flex-col items-center w-[100px] md:w-[125px]'>
                                    <FormLabel>Laius (cm)</FormLabel>
                                    <FormControl className='bg-white text-center'>
                                        <Input type="number" {...field} onChange={e => handleInputChangeSize(e, field.onChange)} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <span className="text-lg mb-1">X</span>
                        <FormField
                            control={form.control}
                            name="heigth"
                            render={({ field }) => (
                                <FormItem className='flex flex-col items-center w-[100px] md:w-[125px]'>
                                    <FormLabel>Kõrgus (cm)</FormLabel>
                                    <FormControl className='bg-white text-center'>
                                        <Input type="number" {...field} onChange={e => handleInputChangeSize(e, field.onChange)} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <span className="text-lg mb-1">X</span>
                        <FormField
                            control={form.control}
                            name="length"
                            render={({ field }) => (
                                <FormItem className='flex flex-col items-center w-[100px] md:w-[125px]'>
                                    <FormLabel>Pikkus (cm)</FormLabel>
                                    <FormControl className='bg-white text-center'>
                                        <Input type="number" {...field} onChange={e => handleInputChangeSize(e, field.onChange)} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Error messages */}
                    <div className="flex mt-2">
                        {form.formState.errors.width?.message && (
                            <p className="text-sm font-medium text-destructive">{form.formState.errors.width.message}</p>
                        )}
                        {form.formState.errors.heigth?.message && !form.formState.errors.width?.message && (
                            <p className="text-sm font-medium text-destructive">{form.formState.errors.heigth.message}</p>
                        )}
                        {form.formState.errors.length?.message && !form.formState.errors.width?.message && !form.formState.errors.heigth?.message && (
                            <p className="text-sm font-medium text-destructive">{form.formState.errors.length.message}</p>
                        )}
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl className='bg-white'>
                                <Input {...field} placeholder='Materjal' autoComplete='off' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl className='bg-white'>
                                <Input {...field} placeholder='Kirjeldus' autoComplete='off' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl className=''>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-4"
                                >
                                    <FormItem className="flex items-center space-x-3 h-[40px] space-y-0">
                                        <FormLabel className="font-normal w-[50px]">Rendi</FormLabel>
                                        <FormControl className='bg-white'>
                                            <RadioGroupItem value="rent" />
                                        </FormControl>
                                        {form.getValues("type") === "rent" && (
                                            <FormField
                                                control={form.control}
                                                name="price"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl className='bg-white'>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                placeholder="Price"
                                                                onChange={(e) => field.onChange(+e.target.value)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                    </FormItem>

                                    <FormItem className="flex items-center space-x-3 h-[40px] space-y-0">
                                        <FormLabel className="font-normal w-[50px] ">Müü</FormLabel>
                                        <FormControl className='bg-white'>
                                            <RadioGroupItem value="sell" />
                                        </FormControl>
                                        {form.getValues("type") === "sell" && (
                                            <FormField
                                                control={form.control}
                                                name="price"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl className='bg-white'>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                placeholder="Price"
                                                                onChange={(e) => field.onChange(+e.target.value)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    form.watch("type") === "rent" && <div className='md:h-[180px] md:pt-[50px]'>
                        <FormField
                            control={form.control}
                            name="start_date"
                            render={() => (
                                <FormItem>
                                    <Calender changeValueFunc={handleDates} disabled={[]} start_date={initialData?.start_date} end_date={initialData?.end_date} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="end_date"
                            render={() => (
                                <FormItem>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                }

                < FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <p className='flex items-center gap-1'>Aadress <span><Map /></span></p>
                            </FormLabel>
                            <FormControl className='bg-white'>
                                <Input placeholder="Aadress" {...field} onChange={handleInputChange} autoComplete='off' />
                            </FormControl>
                            <div className='relative'>
                                <Suggestions
                                    isLoading={isLoading}
                                    suggestions={suggestions}
                                    showSuggestions={showSuggestions}
                                    inputValue={form.getValues("address")}
                                    setChosenSuggestion={setChosenSuggestion}
                                    setInputValue={setFormValue}
                                    id={id}
                                />
                            </div>

                            <FormDescription>
                                Näide: Tamme 5
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                < FormField
                    control={form.control}
                    name="all_img"
                    render={() => (
                        <FormItem className=''>
                            <AdvancedImageInput
                                images={images}
                                setImages={setImages}
                                baseValue={handleImages}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-[10px] items-center justify-center">
                    <SubmitButton onClick={() => { }} disabled={form.formState.isSubmitting} className="bg-accent hover:bg-accent w-[220px] rounded-full md:w-[202px] md:h-[55px] text-black cursor" type="submit">
                        <h1 className={cn(form.formState.isSubmitting ? " hidden " : "block")}>
                            {initialData ? "Salvesta muudatused" : "Kinnita"}
                        </h1>
                        <ClipLoader
                            color={"#ffffff"}
                            loading={form.formState.isSubmitting}
                            size={40}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </SubmitButton>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        if (initialData) {
                            router.push("/kuulutused")
                        } else {
                            router.push("/")
                        }
                    }} disabled={form.formState.isSubmitting} className="bg-card hover:bg-accent w-[220px] rounded-full md:w-[202px] md:h-[55px] text-black cursor">
                        <h1 className={cn(form.formState.isSubmitting ? " hidden " : "block")}>
                            Tühista
                        </h1>
                    </Button>
                </div>
            </form >
        </Form >
    )
}

