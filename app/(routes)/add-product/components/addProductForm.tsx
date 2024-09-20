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
import { CalendarIcon, Map } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Address, TAddressSearchSchema } from '@/lib/search-validation';
import { Feature } from '@/lib/coordinates-validation';
import { Suggestions } from '@/app/(auth-pages)/account/components/suggestions';
import { debounce } from 'lodash';

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
        setError,
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

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[46px]">
                <div className="mb-[27px]">
                    <h2 className="font-medium text-lg">Kategooriad</h2>
                </div>
                <div className="flex flex-col gap-[11px] leading-4 w-[424px]">
                    <Select {...register("category")}>
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
                    </div>
                    <p className="text-sm text-gray-500">
                        Mootmed: {width || '0'}x{heigth || '0'}x{length || '0'}
                    </p>
                    {/* Some random easy inputs */}
                    <Input {...register("material")} placeholder='Materjal' autoComplete='off' />
                    {errors.material && <p className="text-red-500">{errors.material.message}</p>}
                    <Input {...register("details")} placeholder='Uksikasjad' autoComplete='off' />
                    {errors.details && <p className="text-red-500">{errors.details.message}</p>}
                    {/* Date picker */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="date-range">Date Range</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date-range"
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !dateRange?.from && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                                                </>
                                            ) : (
                                                formatDate(dateRange.from)
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
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
                            <p className="text-sm text-muted-foreground">
                                Selected range: {formatDate(dateRange.from)} to {formatDate(dateRange.to)}
                            </p>
                        )}
                    </div>
                    <RadioGroup
                        value={listingType || ""}
                        onValueChange={handleListingTypeChange}
                        className="flex flex-col space-y-1 mt-2 h-full"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rent" id="rent" />
                            <Label htmlFor="rent">Rent</Label>
                            <div className="relative">
                                <Input
                                    placeholder="Rendi hind"
                                    className={`max-w-[200px] transition-opacity duration-300 ${listingType === "rent" ? "opacity-100" : "opacity-0 invisible"
                                        }`}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sell" id="sell" />
                            <Label htmlFor="sell">Sell</Label>
                            <div className="relative">
                                <Input
                                    placeholder="Myygi hind"
                                    className={`max-w-[200px] transition-opacity duration-300 ${listingType === "sell" ? "opacity-100" : "opacity-0 invisible"
                                        }`}
                                />
                            </div>
                        </div>
                    </RadioGroup>
                    <p className='flex items-center gap-1'>Aadress <span><Map /></span></p>
                    <div className="relative">
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
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button disabled={isSubmitting} className="bg-accent hover:bg-accent md:w-[202px] md:h-[55px] text-black cursor" type="submit">
                    <h1 className={cn(isSubmitting ? " hidden " : "block")}>
                        Vaheta parool
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

// "use client"

// import React, { useState, useRef } from 'react'
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Checkbox } from "@/components/ui/checkbox"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { ImagePlus, X } from 'lucide-react'

// interface ImageFile extends File {
//   preview: string;
// }

// export function MultiImageUpload() {
//   const [images, setImages] = useState<ImageFile[]>([])
//   const [primaryImage, setPrimaryImage] = useState<string | null>(null)
//   const [secondaryImages, setSecondaryImages] = useState<string[]>([])
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newImages = Array.from(e.target.files).map(file => 
//         Object.assign(file, { preview: URL.createObjectURL(file) })
//       ) as ImageFile[]
//       setImages(prev => [...prev, ...newImages])
//       if (!primaryImage && newImages.length > 0) {
//         setPrimaryImage(newImages[0].preview)
//       }
//     }
//   }

//   const handleRemoveImage = (imageToRemove: ImageFile) => {
//     setImages(images.filter(image => image !== imageToRemove))
//     if (primaryImage === imageToRemove.preview) {
//       setPrimaryImage(images.length > 1 ? images[1].preview : null)
//     }
//     setSecondaryImages(secondaryImages.filter(img => img !== imageToRemove.preview))
//     URL.revokeObjectURL(imageToRemove.preview)
//   }

//   const handlePrimaryImageChange = (value: string) => {
//     setPrimaryImage(value)
//     setSecondaryImages(secondaryImages.filter(img => img !== value))
//   }

//   const handleSecondaryImageChange = (checked: boolean, value: string) => {
//     if (checked) {
//       setSecondaryImages([...secondaryImages, value])
//     } else {
//       setSecondaryImages(secondaryImages.filter(img => img !== value))
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <Label htmlFor="image-upload" className="text-base font-semibold">Upload Images</Label>
//         <div className="mt-2">
//           <Button
//             onClick={() => fileInputRef.current?.click()}
//             variant="outline"
//             className="w-full h-32 border-dashed"
//           >
//             <ImagePlus className="mr-2 h-6 w-6" />
//             Add Images
//           </Button>
//           <input
//             type="file"
//             id="image-upload"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             multiple
//             accept="image/*"
//             className="sr-only"
//           />
//         </div>
//       </div>

//       {images.length > 0 && (
//         <ScrollArea className="h-72 w-full rounded-md border p-4">
//           <div className="space-y-4">
//             <Label className="text-base font-semibold">Select Primary Image</Label>
//             <RadioGroup value={primaryImage || ''} onValueChange={handlePrimaryImageChange}>
//               {images.map((image, index) => (
//                 <div key={image.preview} className="flex items-center space-x-2 py-2">
//                   <RadioGroupItem value={image.preview} id={`primary-${index}`} />
//                   <Label htmlFor={`primary-${index}`} className="flex items-center space-x-2">
//                     <img src={image.preview} alt={`Uploaded ${index + 1}`} className="h-12 w-12 object-cover rounded" />
//                     <span>Image {index + 1}</span>
//                   </Label>
//                   <Button variant="ghost" size="icon" onClick={() => handleRemoveImage(image)}>
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>

//           <div className="mt-6 space-y-4">
//             <Label className="text-base font-semibold">Select Secondary Images</Label>
//             {images.map((image, index) => (
//               <div key={image.preview} className="flex items-center space-x-2 py-2">
//                 <Checkbox
//                   id={`secondary-${index}`}
//                   checked={secondaryImages.includes(image.preview)}
//                   onCheckedChange={(checked) => handleSecondaryImageChange(checked as boolean, image.preview)}
//                   disabled={image.preview === primaryImage}
//                 />
//                 <Label htmlFor={`secondary-${index}`} className="flex items-center space-x-2">
//                   <img src={image.preview} alt={`Uploaded ${index + 1}`} className="h-12 w-12 object-cover rounded" />
//                   <span>Image {index + 1}</span>
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       )}

//       {images.length > 0 && (
//         <div className="space-y-2">
//           <p className="font-semibold">Summary:</p>
//           <p>Primary Image: Image {images.findIndex(img => img.preview === primaryImage) + 1}</p>
//           <p>Secondary Images: {secondaryImages.map(img => `Image ${images.findIndex(image => image.preview === img) + 1}`).join(', ')}</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default function Component() {
//   return (
//     <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Product Images</h2>
//       <MultiImageUpload />
//     </div>
//   )
// }