import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 mt-8 mb-8 min-h-[100vh]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="grid lg:grid-cols-8 gap-4 col-span-8">
          {/* Check if there are no posts */}
          {posts.length === 0 ? (
            <div className='flex flex-col items-center w-full col-span-8'>
              <svg width="100pt" className='invert opacity-70' height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="m18 58.195 15.078-15.445c0.58984-0.60547 1.3984-0.94531 2.2422-0.94531h29.359c0.84375 0 1.6523 0.33984 2.2422 0.94531l15.078 15.445v15.785c0 2.7734-2.2461 5.0195-5.0195 5.0195h-53.961c-2.7734 0-5.0195-2.2461-5.0195-5.0195zm4.707-1.2617 12.234-12.609h30.117l12.234 12.609h-15.684v2.5508c0 3.1172-2.5312 5.6445-5.6484 5.6445h-11.922c-3.1172 0-5.6484-2.5273-5.6484-5.6445v-2.5508zm-2.207 2.5664h15.5c0 4.3633 3.5352 7.8984 7.8984 7.8984h12.203c4.3633 0 7.8984-3.5352 7.8984-7.8984h15.5v14c0 1.6562-1.3438 3-3 3h-53c-1.6562 0-3-1.3438-3-3zm30.754-24c0 0.69531-0.5625 1.2617-1.2539 1.2617s-1.2539-0.56641-1.2539-1.2617v-13.238c0-0.69531 0.5625-1.2617 1.2539-1.2617s1.2539 0.56641 1.2539 1.2617zm8.1172 1.1367c-0.17969 0.67188-0.87109 1.0703-1.5391 0.89062-0.66797-0.17969-1.0664-0.87109-0.88672-1.543l3.4102-12.789c0.17969-0.67187 0.86719-1.0703 1.5352-0.89062 0.67188 0.17969 1.0703 0.87109 0.89062 1.543zm-16.043-0.65234c0.17969 0.67188-0.21875 1.3633-0.88672 1.543-0.66797 0.17969-1.3594-0.21875-1.5352-0.89062l-3.4141-12.789c-0.17578-0.67188 0.21875-1.3633 0.89062-1.543 0.66797-0.17969 1.3555 0.21875 1.5352 0.89062z" fillRule="evenodd"/>
                </svg>
              <h2 className='text-white flex text-2xl font-bold text-center leading-10'>No posts available in this category. Please check back later!</h2>
            </div>
          ) : (
            posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))
          )}
        </div>
        <div className="lg:col-span-4 col-span-8 w-full">
          <div className="relative lg:sticky lg:top-8 w-full">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
