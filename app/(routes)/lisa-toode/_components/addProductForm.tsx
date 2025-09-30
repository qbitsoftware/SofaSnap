"use client"
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { useToast } from '@/components/hooks/use-toast';
import { IImage, productSchema, productSchemaServer, TProductServer } from '@/lib/product-validation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Map } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { capitalize } from 'lodash';
import { AdvancedImageInput } from './uploadForm';
import { AddressTS, Category } from '@/utils/supabase/supabase.types';
import { SubmitButton } from '@/components/submit-button';
import { Calender } from '@/components/calender';
import { createProductAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TSignUpSchema } from '@/lib/register-validation';
import { Listing } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

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
    void address
    // const [suggestions, setSuggestions] = useState<Address[]>([]);
    // const [chosenSuggestion, setChosenSuggestion] = useState<Feature>();
    // const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    // const [isLoading, setIsLoading] = useState<boolean>(false)
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
        const initialCategory = form.getValues("category");

        const selectedCategory = categories.find(c => c.name_slug.toLowerCase() === initialCategory.replaceAll("ö", "o").replaceAll("ä", "a").replaceAll("ü", "u").replaceAll("õ", "o").replaceAll("ž", "z"));
        setSubCategories(selectedCategory ? selectedCategory.sub_categories : []);

        const subscription = form.watch((values) => {
            const categoryValue = values.category;
            const selectedCategory = categories.find(c => c.name_slug.toLowerCase() === categoryValue?.replaceAll("ö", "o").replaceAll("ä", "a").replaceAll("ü", "u").replaceAll("õ", "o").replaceAll("ž", "z").trim());
            setSubCategories(selectedCategory ? selectedCategory.sub_categories : []);
        });

        return () => subscription.unsubscribe();
    }, [form, categories]);

    useEffect(() => {
        //set images
        if (initialData && initialData.all_img) {
            const imagesToAdd: IImage[] = []
            initialData.all_img.map((url) => {
                // cut from the right place uuid have 4 (-) inside them so cut from fifth
                const fileName = url.slice(url.lastIndexOf('/') + 1);
                const parts = fileName.split('-');
                const secondPart = parts.slice(5).join('-');
                imagesToAdd.push({ name: secondPart, preview: url, id: Math.random().toString(36).substr(2, 9), file: undefined })
            })
            setImages(imagesToAdd)
        }
            }, [form, initialData]);

    const onSubmit = async (data: Listing) => {
        const formData: TProductServer = {
            ...data,
            start_date: data.start_date instanceof Date ? data.start_date.toISOString() : "",
            end_date: data.end_date instanceof Date ? data.end_date.toISOString() : "",
        };
        //validate with server stuff first
        const validationResult = productSchemaServer.safeParse(formData);
        if (validationResult.error) {
            toast.toast({
                title: "Sisend on vigane!",
            })
            return
        }

        if (user_metadata.agreement == undefined || !user_metadata.agreement) {
            toast.toast({
                title: "Kuulutuse lisamiseks peate nõustuma meie teenuse tingimustega!",
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

        const filterRemovedItems = (initialData: Listing, data: Listing, option: boolean) => {
            return initialData.all_img.filter(item => {
                const fileName = item.slice(item.lastIndexOf('/') + 1);

                const parts = fileName.split('-');
                const secondPart = parts.slice(5).join('-');
                if (option) {
                    return !data.all_img.includes(secondPart);
                } else {
                    return data.all_img.includes(secondPart)
                }
            });
        };
        const imgData = new FormData();
        if (initialData) {
            // const removedItems = initialData.all_img.filter(item => !data.all_img.includes(item.slice(item.lastIndexOf('/') + 1)));
            const removedItems = filterRemovedItems(initialData, data, true)
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

        const uploadData = await uploadResp.json();

        if (!uploadResp.ok) {
            toast.toast({
                title: "Pildi üleslaadimine ebaõnnestus. Proovige hiljem uuesti",
            })
            return;
        }
        //update all_img with correct img data
        formData.all_img = uploadData.data
        if (initialData) {

            const changed_images = filterRemovedItems(initialData, data, false)
            formData.all_img.push(...changed_images)
            // return
        }

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
            if (initialData) {
                toast.toast({
                    title: "Kuulutuse muutmine oli edukas.",
                    description: (
                        <>
                            Kuulutusi saab hallata{' '}
                            <Link href="/kuulutused" className="underline font-medium">
                                siit
                            </Link>
                            .
                        </>
                    ),
                })
            } else {
                toast.toast({
                    title: "Kuulutus on edukalt lisatud.",
                    description: (
                        <>
                            Kuulutusi saab hallata{' '}
                            <Link href="/kuulutused" className="underline font-medium">
                                siit
                            </Link>
                            .
                        </>
                    ),
                })
            }
        }
        if (!initialData) {
            form.reset()
            setImages([])
            form.setValue("unique_id", crypto.randomUUID())
        }
    }

    const handleDates = async (item: DateRange | undefined) => {
        form.setValue("start_date", item?.from);
        form.setValue("end_date", item?.to);
        await form.trigger(["start_date", "end_date"]);
    };

    const handleImages = async (value: string[]) => {
        form.setValue("all_img", value)
        await form.trigger("all_img")
    }

    const handleInputChangeSize = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: number | '') => void, fieldName: string) => {
        let value = e.target.value.trim()
        //only allow 0-9 numbers
        if (/[^0-9]/.test(value)) {
            return
        }
        if (/^0+$/.test(value)) {
            value = "0"
        } else {
            value = value.replace(/^0+/, "")
        }
        const score = value === '' ? 0 : Number(value)
        form.setValue(fieldName as "width" | "heigth" | "length" | "price", score)
        onChange(score)
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
                                            (category.sub_categories?.length != 0) &&
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
                                        {subCategories?.map((sub_c, i) => (
                                            <SelectItem className='bg-white' key={i} value={sub_c}>
                                                {capitalize(sub_c)}
                                            </SelectItem>
                                        ))}
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
                                        <Input type="text" inputMode='numeric' pattern='[0-9]*' {...field} onChange={e => handleInputChangeSize(e, field.onChange, "width")} />
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
                                        <Input type="text" inputMode='numeric' pattern='[0-9]*' {...field} onChange={e => handleInputChangeSize(e, field.onChange, "heigth")} />
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
                                        <Input type="text" inputMode='numeric' pattern='[0-9]*' {...field} onChange={e => handleInputChangeSize(e, field.onChange, "length")} />
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
                                <Textarea
                                    placeholder='Kirjeldus'
                                    autoComplete='off'
                                    {...field}
                                    className='resize-none h-[150px]'
                                />
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
                                                    <FormItem className='flex gap-2'>
                                                        <FormControl className='bg-white text-center w-[150px]'>
                                                            <Input type="text" inputMode='numeric' pattern='[0-9]*' {...field} onChange={e => handleInputChangeSize(e, field.onChange, "price")} />
                                                        </FormControl>
                                                        <div className='flex flex-row'>
                                                            € / Päev
                                                        </div>
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
                                                    <FormItem className='flex gap-2'>
                                                        <FormControl className='bg-white text-center w-[150px]'>
                                                            <Input type="text" inputMode='numeric' pattern='[0-9]*' {...field} onChange={e => handleInputChangeSize(e, field.onChange, "price")} />
                                                        </FormControl>
                                                        <div className='flex flex-row'>
                                                            €
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                    </FormItem>
                                    {form.formState.errors.price?.message &&
                                        <p className="text-sm font-medium text-destructive">{form.formState.errors.price.message}</p>
                                    }
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
                            <Input placeholder='Aadress' {...field} autoComplete='off' onChange={(e) => {
                                field.onChange(e.target.value);
                            }} />
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

