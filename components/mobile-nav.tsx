"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

const MobileNav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>

            <div>
                <Menu width={32} height={32} onClick={toggleMenu} />
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-300`}>
                <div className="p-8">
                    <button onClick={toggleMenu} className="text-black">
                        <X width={32} height={32} />
                    </button>
                    <nav className="mt-8 text-black">
                        <ul className="space-y-6 text-lg">
                            <li><Link href="/meist" onClick={toggleMenu}>Meist</Link></li>
                            <li><Link href="/kuidas-see-tootab" onClick={toggleMenu}>Kuidas see tootab?</Link></li>
                            <li><Link href="/services" onClick={toggleMenu}>Moobel</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export { MobileNav }