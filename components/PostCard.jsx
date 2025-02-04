import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { getPostDetails } from '@/services'

const PostCard = ({post}) => {
    return (
    
    <div className='bg-gray-900/60 backdrop-blur-2xl rounded-lg overflow-hidden border border-white/10 col-span-4 flex flex-col duration-500 lg:hover:scale-105'>
      <Image 
        src={post.featuredImage.url} 
        alt={post.title} 
        className='h-64 object-center w-full object-cover'
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className='p-8 flex flex-col justify-between h-full'>
        <div className='flex items-center gap-4'>
          {post.categories.map((category) => <p className='text-white bg-gray-700/80 border border-white/10 shadow-lg text-sm hover:shadow-blue-600/50 duration-300 w-fit px-4 rounded-full'>{category.name}</p>)}
        </div>

        <div>
          <h1 className='text-white text-2xl mt-4 mb-4'>{post.title}</h1>
          <p className='text-white opacity-60 text-sm text-ellipsis line-clamp-3'>{post.excrept}</p>
          <Link href={`/post/` + post.slug} className='text-blue-500 font-medium border-b border-blue-500 duration-300 hover:text-blue-700 hover:border-blue-700'>Continue reading</Link>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex mt-6 items-center gap-4'>
            <img src={post.author.photo.url} alt={post.author.name} className='w-12 h-12 object-cover rounded-full select-none' />
            <div>
              <p className='text-white/60'>Written by:</p>
              <h3 className='text-white'>{post.author.name}</h3>
            </div>
          </div>
          <span className='text-white/60'>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
        

      </div>
    </div>
  )
}

export default PostCard