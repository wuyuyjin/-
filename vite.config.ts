import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // 前端如何解决跨域问题，这只能在开发的时候可以这么配置，但在正常的部署到服务器的话最终还是需要后端自己去配置跨域
    server: {
        proxy: {
            // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
            '/api': {
                // target: 'http://jsonplaceholder.typicode.com',
                target:'http://10.23.68.56:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
})
