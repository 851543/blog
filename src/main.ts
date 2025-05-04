import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './router/guard'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import { createPinia } from 'pinia'
import { i18n } from './locales'
import VueClickAway from 'vue3-click-away'
import lazyPlugin from 'vue3-lazy'
import { registerSvgIcon } from '@/icons'
import { registerObSkeleton } from '@/components/LoadingSkeleton'
import 'prismjs/themes/prism.css'
import 'prismjs'
import 'element-plus/theme-chalk/index.css'
import { components, plugins } from './plugins/element-plus'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import infiniteScroll from 'vue3-infinite-scroll-better'
import v3ImgPreview from 'v3-img-preview'
import 'mavon-editor/dist/css/index.css'
import api from './api/api'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .use(VueClickAway)
  .use(infiniteScroll)
  .use(v3ImgPreview, {})
  .use(lazyPlugin, {
    loading: require('@/assets/default-cover.jpg'),
    error: require('@/assets/default-cover.jpg')
  })
const userStore = useUserStore()
axios.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
  return config
})
const proxy = app.config.globalProperties
axios.interceptors.response.use(
  (response) => {
    if (response.data.flag) {
      return response
    }
    switch (response.data.code) {
      case 50000: {
        proxy.$notify({
          title: 'Error',
          message: '系统异常',
          type: 'error'
        })
        break
      }
      case 40001: {
        proxy.$notify({
          title: 'Error',
          message: '用户未登录',
          type: 'error'
        })
        if (userStore.userInfo !== '') {
          userStore.userInfo = ''
          userStore.token = ''
          userStore.accessArticles = []
          sessionStorage.removeItem('token')
        }
        break
      }
      default: {
        proxy.$notify({
          title: 'Error',
          message: response.data.message,
          type: 'error'
        })
        break
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
components.forEach((component) => {
  app.component(component.name, component)
})
plugins.forEach((plugin) => {
  app.use(plugin)
})
registerSvgIcon(app)
registerObSkeleton(app)
app.mount('#app')
// ANSI 转义码生成网站  https://patorjk.com/software/taag/#p=display&f=Big&t=ABB%0A
const title = `
                  ____     _       U  ___ u   ____   
                U | __")u  |"|       \/"_ \/U /"___|u 
                \|  _ \/U | | u     | | | |\| |  _ / 
                  | |_) | \| |/__.-,_| |_| | | |_| |  
                  |____/   |_____|\_)-\___/   \____|  
                _|| \\_   //  \\      \\     _)(|_   
                (__) (__) (_")("_)    (__)   (__)__) 
                                                                                      
                                                                                     `

const asciiArt = `
\x1b[32m✨ 你好！欢迎使用 blog！
\x1b[0m
\x1b[36m💡 如果您觉得项目对您有帮助，请点击下面的链接为我点个 ★Star 支持一下！祝您使用愉快！
\x1b[0m
\x1b[33m🌟 GitHub: https://github.com/851543/blog
\x1b[0m
${title}
`

console.log(asciiArt)
api.report()
