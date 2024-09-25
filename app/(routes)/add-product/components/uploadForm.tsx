
"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Separator } from '@/components/ui/separator'

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

function AdvancedImageInput({ insertFunc }: {
  insertFunc: (value: string[]) => Promise<void>
}) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const dragImageRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    const dragImage = dragImageRef.current
    if (dragImage) {
      dragImage.style.position = 'absolute'
      dragImage.style.top = '-9999px'
      dragImage.style.left = '-9999px'
      document.body.appendChild(dragImage)
    }
    return () => {
      if (dragImage && dragImage.parentNode) {
        dragImage.parentNode.removeChild(dragImage)
      }
    }
  }, [])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map(file => ({
        id: `${file.name}-${Date.now()}`,
        file: file,
        preview: URL.createObjectURL(file)
      }))
      setImages(prevImages => [...prevImages, ...newImages])
      let i: string[] = []
      images.map((img) => i.push(img.preview))
      console.log("i", i)
      insertFunc(i)
    }
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages(prevImages => {
      const imageToRemove = prevImages.find(img => img.id === id)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return prevImages.filter(img => img.id !== id)
    })
  }, [])

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (dragImageRef.current) {
      e.dataTransfer.setDragImage(dragImageRef.current, 0, 0)
    }
    setDraggedIndex(index)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDragPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const y = e.clientY - containerRect.top
    const index = Math.floor(y / 84) // 84 is the height of each item (64px image + 20px padding)

    if (index >= 0 && index < images.length) {
      setDragOverIndex(index)
    }
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null) {
      const newImages = [...images]
      const [draggedImage] = newImages.splice(draggedIndex, 1)
      newImages.splice(dragOverIndex, 0, draggedImage)
      setImages(newImages)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const getItemStyle = (index: number) => {
    if (draggedIndex === null) return {}

    if (index === draggedIndex) {
      return {
        opacity: 0,
      }
    }

    if (dragOverIndex === null || draggedIndex === dragOverIndex) return {}

    if (index === dragOverIndex) {
      return {
        transform: draggedIndex < dragOverIndex ? 'translateY(-100%)' : 'translateY(100%)',
        transition: 'transform 0.2s ease-in-out',
      }
    }

    if (draggedIndex < dragOverIndex && index > draggedIndex && index <= dragOverIndex) {
      return {
        transform: 'translateY(-100%)',
        transition: 'transform 0.2s ease-in-out',
      }
    }

    if (draggedIndex > dragOverIndex && index < draggedIndex && index >= dragOverIndex) {
      return {
        transform: 'translateY(100%)',
        transition: 'transform 0.2s ease-in-out',
      }
    }

    return {}
  }

  return (
    <div className="w-full">
      {/* <Label htmlFor="images">Upload Images</Label> */}
      {/* <Input
        id="images"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"

      /> */}
      <div className="relative">
        <Button
          type="button"
          onClick={handleButtonClick}
          className="p-7 w-[206px] bg-accent text-black rounded-3xl"
        >
          Lisa pildid
        </Button>
        <input
          ref={fileInputRef}
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="sr-only"
        />
      </div>
      <div ref={containerRef} className="space-y-2 relative pt-5" onDragOver={handleDragOver}>
        <p className='text-muted-foreground text-center'>Pilte saab liigutada yles ja alla</p>
        {images.map((image, index) => (
          <div
            key={image.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="flex flex-col p-2 bg-gray-100 rounded-md cursor-move transition-all duration-200 ease-in-out"
            style={getItemStyle(index)}
          >
            {index === 0 &&
              <div>
                <p className='text-center pb-1'>Kaane pilt</p>
                <Separator className='h-[2px mb-2' />
              </div>}
            <div className='flex items-center'>

              <img src={image.preview} alt={image.file.name} className="w-16 h-16 object-cover rounded mr-2" />
              <span className="flex-grow truncate">{image.file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeImage(image.id)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {draggedIndex !== null && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: 0,
              left: 0,
              transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
              zIndex: 10,
            }}
          >
            <div className="flex items-center p-2 bg-primary rounded-md">
              <img src={images[draggedIndex].preview} alt={images[draggedIndex].file.name} className="w-16 h-16 object-cover rounded mr-2" />
              <span className="flex-grow truncate text-white">{images[draggedIndex].file.name}</span>
            </div>
          </div>
        )}
      </div>
      <div ref={dragImageRef} style={{ width: '1px', height: '1px', background: 'transparent' }} />
    </div>
  )
}

export { AdvancedImageInput }