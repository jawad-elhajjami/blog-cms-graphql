import React, {useRef, useState, useEffect} from 'react'
import icon from '../public/images/newsletter_icon.png';
import { submitEmail } from '@/services';
import Image from 'next/image';

const Newsletter = () => {

  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const emailEl = useRef();

  const handleSubscription = async () => {
    setError(false);
    setShowSuccessMessage(false);
  
    const { value: email } = emailEl.current;
  
    // Validate the email input
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(true);
      return;
    }
  
    const subscriberObj = { email };
  
    try {
      const res = await submitEmail(subscriberObj);
      console.log("Response from backend:", res);  // Log the full response
  
      if (res.createSubscriber && res.createSubscriber.id) {
        // If the subscriber is created successfully
        setShowSuccessMessage(true);
        emailEl.current.value = ''; // Clear input after submission
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
        console.log("Subscriber created successfully!");
      } else {
        setError(true); // Handle failure from backend
        console.log("Error: Subscriber creation failed");
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setError(true); // Handle unexpected error
    }
  };
  


  return (
    <div className='mt-8 bg-white/40 p-8 w-full rounded-lg backdrop-blur-3xl relative'>
        <div>
          <h2 className='font-bold text-4xl text-white mb-4'>Recieve my latest insights</h2>
          <p className='text-white/80 w-full md:w-[40%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque aliquid odit blanditiis voluptatem eos? Itaque.</p>
        </div>
        <div className='flex items-center flex-col sm:flex-row mt-8'>
          <div className='form-group'>
            <input type="email" ref={emailEl} name='email' id="email" placeholder='Ex: john.doe@gmail.com' className='px-4 py-3 rounded-lg bg-white text-gray-900 outline-none border-2 border-pink-600 focus:border-pink-600 duration-200 mr-4 mb-4'/>
          </div>
          <button className='bg-pink-600 mb-4 py-3 px-6 rounded-lg font-semibold text-lg text-white duration-500 hover:bg-white hover:text-pink-600' onClick={handleSubscription}>Subscribe</button>
        </div>
        <div className='flex w-full'>
            {showSuccessMessage && <span className='text-md font-normal text-green-600 block mt-4 duration-200 transition-all bg-white p-2 rounded-lg'>Thanks for subscribing to the newsletter !</span>}
            {error && <p className='text-md block text-red-600 rounded-lg mt-4 duration-200 transition-all bg-white p-2'>Oops ! there is an error.</p>}
        </div>
        <Image
            width={250}
            height={250}
            src={icon}
            className='absolute right-20 top-0 hidden lg:block'
        />
    </div>
  )
}

export default Newsletter