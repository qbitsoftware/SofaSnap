import Image from "next/image"


export const Cta = () => {
    return (
        <div className="relative md:w-full md:h-[810px] bg-gray-200">
           <Image className="absolute" fill objectFit="contain" src="/images/Käed2.svg" alt="handshaking"/> 
        </div>
    )
}