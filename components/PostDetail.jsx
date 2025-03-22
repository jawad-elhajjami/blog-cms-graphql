import React from 'react'
import Image from 'next/image'
import moment from 'moment'

const PostDetail = ({post}) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-2xl text-white font-medium mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-4 text-sm text-white/70">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <Image 
                src={obj.src}
                alt={obj.title}
                key={index}
                className='w-full h-[500px] object-center rounded-lg object-cover mb-8'
                height={obj.height}
                width={obj.width}
              />
        );
      case 'code-block':
        return(
          <code className='text-white font-semibold p-4 bg-blue-500/30 w-full inline-block rounded-lg mb-4'>{modifiedText}</code>
        )
      default:
        return modifiedText;
    }
  };


  return (
    <div className='bg-gray-900/60 backdrop-blur-2xl rounded-lg overflow-hidden border border-white/10 mt-8'>
      <Image 
          src={post.featuredImage.url} 
          alt={post.title} 
          className='h-[500px] object-center w-full object-cover'
          width={0}
          height={0}
          sizes="100vw"
      />
      <div className='p-8'>
        <p className='text-white/60 lg:float-right float-none flex items-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          {moment(post.createdAt).format('MMM DD, YYYY')}
        </p>
        <h1 className='text-white text-3xl font-medium line-clamp-3 text-ellipsis mb-8'>{post.title}</h1>
        <div>
          {post.content.raw.children.map((typeObj, index) =>{
            const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
      
    </div>
  )
}

export default PostDetail
