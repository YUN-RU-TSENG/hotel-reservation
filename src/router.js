import Home from './pages/HomePage.vue'
import Room from './pages/RoomPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/room/:id', component: Room, name: 'room' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
