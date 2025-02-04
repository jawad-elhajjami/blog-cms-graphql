import React from 'react'
import Image from 'next/image'

const PostDetail = ({author}) => {
  return (
      <div className='text-center relative bg-gray-900/50 backdrop-blur-2xl rounded-lg border border-white/10 mt-20 p-12'>
          <div className='absolute left-1/2 transform -translate-x-1/2 -top-14'>
            <Image 
                src={author.photo.url} 
                alt={author.name} 
                className='h-32 rounded-full object-center w-32 object-cover border-4 border-pink-600/60'
                width={0}
                height={0}
                sizes="100vw"
              />
          </div>
          
          <div className='mt-12'>
              <h3 className='text-2xl font-semibold my-4 text-white'>{author.name}</h3>
              <p className='text-white/70'>
                {author.bio}
              </p>
          </div>
      </div>
  )
}

export default PostDetail
