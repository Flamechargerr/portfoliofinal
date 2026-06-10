"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

interface Image {
    src: string
    alt?: string
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect max 7 images */
    images: Image[]
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 6.67])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 4.89])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 5.78])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 7.56])
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 8.44])

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

    return (
        <div ref={container} className="relative h-[120vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {images.map(({ src, alt }, index) => {
                    const scale = scales[index % scales.length]

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? "[&>div]:!-top-[18vh] [&>div]:!left-[3vw] [&>div]:!h-[13.5vh] [&>div]:!w-[15vw]" : ""} ${index === 2 ? "[&>div]:!-top-[6vh] [&>div]:!-left-[15vw] [&>div]:!h-[18vh] [&>div]:!w-[9vw]" : ""} ${index === 3 ? "[&>div]:!left-[16.5vw] [&>div]:!h-[11.25vh] [&>div]:!w-[11.25vw]" : ""} ${index === 4 ? "[&>div]:!top-[16.5vh] [&>div]:!left-[3vw] [&>div]:!h-[11.25vh] [&>div]:!w-[9vw]" : ""} ${index === 5 ? "[&>div]:!top-[16.5vh] [&>div]:!-left-[13.5vw] [&>div]:!h-[11.25vh] [&>div]:!w-[13.5vw]" : ""} ${index === 6 ? "[&>div]:!top-[13.5vh] [&>div]:!left-[15vw] [&>div]:!h-[7.5vh] [&>div]:!w-[7.5vw]" : ""} `}
                        >
                            <div className="relative h-[11.25vh] w-[11.25vw]">
                                <img
                                    src={src || "/placeholder.svg"}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    className="h-full w-full object-cover rounded-xl shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
