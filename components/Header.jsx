import Link from 'next/link'
import React from 'react'

const categories = [
    {
        name: "Web developement",
        slug: "web-dev"
    },
    {
        name: "Data Structures",
        slug: "data-structures"
    }
]

function Header() {
  return (
    <header className='container mx-auto py-8 px-0 flex items-center justify-between text-nowrap border-b border-gray-900'>
        <Link href="/">
            <span className='text-2xl font-bold text-neutral-300'>EL HAJJAMI JAWAD</span>
        </Link>
        <div className='text-neutral-300 w-full text-right'>
            {
                categories.map((category) => (
                    <Link className="mr-6 hover:text-purple-500 duration-500" href={category.slug}>{category.name}</Link>
                ))
            }
        </div>
        <button className='bg-white px-4 py-3 rounded-full font-semibold text-lg text-gray-800 duration-500 hover:bg-purple-500 hover:text-neutral-300'>Get in touch</button>
    </header>
  )
}

export default Header