import { computed } from '@vue/reactivity'
import dayjs from 'dayjs'

/**
 * calculate booking days
 * @param begin
 * @param end
 * @param props
 * @returns calculate result
 */
export default function useCalculateBookingDays(begin, end, props) {
    const answer = computed(() => {
        if (!begin.value || !end.value) return ''

        const selectDays = Array(Math.abs(dayjs(begin.value).diff(dayjs(end.value), 'day')))
            .fill(0)
            .map((_, index) => dayjs(begin.value).add(index, 'day').format('YYYY-MM-DD'))
        const bookingRange = props.booking.map((item) => item?.date)
        const conflict = selectDays.filter((day) => bookingRange.includes(day))

        if (selectDays.some((day) => dayjs(day).isAfter(dayjs().add(90, 'day'))))
            return '選擇日期超過九十天'
        if (conflict.length) return `日子 ${conflict.join('、')} 已被預訂`
        if (!conflict.length) return '日子可以預訂'
    })

    return { answer }
}
