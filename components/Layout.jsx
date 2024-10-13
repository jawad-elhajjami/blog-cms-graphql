import React from 'react'
import {Header} from './'
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../pages/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


function Layout({children}) {
  return (
    <div className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)]`}>
        <Header />
        {children}
    </div>
  )
}

export default Layout