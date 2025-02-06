import React from 'react'
import icon from '../public/images/newsletter_icon.png';
import Image from 'next/image';

function Newsletter() {
  return (
    <div className='mt-8 bg-white/40 p-8 w-full rounded-lg backdrop-blur-3xl relative'>
        <div>
          <h2 className='font-bold text-4xl text-white mb-4'>Recieve my latest insights</h2>
          <p className='text-white/80 w-[40%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque aliquid odit blanditiis voluptatem eos? Itaque.</p>
        </div>
        <div className='flex items-center mt-8'>
          <div className='form-group'>
            <input type="email" name='email' id="email" placeholder='Ex: john.doe@gmail.com' className='px-4 py-3 rounded-lg bg-white text-gray-900 outline-none border-2 border-pink-600 focus:border-pink-600 duration-200 mr-4'/>
          </div>
          <button className='bg-pink-600 py-3 px-6 rounded-lg font-semibold text-lg text-white duration-500 hover:bg-white hover:text-pink-600'>Subscribe</button>
        </div>
        <Image
            width={250}
            height={250}
            src={icon}
            className='absolute right-20 top-0'
        />
    </div>
  )
}

export default Newsletter