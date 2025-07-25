/** @type {import('tailwindcss').Config} */
export default {
 
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}", // specifically all pages and subfolders
    ],
    
 
  theme: {
    extend: {},
  },
  plugins: [],
}