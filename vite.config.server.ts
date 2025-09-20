import { defineConfig } from "vite";
import path from "path";

// Server build configuration
export default defineConfig({

  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
