import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts, getSimilarPosts } from '@/services';

const PostWidget = ({categories, slug}) => {
  
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
      if(slug){
        getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result))
      }else{
        getRecentPosts().then((result) => setRelatedPosts(result))
      }
  }, [slug]);

  return (
    <div className='bg-gray-900/50 backdrop-blur-2xl p-4 rounded-lg border border-gray-800'>
      <h3 className='text-white text-xl font-semibold border-b border-white/30 pb-4 mb-4'>{slug ? 'Related Posts' : 'Latest Posts'}</h3>
      {
        relatedPosts.map((post) => (
          <div key={post.title} className='flex items-center w-full [&:not(:last-child)]:mb-4 gap-4 [&:not(:last-child)]:border-b p-4 rounded-lg hover:bg-gray-600/60 duration-300 border-white/10'>
              <Image 
                src={post.featuredImage.url}
                alt={post.title} 
                className='w-20 h-20 object-center rounded-lg object-cover'
                width={0}
                height={0}
                sizes="100vw"
              />
              <div>
                <Link href={"/post/" + post.slug}>
                    <h4 className='text-white font-light text-ellipsis line-clamp-2 text-lg mb-2'>{post.title}</h4>
                </Link>
                <span className='text-white/60 text-sm'>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
              </div>
              
          </div>
        ))
      }
    </div>
  )
}

export default PostWidget
