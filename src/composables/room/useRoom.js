import { ref } from 'vue'

export default function useRoom() {
    const room = ref({})

    return {
        room,
    }
}
