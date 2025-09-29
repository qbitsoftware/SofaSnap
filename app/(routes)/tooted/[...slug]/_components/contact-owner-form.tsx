"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SubmitButton } from '@/components/submit-button'
import { ClipLoader } from 'react-spinners'
import { useToast } from '@/components/hooks/use-toast'
import { Mail } from 'lucide-react'
import { sendContactEmailAction } from '@/app/actions'

const contactSchema = z.object({
    senderEmail: z
        .string()
        .email({ message: "Palun sisestage kehtiv e-posti aadress" }),
    senderPhone: z
        .string()
        .min(7, { message: "Telefoninumber peab olema vähemalt 7 numbrit" })
        .max(15, { message: "Telefoninumber ei tohi ületada 15 numbrit" })
        .regex(/^[+]?[\d\s-()]+$/, { message: "Kehtetu telefoninumber" })
        .optional()
        .or(z.literal("")),
    message: z
        .string()
        .min(10, { message: "Sõnum peab sisaldama vähemalt 10 tähemärki" })
        .max(1000, { message: "Sõnum ei tohi ületada 1000 tähemärki" }),
})

type ContactForm = z.infer<typeof contactSchema>

interface ContactOwnerFormProps {
    productId: number
    productName: string
    ownerUserId: string
}

export const ContactOwnerForm: React.FC<ContactOwnerFormProps> = ({ 
    productId, 
    productName, 
    ownerUserId 
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()

    const form = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            senderEmail: "",
            senderPhone: "",
            message: `Tere, olen huvitatud teie kuulutusest "${productName}".`,
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
                senderPhone: data.senderPhone || ""
            })

            if (result.success) {
                toast.toast({ 
                    title: "Sõnum saadetud!", 
                    description: "Kuulutuse omanik saab teie sõnumi e-postile."
                })
                form.reset()
                setIsOpen(false)
            } else {
                toast.toast({ 
                    title: "Viga sõnumi saatmisel", 
                    description: result.error || "Proovige hiljem uuesti."
                })
            }
        } catch (error) {
            console.error('Error sending contact email:', error)
            toast.toast({ 
                title: "Viga sõnumi saatmisel", 
                description: "Tehniliste probleemide tõttu ei õnnestunud sõnumit saata."
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-6 py-3 flex items-center gap-2"
                >
                    <Mail className="h-4 w-4" />
                    Võta ühendust
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Võta ühendust kuulutuse omanikuga</DialogTitle>
                    <DialogDescription>
                        Saada sõnum kuulutuse &quot;{productName}&quot; omanikule. Sinu kontaktandmed jäävad nähtavaks sõnumis.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="senderPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefoninumber (valikuline)</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Sinu telefon"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="senderEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-posti aadress</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="email"
                                            placeholder="Sinu e-mail" 
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sõnum</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Kirjutage oma sõnum siia..."
                                            className="resize-none h-[120px]"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                                className="flex-1"
                            >
                                Tühista
                            </Button>
                            <SubmitButton
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-primary text-white hover:bg-primary/90"
                            >
                                <span className={isSubmitting ? "hidden" : "block"}>
                                    Saada sõnum
                                </span>
                                {isSubmitting && (
                                    <ClipLoader
                                        color={"#ffffff"}
                                        loading={isSubmitting}
                                        size={20}
                                        aria-label="Loading Spinner"
                                    />
                                )}
                            </SubmitButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
