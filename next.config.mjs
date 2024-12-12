/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['my-sih-rekognition-images.s3.ap-south-1.amazonaws.com'],
//     },
//   };

  const nextConfig = {
    images: {
      loader: 'imgix',
      path: '',
      domains: ['my-sih-rekognition-images.s3.ap-south-1.amazonaws.com'],
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignores ESLint errors during builds
    },
  };
  
  
  export default nextConfig;