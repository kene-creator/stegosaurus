/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  mode: process.env.NODE_ENV ? "jit" : undefined,
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  // purge: ["./**/*.html"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primaryLight: "#4603AD",

        skin: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-inverted)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)",
          "button-accent": "var(--color-button-accent)",
        },
      },

      fontFamily: {
        head: ["poppins"],
        body: ["noto sans"],
      },
      boxShadow: {
        scoop: "0 -50px 0 0 #4603ad",
      },
      borderRadius: {
        "4xl": "3.5rem",
        "5xl": "4rem",
        "6xl": "4.5rem",
        "7xl": "5rem",
      },
      transitionTimingFunction: {
        "menu-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      screens: {
        vsm: { max: "450px" },
        minSm: { min: "450px" },
        minMd: { min: "650px" },
        mdX: { max: "650px" },
      },
    },
  },
  plugins: ["tailwindcss", "tailwind-scrollbar"],
};
