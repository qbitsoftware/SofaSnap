'use client'
import { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { XIcon } from 'lucide-react'
import { IImage } from '@/lib/product-validation'
import Image from 'next/image'

function AdvancedImageInput({ images, setImages, baseValue }: { images: IImage[], setImages: React.Dispatch<React.SetStateAction<IImage[]>>, baseValue: (value: string[]) => Promise<void> }) {
    const [draggedItem, setDraggedItem] = useState<IImage | null>(null)
    const [dragOverItem, setDragOverItem] = useState<IImage | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const allowedFileTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];
        const maxFileSizeMB = 10;
        const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

        if (event.target.files) {
            const validImages = Array.from(event.target.files).filter((file) => {
                const isValidType = allowedFileTypes.includes(file.type);
                const isValidSize = file.size <= maxFileSizeBytes;

                if (!isValidType) {
                    alert(`${file.name} ei voimalda sellist failityypi. Ainult JPG, JPEG, SVG voi PNG`);
                }

                if (!isValidSize) {
                    alert(`${file.name} on liiga suur! Maksimaalne failisuurus on 10MB`);
                }

                return isValidType && isValidSize;
            });

            if (validImages.length > 0) {
                const newImages = validImages.map((file) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    preview: URL.createObjectURL(file),
                    file,
                }));

                setImages((prevImages) => {
                    const updated = [...prevImages, ...newImages]
                    const lenImages = updated.length
                    const baseValueInput: string[] = []
                    for (let i = 0; i < lenImages; i++) {
                        baseValueInput.push(String(i))
                    }
                    baseValue(baseValueInput)
                    return updated
                });
            }
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const removeImage = (id: string) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter(img => img.id !== id)
            const lenImages = updatedImages.length
            const baseValueInput: string[] = []
            for (let i = 0; i < lenImages; i++) {
                baseValueInput.push(String(i))
            }
            baseValue(baseValueInput)
            return updatedImages
        });
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: IImage) => {
        setDraggedItem(item)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', item.id)

        const dragPreview = document.createElement('div')
        dragPreview.style.width = '100px'
        dragPreview.style.height = '100px'
        dragPreview.style.backgroundImage = `url(${item.preview})`
        dragPreview.style.backgroundSize = 'cover'
        dragPreview.style.backgroundPosition = 'center'
        dragPreview.style.border = '2px solid white'
        dragPreview.style.borderRadius = '8px'
        dragPreview.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
        document.body.appendChild(dragPreview)
        e.dataTransfer.setDragImage(dragPreview, 50, 50)
        setTimeout(() => document.body.removeChild(dragPreview), 0)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: IImage) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setDragOverItem(item)
    }

    const handleDragLeave = () => {
        setDragOverItem(null)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: IImage) => {
        e.preventDefault()
        if (!draggedItem) return

        const newImages = [...images]
        const draggedIndex = newImages.findIndex(img => img.id === draggedItem.id)
        const targetIndex = newImages.findIndex(img => img.id === targetItem.id)

        newImages.splice(draggedIndex, 1)
        newImages.splice(targetIndex, 0, draggedItem)

        setImages(newImages)
        const lenImages = newImages.length
        const baseValueInput: string[] = []
        for (let i = 0; i < lenImages; i++) {
            baseValueInput.push(String(i))
        }
        baseValue(baseValueInput)

        setDraggedItem(null)
        setDragOverItem(null)
    }

    const handleDragEnd = () => {
        setDraggedItem(null)
        setDragOverItem(null)
    }

return (
    <div className="flex flex-col justify-center items-center w-full max-w-[300px] mx-auto p-4">
      <div>
        <Button
          type="button"
          onClick={handleButtonClick}
          className="p-4 md:p-7 w-[150px] md:w-[206px] bg-accent text-black rounded-3xl"
        >
          Lisa pildid
        </Button>
        <Input
          id="images"
          type="file"
          accept=".jpg,.jpeg,.png,.svg"
          multiple
          onChange={handleFileChange}
          className="sr-only w-1"
          ref={fileInputRef}
        />
      </div>

      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 pt-[20px]">
        {images.map((image, key) => (
          <div
            key={image.id}
            className={`relative group transition-transform duration-200 ease-in-out ${
              dragOverItem && dragOverItem.id === image.id ? 'scale-105' : ''
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onDragOver={(e) => handleDragOver(e, image)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, image)}
            onDragEnd={handleDragEnd}
          >
            <div className='w-full aspect-square h-[140px] md:h-[130px] lg:h-[140px]'>
              <Image
                src={image.preview}
                alt={`Preview ${image.id}`}
                className="object-cover rounded-md"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between">
              <div className='flex justify-end w-full mt-2 pr-2'>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => removeImage(image.id)}
                >
                  <XIcon className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex justify-center h-full">
                <div className="text-4xl text-white">
                  {key + 1}
                </div>
              </div>
            </div>
            {dragOverItem && dragOverItem.id === image.id && (
              <div className="absolute inset-0 border-2 border-primary rounded-md pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { AdvancedImageInput }