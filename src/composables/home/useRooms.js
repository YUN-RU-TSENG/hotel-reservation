import { ref, onBeforeMount } from 'vue'
import api from '../../API/api'

export default function useRooms() {
    const rooms = ref([])

    onBeforeMount(async () => {
        try {
            const { data } = await api.get('/rooms')
            rooms.value = data.items
        } catch (error) {
            console.error(error)
        }
    })

    return { rooms }
}
