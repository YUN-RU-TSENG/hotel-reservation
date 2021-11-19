import { computed } from '@vue/reactivity'

export default function useTotalStayPrice(props, totalStayDays, totalStayNormalDaysLength) {
    const totalPrice = computed(() => {
        return (
            props.room.normalDayPrice * totalStayNormalDaysLength.value +
            props.room.holidayPrice * (totalStayDays.value.length - totalStayNormalDaysLength.value)
        )
    })
    return { totalPrice }
}
