"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PaymentMethods } from '@/maksekeskus/maksekeskus_types';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function PaymentSelection({ onNext, onPrev, payment_options }: { onNext: () => void; onPrev: () => void; payment_options: PaymentMethods | null }) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  console.log(selectedMethod)

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("selected", selectedMethod)
    if (selectedMethod) {
      router.push(selectedMethod)
    }
  }

  if (payment_options === null) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 border p-4 rounded-md">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  const allMethods = [
    ...payment_options.cards,
    ...payment_options.banklinks,
    // ...payment_options.other,
    // ...payment_options.payLater
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        value={selectedMethod || ''}
        onValueChange={setSelectedMethod}
        className="space-y-4"
      >
        {allMethods.map((method) => (
          <div
            key={method.name}
            className={cn("relative flex flex-col md:flex-row items-center space-x-3 border p-4 rounded-md hover:border-accent-foreground transition-colors cursor-pointer", selectedMethod == method.url ? "bg-accent-foreground" : "")}>
            <RadioGroupItem
              value={method.url}
              id={method.name}
              className="sr-only peer"
            />
            <Label
              htmlFor={method.name}
              className="flex flex-col md:flex-row items-center space-x-2 text-base font-medium cursor-pointer w-full h-full absolute inset-0"
            >
              <span className="sr-only">{method.display_name || method.name}</span>
            </Label>
            <div className="flex flex-col md:flex-row items-center space-x-2 z-10 pointer-events-none">
              {method.logo_url && (
                <Image
                  src={method.logo_url}
                  alt={method.display_name || method.name}
                  width={150}
                  height={24}
                />
              )}
              <span>{method.display_name || method.name}</span>
            </div>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between gap-4">
        <Button type="button" variant="secondary" onClick={onPrev} className="w-full py-6 text-white">
          Tagasi
        </Button>
        <Button
          type="submit"
          className="w-full py-6 bg-accent text-white"
          disabled={!selectedMethod}
        >
          Järgmine
        </Button>
      </div>
    </form>
  )
}

