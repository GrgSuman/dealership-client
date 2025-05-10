"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
    images: string[]
    alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const previousImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    if (!images || images.length === 0) {
        return (
            <div className="relative h-96 bg-gray-100">
                <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="relative h-96">
                <Image
                    src={images[currentIndex]}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {images.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={previousImage}
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Go to image ${index + 1}`}
                                aria-current={index === currentIndex ? "true" : "false"}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
} 