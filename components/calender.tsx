"use client"

import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarDays } from 'lucide-react'
import { formatDate } from '@/utils/utils'
import { cn } from '@/lib/utils'
import { DateRange } from 'react-day-picker'
import { Calendar } from "@/components/ui/calendar"

interface CalenderProps {
    disabled: string[]
    changeValueFunc: (item: DateRange | undefined) => Promise<void>
    start_date?: Date,
    end_date?: Date,
}

export const Calender: React.FC<CalenderProps> = ({ changeValueFunc, start_date, end_date }: CalenderProps) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    useEffect(() => {
        if (start_date && end_date) {
            setDateRange({ from: start_date, to: end_date })
        } else if (start_date) {
            setDateRange({ from: start_date })
        }
    }, [start_date, end_date])
    return (
        <div className="">
            <div className="">
                <Popover>
                    <PopoverTrigger asChild className='py-8 px-2'>
                        <Button
                            id="date-range"
                            variant="outline"
                            className={cn(
                                "w-full justify-center text-center font-normal rounded-2xl bg-white",
                                !dateRange?.from
                            )}
                        >
                            <CalendarDays className="mr-2 h-[26px] w-[29px] " />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                                    </>
                                ) : (
                                    formatDate(dateRange.from)
                                )
                            ) : (
                                <span className='text-muted-foreground'>Kuulutuse algus ja lopu kuupaevad</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={(item) => {
                                setDateRange(item)
                                changeValueFunc(item)
                            }}
                            disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0)
                                return date < today || date < new Date("1900-01-01");
                            }}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
