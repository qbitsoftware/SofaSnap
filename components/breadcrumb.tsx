import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface props {
    text: string
    link: string
}

export const Breadcrumb = ({ text, link }: props) => {
    return (
        <div className='flex max-w-[1440px] w-full items-center'>
            <div className='flex pr-[20px] sm:pr-[40px] md:pr-[45px] lg:pr-[85px] items-center'>
                <Link className="cursor-pointer w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]" href={link}>
                    <ChevronLeft strokeWidth={1} className="w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]" />
                </Link>

            </div>
            <div>
                <h2 className='font-medium text-[24px] sm:text-[36px] md:text-[44px]'>{text}</h2>
            </div>
        </div>
    )
}
