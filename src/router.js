import Home from './pages/HomePage.vue'
import Room from './pages/RoomPage.vue'
import BaseDatePicker from './components/Base/BaseDatePicker.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/room', component: Room, name: 'room' },
    { path: '/BaseDatePicker', component: BaseDatePicker, name: 'BaseDatePicker' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
