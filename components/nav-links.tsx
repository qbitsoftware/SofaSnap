"use client"

import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Category } from '@/utils/supabase/supabase.types'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/i18n-provider'

interface NavLinksProps {
  categories: Category[] | undefined
}

const NavLinks: React.FC<NavLinksProps> = ({ categories }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const moobelButtonRef = useRef<HTMLDivElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);
  const pathname = usePathname()
  const { t } = useTranslation()

  const openDialog = () => {
    setIsDialogOpen(!isDialogOpen)
    scrollTo(0, 0)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dialogRef.current && !dialogRef.current.contains(target) &&
        moobelButtonRef.current && !moobelButtonRef.current.contains(target)
      ) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDialogOpen]);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsDialogOpen(false);
      setIsLoading(false);
      setLoadingCategory(null);
    };

    const timer = setTimeout(handleRouteChangeComplete, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  const handleLinkClick = (categorySlug: string) => {
    setIsLoading(true);
    setLoadingCategory(categorySlug);
    // Fallback function just in case
    setTimeout(() => {
      setIsLoading(false);
      setLoadingCategory(null);
    }, 4000)
  }

  return (
    <div className="w-full flex lg:gap-[10px] xl:gap-[19px] items-center justify-center text-bg-foreground relative">
      <motion.div
        className='p-[10px]'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href={"/meist"}>
          <h1>{t('navbar.about_us')}</h1>
        </Link>
      </motion.div>
      <motion.div
        className='p-[10px]'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href={"/kuidas-see-tootab"}>
          <h1>{t('navbar.how_it_works')}</h1>
        </Link>
      </motion.div>
      <motion.div
        ref={moobelButtonRef}
        onClick={openDialog}
        className="flex gap-[10px] p-[10px] cursor-pointer items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1>{t('navbar.furniture')}</h1>
        <motion.div
          animate={{ rotate: isDialogOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            ref={dialogRef}
            className="fixed top-[120px] left-0 w-full h-full z-50 bg-accent-foreground flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative mt-[70px] px-[39px] pb-[143px] max-w-[937px] w-full max-h-[533px] h-full before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-[url('/images/navbar-background.png')] before:mix-blend-overlay before:content-[''] before:pointer-events-none">
              <h1 className="text-xl pt-[46px] pb-[24px]">{t('navbar.all_categories')}</h1>
              <motion.div
                className='grid grid-cols-2 gap-y-[4px] gap-x-[300px]'
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {categories && categories.map((category) => (
                  (category.sub_categories?.length != 0) &&
                  <motion.div
                    key={category.name_slug}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Link
                      onClick={() => handleLinkClick(category.name_slug)}
                      href={"/tooted/" + category.name_slug}
                      className="relative block"
                    >
                      <motion.h1
                        className='p-[10px] cursor-pointer text-lg leading-5 flex items-center'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t(`navbar.slugs.${category.name_slug}`)}
                        {isLoading && loadingCategory === category.name_slug && (
                          <motion.span
                            className="ml-2 inline-block w-1.5 h-1.5 bg-primary rounded-full"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </motion.h1>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export { NavLinks }
