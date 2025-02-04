import React, {useState, useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import {getComments} from '@/services'

const Comments = ({slug}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
      getComments(slug)
        .then((result) => setComments(result))
  }, [slug])

  return (
    <>
    {comments.length > 0 && (
        <div className='bg-gray-900/60 backdrop-blur-2xl rounded-lg overflow-hidden border border-white/10 mt-8 p-8'>
          <div>
              <h3 className='text-white text-2xl font-medium mb-4'>{comments.length == 1 ? '(1) Comment' : comments.length + ' Comments'}</h3>
              {comments.map((comment) => (
                <div key={comment.createdAt} className='py-4 border-b border-white/10'>
                  <div className='flex items-center gap-4'>
                    <div className='text-white flex items-center justify-center w-20 h-20 rounded-lg bg-gray-950/60'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className='text-pink-600 font-semibold text-xl'>{comment.name} <i className='text-white'>Said:</i></h4>
                        <span className='text-white/60 text-sm inline-block mb-2'>{moment(comment.createdAt).format('MMM DD, YYYY')}</span>
                        <p className='text-white/80 text-md'>{comment.comment}</p>
                      </div>
                  </div>
                    
                </div>
              ))}
          </div>
        </div>
      )}
      </>
  )
}

export default Comments
