import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/utils/cn'
import { Map } from 'lucide-react'
import Link from 'next/link'

interface MapButtonProps {
  className?: string
}

export const MapButton:React.FC<MapButtonProps> = ({className}) => {
  return (
    <Link className={cn("",className)} href="/kaart">
      <Button className={cn('md:w-[190px] md:h-[60px] flex rounded-full bg-secondary', className)}>
            Kuva Kaardil <span className='px-2'><Map /></span>
      </Button>
    </Link>
  )
}