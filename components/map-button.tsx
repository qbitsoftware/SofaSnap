import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/utils/cn'
import { Map } from 'lucide-react'

interface MapButtonProps {
  className: string
}

export const MapButton:React.FC<MapButtonProps> = ({className}) => {
  return (
    <Button className={cn('md:w-[190px] md:h-[60px] flex rounded-full bg-secondary', className)}>
          Kuva Kaardil <span ><Map /></span>
    </Button>
  )
}
// md:mr-16 lg:mr-[4%] 2xl:mr-0 gap-4