import { createRouter, createWebHashHistory } from 'vue-router'
import Menu from './components/Menu'
import HelloWorld from './components/Game'
import Policy from './components/PrivacyPolicy'
const routes = [
    { path: '/', component: Menu },
    { path: '/menu', component: Menu },
    { path: '/game', component: HelloWorld },
    { path: '/policy', component: Policy }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;