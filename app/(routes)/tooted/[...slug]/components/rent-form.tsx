"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeDate, setActiveDate] = useState<'start' | 'end' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const updateTotalPrice = (from: Date, to:Date) => {
    const days = differenceInCalendarDays(to, from) + 1
    const total = days * product.price
    console.log(total)
    setTotalPrice(total)
  }

  const formatDateButton = (date: Date | undefined) => {
    return date ? format(date, "dd.MM.yyyy") : "Select date";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-[200px]">
        <div className="bg-[#ebeeeb] w-full md:w-[90%] rounded-xl mx-auto max-w-[1160px] md:flex flex-col md:flex-row">
          <div className="w-full md:w-auto">
            <Image
              src={"/images/tool2.png"}
              alt={product.name}
              width={466}
              height={500}
              objectFit="contain"
              className="my-6 mx-auto md:mx-10 rounded-lg"
            />
          </div>
          <div className="my-12 w-full md:w-auto mx-auto">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col max-w-[424px] mx-auto items-center">
                  <Popover
                    open={isOpen}
                    onOpenChange={(open) => {
                      setIsOpen(open);
                      if (!open) setActiveDate(null);
                    }}
                  >
                    <div className="flex flex-col sm:flex-row w-full">
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "border-black/25 hover:text-black hover:bg-transparent w-full sm:w-[220px] bg-transparent gap-2 text-left sm:rounded-r-none font-normal py-4 sm:py-8 flex items-start flex-col",
                              !field.value.from && "text-muted-foreground",
                              activeDate === 'start' && "ring-2 ring-primary"
                            )}
                            onClick={() => setActiveDate('start')}
                          >
                            <p>Rendi algus</p>
                            {formatDateButton(field.value.from)}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full sm:w-[180px] hover:text-black hover:bg-transparent sm:border-l-0 border-black/25 sm:rounded-l-none bg-transparent gap-2 text-left font-normal items-start py-4 sm:py-8 flex flex-col mt-2 sm:mt-0",
                              !field.value.to && "text-muted-foreground",
                              activeDate === 'end' && "ring-2 ring-primary"
                            )}
                            onClick={() => setActiveDate('end')}
                          >
                            <p>Rendi lõpp</p>
                            {formatDateButton(field.value.to)}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DateRange
                        ranges={[
                          {
                            startDate: field.value.from,
                            endDate: field.value.to,
                            key: 'selection',
                          },
                        ]}
                        onChange={(item) => {
                          if (item.selection) {
                            field.onChange({
                              from: item.selection.startDate,
                              to: item.selection.endDate,
                            });
                            updateTotalPrice(item.selection.startDate!, item.selection.endDate!)
                            if (activeDate === 'start') {
                              setActiveDate('end');
                            } else {
                              setActiveDate(null);
                              setIsOpen(false);
                            }
                          }
                        }}

                        months={isMobile ? 1 : 2}
                        direction={isMobile ? "vertical" : "horizontal"}
                        showDateDisplay={false}
                        rangeColors={["#4caf50"]}
                        minDate={new Date()}
                        focusedRange={[0, activeDate === 'start' ? 0 : 1]}
                      />
                      <div className="flex items-center justify-end gap-2 p-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            form.reset();
                            setIsOpen(false);
                            setActiveDate(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          setIsOpen(false);
                          setActiveDate(null);
                        }}>
                          Apply
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:flex mt-2 ">
              <div className="py-1 border-black/25 md:w-[220px] rounded-r-none flex items-center justify-left pl-4 border-[1px] rounded-sm">
                <p>{product.name}</p>
              </div>
              <div className="py-1 border-black/25 md:w-[180px] rounded-l-none border-l-0 flex items-center justify-left pl-4 border-[1px] rounded-sm">
                <p>{"Kogus: 1"}</p>
              </div>
            </div>
            <div className="md:mt-6 md:flex md:flex-col gap-4">
              <div className="md:flex justify-between">
                <p>{product.price}€ x {differenceInCalendarDays(form.getValues("dateRange.to"), form.getValues("dateRange.from")) + 1}</p>
                <div>{totalPrice}€</div>
              </div>
              <div className="md:flex justify-between">
                <div>SofaSnapi teenustasu</div>
                <div>{totalPrice * 0.05}€</div>
              </div> 
              <Separator className="bg-black/25"/>
              <div className="md:flex md:justify-between">
                <div>
                  Kokku
                </div>
                <div>
                  {totalPrice + totalPrice * 0.05}€
                </div>
              </div>
            </div>
            <Button type="submit" className="mt-8 w-full rounded-full bg-accent text-black">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};