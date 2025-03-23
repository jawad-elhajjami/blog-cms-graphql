import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentPosts, getSimilarPosts } from '@/services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug, categories]);

  return (
    <div className='bg-gray-900/50 backdrop-blur-2xl p-4 rounded-lg border border-gray-800 mb-8 mt-8'>
      <h3 className='text-white text-xl font-semibold border-b border-white/30 pb-4 mb-4'>
        {slug ? 'Related Posts' : 'Latest Posts'}
      </h3>

      {/* Check if there are no posts */}
      {relatedPosts.length === 0 ? (
        <div className='flex flex-col items-center'>
          <svg width="100pt" className='invert opacity-70' height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m18 58.195 15.078-15.445c0.58984-0.60547 1.3984-0.94531 2.2422-0.94531h29.359c0.84375 0 1.6523 0.33984 2.2422 0.94531l15.078 15.445v15.785c0 2.7734-2.2461 5.0195-5.0195 5.0195h-53.961c-2.7734 0-5.0195-2.2461-5.0195-5.0195zm4.707-1.2617 12.234-12.609h30.117l12.234 12.609h-15.684v2.5508c0 3.1172-2.5312 5.6445-5.6484 5.6445h-11.922c-3.1172 0-5.6484-2.5273-5.6484-5.6445v-2.5508zm-2.207 2.5664h15.5c0 4.3633 3.5352 7.8984 7.8984 7.8984h12.203c4.3633 0 7.8984-3.5352 7.8984-7.8984h15.5v14c0 1.6562-1.3438 3-3 3h-53c-1.6562 0-3-1.3438-3-3zm30.754-24c0 0.69531-0.5625 1.2617-1.2539 1.2617s-1.2539-0.56641-1.2539-1.2617v-13.238c0-0.69531 0.5625-1.2617 1.2539-1.2617s1.2539 0.56641 1.2539 1.2617zm8.1172 1.1367c-0.17969 0.67188-0.87109 1.0703-1.5391 0.89062-0.66797-0.17969-1.0664-0.87109-0.88672-1.543l3.4102-12.789c0.17969-0.67187 0.86719-1.0703 1.5352-0.89062 0.67188 0.17969 1.0703 0.87109 0.89062 1.543zm-16.043-0.65234c0.17969 0.67188-0.21875 1.3633-0.88672 1.543-0.66797 0.17969-1.3594-0.21875-1.5352-0.89062l-3.4141-12.789c-0.17578-0.67188 0.21875-1.3633 0.89062-1.543 0.66797-0.17969 1.3555 0.21875 1.5352 0.89062z" fillRule="evenodd"/>
            </svg>
          <p className="text-white opacity-70">No related posts !</p>
        </div>
      ) : (
        relatedPosts.map((post) => (
          <Link href={'/post/' + post.slug} key={post.title}>
            <div className='flex items-center w-full [&:not(:last-child)]:mb-4 gap-4 [&:not(:last-child)]:border-b p-4 rounded-lg hover:bg-gray-600/60 duration-300 border-white/10'>
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                className='w-20 h-20 object-center rounded-lg object-cover'
                width={0}
                height={0}
                sizes='100vw'
              />
              <div>
                <h4 className='text-white font-light text-ellipsis line-clamp-2 text-lg mb-2'>
                  {post.title}
                </h4>
                <span className='text-white/60 text-sm'>
                  {moment(post.createdAt).format('MMM DD, YYYY')}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default PostWidget;
