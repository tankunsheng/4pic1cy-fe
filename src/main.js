import { createApp } from 'vue'
// import App from './App.vue'
import Menu from './Menu.vue'
import Nav from './components/Navbar.vue'


createApp(Nav).mount('#navbar')
createApp(Menu).mount('#app')
