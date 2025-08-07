import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from 'vite-plugin-checker'

export default defineConfig({
    plugins: [
        react(),
        checker({typescript: false})
    ],
    server: {
        proxy: {
            '/addAppointment': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },

});
