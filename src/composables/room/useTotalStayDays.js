import { computed } from '@vue/reactivity'
import dayjs from 'dayjs'

export default function useTotalStayDays(beginDate, endDate, props) {
    const totalStayDays = computed(() => {
        return !beginDate.value || !endDate.value
            ? []
            : Array(Math.abs(dayjs(beginDate.value).diff(dayjs(endDate.value), 'day')))
                  .fill(0)
                  .map((_, index) => {
                      return dayjs(beginDate.value).add(index, 'day').format('YYYY-MM-DD')
                  })
    })

    const totalStayNormalDaysLength = computed(() => {
        return !totalStayDays.value.length
            ? 0
            : totalStayDays.value.filter((day) => dayjs(day).day() > 1).length
    })

    const totalPrice = computed(() => {
        return (
            props.room.normalDayPrice * totalStayNormalDaysLength.value +
            props.room.holidayPrice * (totalStayDays.value.length - totalStayNormalDaysLength.value)
        )
    })

    return {
        totalStayDays,
        totalStayNormalDaysLength,
        totalPrice,
    }
}
