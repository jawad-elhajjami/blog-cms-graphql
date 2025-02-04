import { submitComment } from '@/services';
import React, {useRef, useState, useEffect} from 'react'

const PostDetail = ({slug}) => {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();
  
  useEffect(() => {
      nameEl.current.value = window.localStorage.getItem('name');
      emailEl.current.value = window.localStorage.getItem('email');
  },[])

  const handleCommentSubmit = () => {
      setError(false);
      const {value:comment} = commentEl.current;
      const {value:email} = emailEl.current;
      const {value:name} = nameEl.current;
      const {checked:storeData} = storeDataEl.current;

      if( !comment || !email || !name ){
        setError(true);
        return;
      }
      const commentObj ={
        name, email, comment, slug
      }

      if(storeData){
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('email', email);
      }else{
        window.localStorage.removeItem('name', name);
        window.localStorage.removeItem('email', email);
      }

      submitComment(commentObj).then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false)
        },3000)
      })

  }

  return (
    <div className='bg-gray-900/60 backdrop-blur-2xl rounded-lg overflow-hidden border border-white/10 mt-8 p-8 flex items-center flex-col'>
      <h3 className='text-white text-lg font-semibold'>Share your thoughts on this article</h3>
      <p className='text-white/70 text-sm'>Specify your name, email and comment</p>
      {showSuccessMessage && <span className='text-md float-right font-normal bg-green-600 text-white inline-block mt-8 w-[60%] duration-200 transition-all p-4 rounded-lg'>Comment submitted for review !</span>}
      {error && <p className='text-md text-white inline-block mt-8 bg-red-600/60 w-[60%] rounded-lg p-4'>All fields are required</p>}
      <div className='lg:w-[60%] w-[90%] flex flex-col items-center justify-center mx-auto'>
        <div className='form-group mt-8 w-full'>
          <label htmlFor="name" className='inline-block w-full text-white/80 mb-4'>Name</label>
          <input type="text" ref={nameEl} name='name' id="name" placeholder='Ex: John Doe' className='w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white outline-none border-2 border-white/20 focus:border-pink-600 duration-200'/>
        </div>
        <div className='form-group mt-8 w-full'>
          <label htmlFor="email" className='inline-block w-full text-white/80 mb-4'>Email</label>
          <input type="email" ref={emailEl} name='email' id="email" placeholder='Ex: john.doe@gmail.com' className='w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white outline-none border-2 border-white/20 focus:border-pink-600 duration-200'/>
        </div>
        <div className='form-group mt-8 w-full'>
          <label htmlFor="comment" className='inline-block w-full text-white/80 mb-4'>Comment</label>
          <textarea type="text" name='comment' ref={commentEl} id="comment" placeholder='Comment' className='w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white outline-none border-2 border-white/20 focus:border-pink-600 duration-200'/>
        </div>
        <div className='form-group mt-8 w-full flex gap-2 items-center'>
          <input type="checkbox" id='storeData' className='w-6 h-6' ref={storeDataEl} name='storeData' />
          <label htmlFor="storeData" className='text-white/80'>Save your name and email for next comments ?</label>
        </div>
        <button type='submit' id="submitComment" onClick={handleCommentSubmit} className='w-full bg-pink-600 text-white text-md p-4 rounded-lg mt-8 duration-300 hover:bg-pink-800 font-semibold'>Submit Comment</button>
      </div>
    </div>
  )
}

export default PostDetail
