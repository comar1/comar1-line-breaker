export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue"
  ],
  css: ['~/assets/css/main.css'],
  theme: {
    extend: {
      colors: {
        background: "#020420",
        secondary: "#00dc82",
        border: "#00dc82",
        icon: "#00dc82",
        text: "#ffffff"
      }
    }
  },
  plugins: []
}