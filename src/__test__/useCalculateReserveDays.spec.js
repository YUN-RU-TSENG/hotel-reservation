import useCalculateBookingDays from '../composables/room/useCalculateBookingDays'
import dayjs from 'dayjs'
import { ref } from 'vue'

describe('function useCalculateBookingDays(begin, end)', () => {
    it('should return nothing, begin and end is null', () => {
        const begin = ref('')
        const end = ref('')
        const { answer } = useCalculateBookingDays(begin, end)

        expect(answer.value).toBe('')
    })

    it('should return nothing, when end day is null', async () => {
        const begin = ref(dayjs().format('YYYY-MM-DD'))
        const end = ref('')

        const { answer } = useCalculateBookingDays(begin, end)

        expect(answer.value).toBe('')
    })

    it('should return 日子已被預訂, when user select days range is be select by other', async () => {
        const props = {
            booking: [
                {
                    name: 'wo',
                    tel: '0961111111',
                    date: dayjs().format('YYYY-MM-DD'),
                },
                {
                    name: 'anny',
                    tel: '0961331111',
                    date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
                },
            ],
        }
        const begin = ref(dayjs().format('YYYY-MM-DD'))
        const end = ref(dayjs().add(1, 'day').format('YYYY-MM-DD'))

        const { answer } = useCalculateBookingDays(begin, end, props)

        expect(answer.value).toBe(`日子 ${dayjs().format('YYYY-MM-DD')} 已被預訂`)
    })

    it('should return 日子可以預訂, when user select days range is be select by other', async () => {
        const props = {
            booking: [],
        }
        const begin = ref(dayjs().format('YYYY-MM-DD'))
        const end = ref(dayjs().add(2, 'day').format('YYYY-MM-DD'))

        const { answer } = useCalculateBookingDays(begin, end, props)

        expect(answer.value).toBe('日子可以預訂')
    })

    it('should return 選擇日期超過九十天, when user select days range is after 90 days', async () => {
        const props = {
            booking: [],
        }
        const begin = ref(dayjs().format('YYYY-MM-DD'))
        const end = ref(dayjs().add(100, 'day').format('YYYY-MM-DD'))

        const { answer } = useCalculateBookingDays(begin, end, props)

        expect(answer.value).toBe('選擇日期超過九十天')
    })
})
