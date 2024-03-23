import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'flexo-bold': ['Flexo-Bold', 'Arial', 'sans-serif'],
        'flexo-demi': ['Flexo-Demi', 'Arial', 'sans-serif'],
        'flexo-medium': ['Flexo-Medium', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
