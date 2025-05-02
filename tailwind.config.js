// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Quan trọng: bao gồm file index.html
    "./src/**/*.{js,jsx,ts,tsx}", // Bao gồm tất cả file js, jsx, ts, tsx trong thư mục src và các thư mục con
    // Thêm các đường dẫn khác nếu bạn dùng Tailwind ở ngoài src hoặc trong các loại file khác (.html, .vue, .svelte, ...)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
