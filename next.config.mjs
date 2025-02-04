/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "us-west-2.graphassets.com",
      },
    ],
  },
};

export default nextConfig;
