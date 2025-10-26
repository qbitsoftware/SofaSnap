"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SubmitButton } from '@/components/submit-button'
import { ClipLoader } from 'react-spinners'
import { useToast } from '@/components/hooks/use-toast'
import { Mail } from 'lucide-react'
import { sendContactEmailAction } from '@/app/actions'
import { useTranslation } from '@/lib/i18n/i18n-provider'

const createContactSchema = (t: (key: string) => string, productType: string | null) => z.object({
    senderEmail: z
        .string()
        .email({ message: t('products.detail.contact.validation.emailInvalid') }),
    senderPhone: z
        .string()
        .min(7, { message: t('products.detail.contact.validation.phoneMin') })
        .max(15, { message: t('products.detail.contact.validation.phoneMax') })
        .regex(/^[+]?[\d\s-()]+$/, { message: t('products.detail.contact.validation.phoneInvalid') })
        .optional()
        .or(z.literal("")),
    message: z
        .string()
        .min(10, { message: t('products.detail.contact.validation.messageMin') })
        .max(1000, { message: t('products.detail.contact.validation.messageMax') }),
    startDate: productType === 'rent' ? z
        .string()
        .min(1, { message: t('products.detail.contact.validation.startDateRequired') }) : z.string().optional(),
    endDate: productType === 'rent' ? z
        .string()
        .min(1, { message: t('products.detail.contact.validation.endDateRequired') }) : z.string().optional(),
})

interface ContactOwnerFormProps {
    productId: number
    productName: string
    ownerUserId: string
    productType: string | null
}

export const ContactOwnerForm: React.FC<ContactOwnerFormProps> = ({
    productId,
    productName,
    ownerUserId,
    productType,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const { t } = useTranslation()

    const contactSchema = createContactSchema(t, productType)
    type ContactForm = z.infer<typeof contactSchema>

    const form = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            senderEmail: "",
            senderPhone: "",
            message: t('products.detail.contact.defaultMessage').replace('{productName}', productName),
            startDate: "",
            endDate: "",
        },
    })

    const onSubmit = async (data: ContactForm) => {
        setIsSubmitting(true)
        try {
            const result = await sendContactEmailAction({
                ...data,
                productId,
                productName,
                ownerUserId,
                senderName: "", // Remove sender name requirement
                senderPhone: data.senderPhone || "",
                startDate: data.startDate || "",
                endDate: data.endDate || ""
            })

            if (result.success) {
                toast.toast({
                    title: t('products.detail.contact.successTitle'),
                    description: t('products.detail.contact.successDescription')
                })
                form.reset()
            } else {
                toast.toast({
                    title: t('products.detail.contact.errorTitle'),
                    description: result.error || t('products.detail.contact.errorDescription')
                })
            }
        } catch (error) {
            console.error('Error sending contact email:', error)
            toast.toast({
                title: t('products.detail.contact.errorTitle'),
                description: t('products.detail.contact.errorTechnical')
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-h-[70dvh] overflow-y-auto px-0 sm:px-1">
                    <div className='flex w-full gap-2 flex-col xl:flex-row'>
                        <FormField
                            control={form.control}
                            name="senderPhone"
                            render={({ field }) => (
                                <FormItem className="mb-1 w-full">
                                    <FormLabel className="text-xs">{t('products.detail.contact.phoneLabel')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t('products.detail.contact.phonePlaceholder')}
                                            {...field}
                                            disabled={isSubmitting}
                                            className="h-9 text-sm px-2"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="senderEmail"
                            render={({ field }) => (
                                <FormItem className="mb-1 w-full">
                                    <FormLabel className="text-xs">{t('products.detail.contact.emailLabel')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder={t('products.detail.contact.emailPlaceholder')}
                                            {...field}
                                            disabled={isSubmitting}
                                            className="h-9 text-sm px-2"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    {productType === 'rent' && (
                        <>
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="mb-1">
                                        <FormLabel className="text-xs">{t('products.detail.contact.startDateLabel')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                disabled={isSubmitting}
                                                className="h-9 text-sm px-2"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="mb-1">
                                        <FormLabel className="text-xs">{t('products.detail.contact.endDateLabel')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                disabled={isSubmitting}
                                                className="h-9 text-sm px-2"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="mb-1">
                                <FormLabel className="text-xs">{t('products.detail.contact.messageLabel')}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={t('products.detail.contact.messagePlaceholder')}
                                        className="resize-none h-[80px] text-sm px-2"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2 pt-2">
                        {/* <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isSubmitting}
                            className="flex-1 h-9 text-sm"
                        >
                            {t('products.detail.contact.cancel')}
                        </Button>
                        <SubmitButton
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 h-9 text-sm bg-primary text-white hover:bg-primary/90"
                        >
                            <span className={isSubmitting ? "hidden" : "block"}>
                                {t('products.detail.contact.send')}
                            </span>
                            {isSubmitting && (
                                <ClipLoader
                                    color={"#ffffff"}
                                    loading={isSubmitting}
                                    size={18}
                                    aria-label="Loading Spinner"
                                />
                            )}
                        </SubmitButton> */}
                        <SubmitButton
                            className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-6 py-3 flex items-center gap-2"
                            disabled={isSubmitting}
                        >
                            {t('products.detail.contact.button')}
                            {isSubmitting ? (
                                <ClipLoader
                                    color={"#ffffff"}
                                    loading={isSubmitting}
                                    size={18}
                                    aria-label="Loading Spinner"
                                />
                            ) :
                                <Mail className="h-4 w-4" />
                            }
                        </SubmitButton>
                    </div>
                </form>
            </Form>

        </>
    )
}

// Add viewport-fit and scroll support for mobile/tablet
// if (typeof window !== 'undefined') {
//     document.documentElement.style.setProperty('viewport-fit', 'cover');
// }

// // Custom styles for dialog on mobile
// if (typeof window !== 'undefined') {
//     const styleId = 'contact-dialog-content-style';
//     if (!document.getElementById(styleId)) {
//         const style = document.createElement('style');
//         style.id = styleId;
//         style.innerHTML = `
//         @media (max-width: 767px) {
//             .contact-dialog-content {
//                 top: 0 !important;
//                 margin-top: 12px !important;
//                 max-width: 80vw !important;
//                 left: 50% !important;
//                 transform: translateX(-50%) !important;
//                 border-radius: 18px !important;
//             }
//         }
//         `;
//         document.head.appendChild(style);
//     }
// }
