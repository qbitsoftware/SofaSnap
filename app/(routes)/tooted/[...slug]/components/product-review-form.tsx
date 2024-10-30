"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Review, reviewFormSchema } from "@/lib/product-validation"
import { useEffect } from "react"
import { addReview } from "@/utils/supabase/queries/products"
import { addReviewAction } from "@/app/actions"


interface ReviewFormProps {
    product_id: number
}

export default function ReviewForm({ product_id }: ReviewFormProps) {
    const form = useForm<Review>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            product_id: product_id,
            user_id: "",
            description: "",
        },
    })

    useEffect(() => {
        form.setValue("product_id", product_id)
    }, [product_id])

    async function onSubmit(values: Review) {
        console.log("values", values)
        try {
            const result = await addReviewAction(values)
            console.log("Result", result)
        } catch (error) {
            console.log("Big error", error)
        }
    }

    return (
        <div className="flex justify-center md:min-h-[300px] mt-24 w-full max-w-[1000px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-x-1 items-center justify-center"
                                    >
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <FormItem key={rating}>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={rating.toString()}
                                                        id={`rating-${rating}`}
                                                        className="peer sr-only"
                                                    />
                                                </FormControl>
                                                <FormLabel
                                                    htmlFor={`rating-${rating}`}
                                                    className="cursor-pointer"
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${parseInt(field.value) >= rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                            } peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white peer-focus-visible:ring-black rounded-sm`}
                                                    />
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
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
                                <FormLabel>Hinnang</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your review here..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Sinu aus arvamus tootest
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={form.formState.isLoading} className="w-full bg-accent rounded-full text-slate-800">{form.formState.isLoading ? "Laadin" : "Lisa"}</Button>
                </form>
            </Form>
        </div>
    )
}