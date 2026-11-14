import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes every path relative, so the built site works at
// mannycodes20.github.io/Portfolio-Website/ or any other address.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
