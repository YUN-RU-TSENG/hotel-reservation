import Home from './pages/HomePage.vue'
import Room from './pages/RoomPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/room', component: Room },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
