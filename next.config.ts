export default {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "encrypted-tbn0.gstatic.com" },
      { hostname: "*.googleusercontent.com" },
      { hostname: "*.gstatic.com" },
    ],
  },
};
