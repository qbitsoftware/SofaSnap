"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createTransactionAction } from "@/app/actions"
import { ITransaction } from "@/maksekeskus/maksekeskus_types"
import { CartItemWithDetails } from "@/utils/supabase/queries/cart"
import { calculatePrice } from "@/lib/utils"
import { Dispatch } from "react"
import { SetStateAction } from "react"
import { PaymentMethods } from "@/maksekeskus/maksekeskus_types"


const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  mobileNumber: z.string().min(7, "Telo nr ei saa olla tillukesem kui 7 pelmeeni")
})

type AddressFormValues = z.infer<typeof addressSchema>


interface AddressInfoProps {
  onNext: () => void
  userData: User | null
  cart: CartItemWithDetails[]
  setPaymentOptions: Dispatch<SetStateAction<PaymentMethods | null>>;
}

export default function AddressInfo({ onNext, userData, cart, setPaymentOptions }: AddressInfoProps) {

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      mobileNumber: "",
    },
  })
  useEffect(() => {
    if (userData) {
      form.reset({
        firstName: userData.user_metadata.first_name || "",
        lastName: userData.user_metadata.last_name || "",
        email: userData.user_metadata.email || "",
        address: userData.user_metadata.address || "",
        mobileNumber: userData.user_metadata.phone || "",
      })
    }
  }, [userData, form])

  async function onSubmit() {
    //create transaction 
    const price = calculatePrice(cart)
    const transaction: ITransaction = {
      transaction: {
        amount: String(price.total),
        currency: "EUR",
      },
      customer: {
        customer_email: form.getValues("email"),
        ip: "80.235.22.144",
      },
      app_info: {
        platform: "Custom_module"
      }
    }
    try {
      const result = await createTransactionAction(transaction)
      setPaymentOptions(result.payment_methods)
    } catch (error: any) {
      console.log("Error", error)
    }
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Eesnimi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Perekonnanimi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">E-post</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Aadress</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Telefoninumber</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full py-6 bg-accent text-white">
          Edasi
        </Button>
      </form>
    </Form>
  )
}

