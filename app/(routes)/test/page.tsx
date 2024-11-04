"use client"

import Image from 'next/image'
import React from 'react'

const Page = () => {

    const images = [
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5114.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5116.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5118.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5119.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5121.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5123.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5124.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5128.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5129.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5132.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5136.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5173.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5175.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5178.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5180.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5185.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5230.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5231.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5233.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5242.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5244.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5245.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5247.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5253.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5255.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5257.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5259.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5270.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5295.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5298.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5301.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5305.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5316.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5319.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5321.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5324.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5359.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5362.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5412.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5414.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5415.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5418.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5421.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5465.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5471.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5472.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5481.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5542.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5544.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5546.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5548.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5550.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5558.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5559.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5562.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5564.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5565.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5566.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5568.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5570.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5598.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5607.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5608.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5611.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5614.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5645.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5651.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5653.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5655.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5665.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5667.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5669.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5676.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5684.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5688.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5690.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5696.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5697.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5698.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5700.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5703.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5705.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5710.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5715.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5718.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5727.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5729.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5741.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5743.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5745.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5753.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5755.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5756.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5762.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5763.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5765.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5767.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5769.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5772.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5773.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5775.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5776.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5780.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5789.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5791.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5792.JPG",
        "https://eltl-media.s3.eu-west-2.amazonaws.com/1/1/I51A5802.JPG"
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {images.map((image) =>
                <Image
                    key={image}
                    src={image}
                    alt={`tere`}
                    width={400}
                    height={300}
                    priority
                    className={`w-full h-auto object-cover transition-all duration-300`}
                />
            )}
        </div>
    )
}

export default Page