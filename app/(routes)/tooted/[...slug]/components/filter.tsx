import { cn } from '@/lib/utils'
import { AlignLeft } from 'lucide-react'
import React from 'react'

interface FilterProps {
  className?: string
}

export const Filterrrrr:React.FC<FilterProps> = ({className}) => {
  return (
    <div className={cn('lg:ml-[2%] xl:ml-[1%]', className)}>
        <AlignLeft strokeWidth={1.4} color='#000000' size={44}/>
    </div>
  )
}
