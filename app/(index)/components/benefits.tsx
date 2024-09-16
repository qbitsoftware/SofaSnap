import Image from 'next/image'
import React from 'react'

export const Benefits = () => {
    return (
        <div className="relative w-full md:max-h-[500px]  h-[100vh] xl:max-h-[800px] flex flex-col">
            <div className='relative w-full h-[70%]'>
                <Image className='w-full absolute right-0' src={"/images/lamp.svg"} width={0} height={0} style={{ width: "30%" }} alt="lamp" />
            </div>
            {/* <div className='absolute w-full h-full md:top-[40%] xl:top-[30%]'>
                <div className='relative w-full h-full flex'> 
                    <Image
                        className='absolute left-0'
                        src="/images/ellipse1.svg"
                        width={100}
                        height={100}
                        style={{ width: '40%', objectFit: 'contain' }}
                        alt="lamp"
                    />
                    <Image
                        className='absolute left-[45%]'
                        src="/images/polygon.svg"
                        width={100}
                        height={100}
                        style={{ width: '33%', objectFit: 'contain' }}
                        alt="lamp"
                    />
                    <Image
                        className='absolute right-[0%]'
                        src="/images/ellipse2.svg"
                        width={100}
                        height={100}
                        style={{ width: '40%', objectFit: 'cover' }}
                        alt="lamp"
                    />
                </div>
            </div> */}
            <div className="relative w-full flex justify-around items-center px-[64px] max-w-[1440px] mx-auto">
                <div className='text-center md:flex flex-col items-center gap-4'>
                    <p>Teeni seisma jäänud<br/> mööblilt</p>
                    <Image src={"/images/siga.svg"} alt="notsu" width={50} height={50}/>
                </div>
                <div className='text-center md:flex flex-col items-center gap-4'>
                    <p>Hoia loodust vähem<br/> ostes</p>
                    <Image src={"/images/leht.svg"} alt="notsu" width={50} height={50}/>
                </div>
                <div className='text-center md:flex flex-col items-center gap-4'>
                    <p>Säästa aega leides vajaliku<br/> ühelt lehelt</p>
                    <Image src={"/images/diivan.svg"} alt="notsu" width={50} height={50}/>
                </div>
            </div>
        </div>

    )
}

