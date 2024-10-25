"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { capitalize } from '@/utils/utils';
import { usePathname } from 'next/navigation';

interface Category {
    name: string;
    name_slug: string;
    sub_categories: string[];
}

interface NavLinksProps {
    categories: Category[] | undefined;
}

function MobileNav({ categories }: NavLinksProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const pathname = usePathname()

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setShowCategories(false);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    useEffect(() => {
        const handleRouteChangeComplete = () => {
            setShowCategories(false);
            setMenuOpen(false)
            setIsLoading(false);
        };


        const timer = setTimeout(handleRouteChangeComplete, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [pathname]);

    const handleLinkClick = () => {
        setIsLoading(true);
        //Just a fallback function justincase
        setTimeout(() => {
            setIsLoading(false)
        }, 4000)
    }

    const menuVariants = {
        closed: { x: "-100%", opacity: 0 },
        open: { x: 0, opacity: 1 },
    };

    const itemVariants = {
        closed: { x: -20, opacity: 0 },
        open: { x: 0, opacity: 1 },
    };

    const closeButtonVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0, transition: { delay: 0.2, type: "spring", stiffness: 260, damping: 20 } },
        exit: { scale: 0, rotate: 180 },
    };

    const loadingVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    };

    return (
        <div>
            <motion.button
                onClick={toggleMenu}
                className="text-black"
                whileTap={{ scale: 0.95 }}
            >
                <Menu width={32} height={32} />
            </motion.button>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-0 left-0 w-full h-full bg-white z-50"
                    >
                        <div className="p-8">
                            <motion.button
                                onClick={toggleMenu}
                                className="text-black"
                                variants={closeButtonVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <X width={32} height={32} />
                            </motion.button>
                            <nav className="mt-8 text-black">
                                <motion.ul
                                    className="space-y-6 text-lg"
                                    variants={{
                                        open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                                        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                                    }}
                                >
                                    <motion.li variants={itemVariants}>
                                        <Link href="/meist" onClick={toggleMenu}>Meist</Link>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        <Link href="/kuidas-see-tootab" onClick={toggleMenu}>Kuidas see töötab?</Link>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        <div onClick={toggleCategories} className="text-black flex gap-[75px] items-center w-full cursor-pointer">
                                            <div>
                                                Mööbel
                                            </div>
                                            <ChevronRight />
                                        </div>
                                    </motion.li>
                                </motion.ul>
                            </nav>
                        </div>
                        <AnimatePresence>
                            {showCategories && (
                                <motion.div
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-0 top-0 w-full h-full bg-white z-40 p-8"
                                >
                                    <motion.button
                                        onClick={toggleCategories}
                                        className="text-black mb-6 flex items-center"
                                        whileHover={{ x: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ChevronLeft width={24} height={24} />
                                        <span className="ml-2">Tagasi</span>
                                    </motion.button>
                                    <motion.ul
                                        className="space-y-4"
                                        variants={{
                                            open: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                                            closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                                        }}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        {categories?.map((category) => (
                                            (category.sub_categories.length != 0) &&
                                            <motion.li
                                                key={category.name_slug}
                                                variants={itemVariants}
                                            >
                                                <Link
                                                    href={`/tooted/${category.name_slug}`}
                                                    onClick={handleLinkClick}
                                                    className="text-black text-lg flex items-center justify-between"
                                                >
                                                    {capitalize(category.name)}
                                                    {isLoading && (
                                                        <motion.div
                                                            variants={loadingVariants}
                                                            initial="initial"
                                                            animate="animate"
                                                            exit="exit"
                                                        >
                                                            <Loader className="animate-spin" size={20} />
                                                        </motion.div>
                                                    )}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="text-4xl text-primary"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader size={48} />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

export { MobileNav }