import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    const user = false;
    return (
        <div className="h-12 text-pink-500 px-6 flex items-center justify-between border-b-2 border-b-pink-500 uppercase md:h-16 lg:px-20 xl:px-40 fixed top-0 left-0 w-full bg-black z-50">
            {/* left links */}
            <div className="hidden md:flex gap-4 flex-1">
                <Link href="/rose">Rose</Link>
                <Link href="/">Propose</Link>
                <Link href="/">Chocolate</Link>
                <Link href="/">Teddy</Link>
            </div>
            {/* logo */}
            <div className='text-xl md:font-bold flex-1 md:text-center text-white'>
                <Link href="/">Massimo ❤️</Link>
            </div>
            {/* Mobile View */}
            <div className="md:hidden"></div>
            {/* right links */}
            <div className="hidden md:flex gap-4 justify-end flex-1">
                <Link href="/">Promise</Link>
                <Link href="/">Hug</Link>
                <Link href="/">Kiss</Link>
                <Link href="/">Valentine</Link>
            </div>
        </div>
    );
};

export default Navbar;