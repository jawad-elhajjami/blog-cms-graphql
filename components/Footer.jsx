import React from 'react'

const currentDate = new Date()
const year = currentDate.getFullYear();

function Footer() {
  return (
    <div className='p-4 text-white text-center border-t border-white/20 mt-4'>JAWAD'S INSIGHTS &copy; {year} All rights reserved</div>
  )
}

export default Footer