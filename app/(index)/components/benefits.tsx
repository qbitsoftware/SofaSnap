'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'


interface Benefit {
    text: string,
    icon: string,
    gradient: string,
}
export const Benefits = () => {
    const benefits = [
        { text: "Teeni seisma jäänud mööblilt", icon: "/images/siga.svg", gradient: "from-amber-200 to-amber-400" },
        { text: "Hoia loodust vähem ostes", icon: "/images/leht.svg", gradient: "from-green-200 to-green-400" },
        { text: "Säästa aega leides vajaliku ühelt lehelt", icon: "/images/diivan.svg", gradient: "from-blue-200 to-blue-400" },
    ]

    const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBenefitIndex((prevIndex) => (prevIndex + 1) % benefits.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [benefits.length])

    const BenefitItem = ({ benefit, index }: { benefit: Benefit, index: number }) => (
        <div
            key={index}
            className="relative flex flex-col items-center rounded-xl "
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-15 blur-xl rounded-full`}></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-[300px]">
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                    <Image src={benefit.icon} alt="Benefit icon" width={40} height={40} />
                </div>
                <p className="text-center text-lg font-medium text-gray-800 mb-2 max-w-[250px]">{benefit.text}</p>
            </div>
        </div>
    )

    return (
        <div className="relative w-full md:max-h-[500px] md:h-[100vh] xl:max-h-[800px] flex flex-col">
            <div className='hidden md:flex relative w-full h-[70%]'>
                <Image className='w-full absolute right-0' src={"/images/lamp.svg"} width={0} height={0} style={{ width: "30%" }} alt="lamp" />
            </div>
            <div className="w-full py-12 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:hidden">
                            <BenefitItem benefit={benefits[currentBenefitIndex]} index={currentBenefitIndex} />
                        </div>

                        {benefits.map((benefit, index) => (
                            <div key={index} className="hidden md:block">
                                <BenefitItem benefit={benefit} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}