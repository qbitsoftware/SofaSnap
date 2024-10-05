"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Product } from "@/utils/supabase/supabase.types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { round } from "@/utils/utils";
import { Calendar } from "@/components/ui/calendar"

const FormSchema = z.object({
  dateRange: z.object({
    from: z.date({
      required_error: "A start date is required.",
    }),
    to: z.date({
      required_error: "An end date is required.",
    }),
  }).refine((data) => data.from <= data.to, {
    message: "End date cannot be before start date.",
    path: ["to"],
  }),
});

interface DateFormProps {
  product: Product;
}

export const DateForm: React.FC<DateFormProps> = ({ product }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateRange: {
        from:undefined,
        to: undefined,
      },
    },
  });

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

  useEffect(() => {
    const { from, to } = form.getValues("dateRange");
    updateValues(from, to);
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(data.dateRange, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  const updateValues = (from: Date, to: Date) => {
    let days
    if (!from || !to) {
      //temp
      days = 7 + 1
      setDateRange(7+1)
    } else {
      setDateRange(differenceInCalendarDays(to, from) + 1) 
      days = differenceInCalendarDays(to, from) + 1
    }
    const total = round(days * product.price)
    const fee = round(total * 0.05)
    setServiceFee(fee)
    setTotalPrice(total)
    setTotalWithFee(fee + total)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-8">
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
                        updateValues(value.from!, value.to || value.from!);
                      }
                    }}
                    numberOfMonths={isMobile ? 1 : 2}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="bg-[#ebeeeb] hidden px-6 md:px-0 w-full md:w-[90%] rounded-xl mx-auto max-w-[1160px] md:flex flex-col md:flex-row">
          <div className="hidden lg:block w-full md:w-[400px] drop-shadow-md">
            <Image
              src={"/images/tool2.png"}
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
    </Form>
  );
};