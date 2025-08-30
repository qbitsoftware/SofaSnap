"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SubmitButton } from '@/components/submit-button'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormMessage } from '@/components/ui/form'
import { createComplaintAction } from '@/app/actions'
import { useToast } from '@/components/hooks/use-toast'

const feedbackSchema = z.object({
    message: z
        .string()
        .min(10, { message: "Sõnum peab sisaldama vähemalt 10 tähemärki" })
        .max(500, { message: "Sõnum ei tohi ületada 500 tähemärki" }),
})

type FeedBack = z.infer<typeof feedbackSchema>

export function ReportUserInput() {
    const toast = useToast()
    const form = useForm<FeedBack>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            message: "",
        },
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const onSubmit = async (message: FeedBack) => {
        setIsSubmitting(true)
        try {
            await createComplaintAction(message.message)
            toast.toast({ title: "Sõnum saadeti edukalt" })
        } catch (error) {
            toast.toast({ title: "Sõnumi saatmisel tekkis tõrge" })
            console.error(error)
        }
        form.reset()
        setIsSubmitting(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='lg:pr-[60px]'>
                <div className="flex w-full bg-background overflow-y-auto py-[18px] px-[25px] shadow-inner-heavy no-scrollbar rounded-lg mb-4">
                    <FormField
                        control={form.control}
                        name='message'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Jäta meile teade..."
                                        className="w-full h-[245px] text-base resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex justify-end gap-6 pt-10 items-center'>
                    <Button
                        onClick={() => router.push("/")}
                        disabled={isSubmitting}
                        className="bg-card hover:bg-accent w-[220px] rounded-full md:w-[202px] md:h-[55px] text-black"
                    >
                        <h1 className={isSubmitting ? "hidden" : "block"}>
                            Tühista
                        </h1>
                    </Button>
                    <SubmitButton
                        disabled={isSubmitting}
                        className="bg-accent hover:bg-accent w-[220px] rounded-full md:w-[202px] md:h-[55px] text-black"
                    >
                        <h1 className={isSubmitting ? "hidden" : "block"}>
                            {"Saada"}
                        </h1>
                        {isSubmitting && (
                            <ClipLoader
                                color={"#ffffff"}
                                loading={isSubmitting}
                                size={40}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        )}
                    </SubmitButton>
                </div>
            </form>
        </Form >
    )
}
