import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// config ทั้งหมดของ Vite = ไฟล์เดียวนี้ (เทียบ Next ที่ config กระจายหลายที่ + convention)
export default defineConfig({
  plugins: [react()],
});
