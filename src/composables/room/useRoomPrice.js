import { computed } from 'vue'

export default function useRoomPrice(room) {
    const isHoliday = () => {
        const today = new Date()
        if (today.getDay() === 0 || today.getDay() === 6) return true
        else return false
    }

    const roomPrice = computed(() => (isHoliday() ? room?.holidayPrice : room?.normalDayPrice))

    return {
        roomPrice,
    }
}
