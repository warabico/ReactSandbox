import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Server from "./server";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: Server,
});
