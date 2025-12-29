"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import Image from "next/image"

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[500px] pt-20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Featured Project Showcase <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                CrimeConnect
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NhUhEdfaOALJaLP0mt4NCC5QwyhQJD.png"
          alt="CrimeConnect FBI Intelligence Dashboard"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
