import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { getCategories, getPostsCountPerCategory } from '@/services'

const Categories = () => {

  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    // Fetch categories
    getCategories().then(async (newCategories) => {
      setCategories(newCategories);

      // Fetch post counts for each category and store them in state
      const categoryCounts = {};
      for (const category of newCategories) {
        const count = await getPostsCountPerCategory(category.slug);
        categoryCounts[category.slug] = count;
      }
      setCounts(categoryCounts);
    });
  }, []);


  return (
    <div className='bg-gray-900/50 backdrop-blur-2xl p-4 rounded-lg border border-gray-800 mb-8'>
      <h3 className='text-white text-xl font-semibold border-b border-white/30 pb-4 mb-4'>Categories</h3>

      {
        categories.map((category, index) => (
            <Link
                className='flex items-center justify-between w-full [&:not(:last-child)]:mb-4'
                key={index}
                href={`/category/${category.slug}`}
            >
              <p className="text-white hover:text-pink-500 duration-100">{category.name}</p>
              <div className='count bg-pink-700 w-6 h-fit text-center text-white rounded-md'>{counts[category.slug] || 0}</div>
            </Link>
        ))
      }

    </div>
  )
}

export default Categories
