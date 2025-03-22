import Link from 'next/link'
import React from 'react'
import logo from '../public/images/Logo.svg';
import Image from 'next/image';

function Header({ toggleModal }) {
  return (
    <header className='container mx-auto py-3 px-4 flex items-center justify-between text-nowrap border-b border-white/20'>
        <Link href="/">
             <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>
        <button onClick={ toggleModal } className='bg-white py-3 px-6 rounded-lg font-semibold text-lg text-gray-800 duration-500 hover:bg-pink-600 hover:text-white'>Get in touch</button>
    </header>
  )
}

export default Header