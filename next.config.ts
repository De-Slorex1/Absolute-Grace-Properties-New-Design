const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "afritreasure.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "gazettengr.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      { 
        protocol: "https", 
        hostname: "*.supabase.co" 
      },
    ],
  },
};

export default nextConfig;




