import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

const root = (path: string) => fileURLToPath(new URL(path, import.meta.url));
export default defineConfig({
  plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react()],
  resolve: { alias: { "@": root("./src") } },
  build: {
    rollupOptions: {
      input: {
        index: root("./index.html"),
        "age-groups": root("./age-groups/index.html"),
        about: root("./about/index.html"),
        faq: root("./faq/index.html"),
        contact: root("./contact/index.html"),
      },
    },
  },
});
