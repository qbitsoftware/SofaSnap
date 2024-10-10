import { Button } from "@/components/ui/button";
import { MontserratAlternates } from "@/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";


export const Cta = () => {
    return (
        <div className="relative w-full aspect-[1440/810] hidden md:flex bg-gray-200 scale-x-105">
            <Image
                className="absolute scale-100"
                fill
                objectFit="contain"
                src="/images/hand-shaking-background2.png"
                alt="second handshaking background"
            />
            {/* Background image */}
            <Image
                className="absolute aspect-[1440/527] w-full top-[-20px]"
                width={0}
                height={0}
                src="/images/Käed3.svg"
                alt="handshaking"
            />
             <Image
                className="absolute aspect-[659/330] left-1/2 translate-x-[-50%] w-[55%] bottom-[-7.8%]"
                width={0}
                height={0}
                src="/images/diivan3.svg"
                alt="diivan"
            />
            {/* Text in the top-left on md and above */}
            <div className="absolute top-24 left-24 p-4 hidden md:block">
                <h1 className={cn("text-lg md:text-4xl lg:text-7xl font-semibold text-gray-900 flex flex-col", MontserratAlternates.className)}>      
                        Teeni seisma<br></br> jäänud mööblilt
                </h1>
            </div>

            {/* Button in the center on md and above */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <Link href={"/lisa-toode"} >
                    <Button className="bg-accent rounded-2xl text-black px-6 py-6 transition">
                        Lisa oma tooted
                    </Button>
                </Link>
            </div>
        </div>
    );
};