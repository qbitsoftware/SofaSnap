"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CartItemTS, OrderItem, ProductWithAddress, User } from "@/utils/supabase/supabase.types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { formatEstonianDate, round, toUTCDate } from "@/utils/utils";
import { Calendar } from "@/components/ui/calendar"
import { RentFormSchema } from "@/lib/product-validation";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



interface DateFormProps {
  product: ProductWithAddress;
  user: User | null
  orderItems: OrderItem[]
}

export const RentForm: React.FC<DateFormProps> = ({ product, user, orderItems }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof RentFormSchema>>({
    resolver: zodResolver(RentFormSchema),
    defaultValues: {
      type: "rent",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });


  const getDateRangeString = () => {
    const { from, to } = form.getValues("dateRange")
    if (from && to) {
      return `${formatEstonianDate(from)} – ${formatEstonianDate(to)}`
    }
    return "Vali kuupäevad"
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0.0)
  const [serviceFee, setServiceFee] = useState<number>(0.0)
  const [totalWithFee, setTotalWithFee] = useState<number>(0.0)
  const [dateRange, setDateRange] = useState<number>(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateValues = useCallback((from: Date | undefined, to: Date) => {
    let days
    if (!from || !to) {
      days = 7 + 1
      setDateRange(7 + 1)
    } else {
      setDateRange(differenceInCalendarDays(to, from) + 1)
      days = differenceInCalendarDays(to, from) + 1
    }
    const total = round(days * product.price)
    const fee = round(total * 0.05)
    setServiceFee(fee)
    setTotalPrice(total)
    setTotalWithFee(fee + total)
  }, [product.price])

  useEffect(() => {
    const { from, to } = form.getValues("dateRange");
    updateValues(from, to);
  }, [form, updateValues]);

  const { addItemToCart } = useCart()
  async function onSubmit(data: z.infer<typeof RentFormSchema>) {

    const CartItem: CartItemTS = {
      product_id: product.id,
      from: toUTCDate(data.dateRange.from),
      to: toUTCDate(data.dateRange.to),
    }

    if (!user) {
      toast.error("Ostu sooritamiseks logi sisse")
      return
    }


    await addItemToCart(CartItem, user.id)
    router.refresh()
    return
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-[100px] lg:space-y-[150px] my-20">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col max-w-[424px] mx-auto my-6">
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full flex justify-center text-center font-normal bg-accent hover:bg-foreground",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {field.value.from ? (
                        field.value.to ? (
                          <div >
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </div>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span className="text-center">Vali kuupäevad</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={(value) => {
                      if (value) {
                        field.onChange(value);
                        updateValues(value.from, value.to || value.from!);
                      }
                    }}
                    disabled={orderItems.map((orderItem) => {
                      if (orderItem && orderItem.from && orderItem.to) {
                        return { from: orderItem.from, to: orderItem.to }
                      } else {
                        return []
                      }
                    })}
                  />
                </PopoverContent>
              </Popover>
              {/* <FormMessage/> */}
            </FormItem>
          )}
        />
        <div className="bg-[#ebeeeb] hidden px-6 md:px-0 w-full md:w-[90%] rounded-xl mx-auto max-w-[1160px] md:flex flex-col md:flex-row">
          <div className="hidden lg:block w-full md:w-[400px] drop-shadow-md">
            <Image
              src={product.preview_image}
              alt={product.name}
              width={466}
              height={500}
              objectFit="contain"
              className="my-6 mx-auto md:mx-10 rounded-lg"
            />
          </div>
          <div className="my-12 w-full flex flex-col md:w-auto mx-auto">
            <div className="md:flex mt-2">
              <div className="py-1 border-black/25 md:w-[220px] rounded-r-none flex items-center justify-left pl-4 border-[1px] rounded-sm">
                <p>{format(new Date(form.getValues("dateRange.from") ? form.getValues("dateRange.from") : new Date()), "dd/MM/yyyy")}</p>              </div>
              <div className="py-1 border-black/25 md:w-[180px] rounded-l-none border-l-0 flex items-center justify-left pl-4 border-[1px] rounded-sm">
                <p>{format(new Date(form.getValues("dateRange.to") ? form.getValues("dateRange.to") : addDays(new Date(), 7)), "dd/MM/yyyy")}</p>
              </div>
            </div>
            <div className="md:flex mt-2">
              <div className="py-1 border-black/25 md:w-[220px] rounded-r-none flex items-center justify-left pl-4 border-[1px] rounded-sm">
                <p>{product.name}</p>
              </div>
              <div className="py-1 border-black/25 md:w-[180px] rounded-l-none border-l-0 flex items-center justify-left pl-4 border-[1px] rounded-sm">
                <p>{"Kogus: 1"}</p>
              </div>
            </div>
            <div className="md:mt-6 md:flex md:flex-col gap-4">
              <div className="md:flex justify-between">
                <p>{product.price}€ x {dateRange}</p>
                <div>{totalPrice}€</div>
              </div>
              <div className="md:flex justify-between">
                <div>SofaSnapi teenustasu</div>
                <div>{serviceFee}€</div>
              </div>
              <Separator className="bg-black/25" />
              <div className="md:flex md:justify-between">
                <div>
                  Kokku
                </div>
                <div>
                  {totalWithFee}€
                </div>
              </div>
            </div>
            <Button type="submit" className="mt-8 w-full rounded-full bg-accent text-black">Broneeri</Button>
          </div>
        </div>
      </form>
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{product.price}€</span>
              <span className="text-sm text-gray-500">Päev</span>
            </div>
            <div>
              {getDateRangeString()}
            </div>
          </div>
          <Button
            type="submit"
            className="rounded-2xl bg-accent text-black px-6 py-6 flex items-center"
            onClick={form.handleSubmit(onSubmit)}
          >
            Broneeri
          </Button>
        </div>
      )}
    </Form>
  );
};