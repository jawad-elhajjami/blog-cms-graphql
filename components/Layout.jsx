import React from 'react'
import {Header} from './'
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "../pages/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });


function Layout({children}) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default Layout