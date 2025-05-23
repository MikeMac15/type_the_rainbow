import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '/type_the_rainbow/',
  build: {
    outDir: 'dist',
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
