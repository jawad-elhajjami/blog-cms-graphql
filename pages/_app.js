import React, {useEffect, useState} from "react";
import { Footer } from "@/components";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"



export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
}
