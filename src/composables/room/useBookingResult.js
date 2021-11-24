import { ref } from 'vue'

export default function useBookingResult(isShowBookingResult) {
    const bookingResult = ref({})
    const updateBookingResult = (result) => {
        bookingResult.value = result
        isShowBookingResult.value = true
    }

    return {
        bookingResult,
        updateBookingResult,
    }
}
