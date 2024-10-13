import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({post}) => {
    return (
    <div className='bg-gray-900/90 backdrop-blur-xl p-4 mt-8 rounded-lg border border-gray-800'>
      <img 
        src={post.featuredImage.url} 
        alt={post.title} 
        className='rounded-lg'
      />
      <div className='mt-4 flex items-center gap-4'>
        {post.categories.map((category) => <p className='text-white bg-pink-800 shadow-lg shadow-pink-800/50 w-fit py-1 px-4 rounded-full'>{category.name}</p>)}
      </div>
      <h1 className='text-white text-2xl mt-4 mb-4'>{post.title}</h1>
      <p className='text-white opacity-60 text-sm'>{post.excrept}</p>
    </div>
  )
}

export default PostCard
