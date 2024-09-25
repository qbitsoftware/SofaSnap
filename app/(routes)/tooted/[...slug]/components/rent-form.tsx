"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format, setHours, setMinutes } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"

// Update the schema to support a date range
const FormSchema = z.object({
  dob: z.object({
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
})

export function DateForm() {
  // Initialize the form with Zod schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  // Function to adjust date time to midday to avoid timezone issues
  const setMidday = (date: Date | undefined): Date | undefined => {
    if (!date) return undefined
    return setMinutes(setHours(date, 12), 0) // Set to 12:00 noon
  }

  // Handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Range</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] pl-3 text-left font-normal",
                        !field.value?.from && "text-muted-foreground"
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          `${format(field.value.from, "PPP")} - ${format(field.value.to, "PPP")}`
                        ) : (
                          format(field.value.from, "PPP")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={(range: DateRange | undefined) => {
                      // Ensure dates have their time set to midday
                      field.onChange({
                        from: setMidday(range?.from),
                        to: setMidday(range?.to),
                      })
                    }}
                    disabled={(date) =>
                      date < new Date().setHours(0, 0, 0, 0) || date < new Date("1900-01-01")
                    }
                    initialFocus
                    numberOfMonths={2} // Shows two months for better range selection
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select a date range that covers the desired period.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
