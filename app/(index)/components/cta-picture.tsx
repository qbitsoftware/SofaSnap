import { Button } from "@/components/ui/button";
import Image from "next/image"


export const Cta = () => {
    return (
        <div className="relative w-full h-[500px] hidden md:flex md:h-[810px] bg-gray-200 scale-x-105">
            {/* <Image
                className="absolute scale-150"
                fill
                objectFit="contain"
                src="/images/hand-shaking-background.png"
                alt="second handshaking background"
                style={{ zIndex: 0, opacity: 0.5 }}
            /> */}
            {/* Background image */}
            <Image
                className="absolute"
                fill
                objectFit="contain"
                src="/images/Käed2.svg"
                alt="handshaking"
            />
            {/* Text in the top-left on md and above */}
            <div className="absolute top-24 left-24 p-4 hidden md:block">
                <h1 className="text-lg md:text-xl lg:text-[64px]  font-semibold text-gray-900">
                    Teeni seisma jäänud mööblilt
                </h1>
            </div>

            {/* Button in the center on md and above */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <Button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
                    Lisa oma tooted
                </Button>

            </div>
        </div>
    );
};