import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
//   darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      // your theme extensions here
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
