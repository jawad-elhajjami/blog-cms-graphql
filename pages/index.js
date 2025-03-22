import Head from 'next/head'
import { PostCard, PostWidget, Categories, Newsletter, Modal } from '@/components';
import { FeaturedPosts } from '../sections/index';
import { getPosts } from '@/services'

export default function Home({posts}) {
  
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Personal Blog</title>
      </Head>
      <FeaturedPosts />
      <Newsletter />
      <main className='grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8'>
        <div className='lg:col-span-8 col-span-1 mb-8'>
          <div className='grid lg:grid-cols-8 gap-4'>
            {posts.map((post) => <PostCard post={post.node} key={post.title} />)}
          </div>
        </div>
        <div className='lg:col-span-4 col-span-1'>
            <div className='lg:sticky relative top-0'>
                <PostWidget />
                <Categories />
            </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(){
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }

}