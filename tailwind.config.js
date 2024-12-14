module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.css',
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'custom-gray': '#212121',
        'custom-black': '#021728',
        'custom-text': '#ffffff',
      },
      screens: {
        '4xl': '1920px', // Add custom breakpoint for extra large screens
      },
      backgroundImage: {
        'hero-pattern': "url('/images/home-page.jpg')",
        'custom-gradient': "linear-gradient(180deg, rgba(123,177,237,1) 0%, rgba(189,215,244,1) 80%, rgba(249,250,251,1) 100%);",
        'about-pattern': "url('/images/about-image.jpg')",
        'book-cover1': "url('/images/2542-cover.png')",
        'book-cover2': "url('/images/2701-cover.png')",
        'book-cover3': "url('/images/84-cover.png')",
      }
    },
  },
  plugins: [],
};
