// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import viteTsconfigPaths from 'vite-tsconfig-paths'

// export default defineConfig({
//     // depending on your application, base can also be "/"
//     base: '',
//     plugins: [react(), viteTsconfigPaths()],
//     server: {    
//         // this ensures that the browser opens upon server start
//         open: true,
//         // this sets a default port to 3000  
//         port: 3000, 
//     },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  plugins: [react(), svgr()],
  build: {
    outDir: 'build'
  },
  server:{
    open:true,
    host: "0.0.0.0",
    port: 3000, 
  }
})