<template>
    <BaseDatePicker v-model:begin="begin" v-model:end="end" />
    <p data-test="answer">{{ answer }}</p>
</template>

<script>
    import { ref } from '@vue/reactivity'
    import BaseDatePicker from '../../components/Base/BaseDatePicker.vue'
    import dayjs from 'dayjs'
    import useCalculateBookingDays from '../../composables/room/useCalculateBookingDays'

    export default {
        name: 'RoomSearchBooking',
        components: {
            BaseDatePicker,
        },
        props: { booking: { type: Array, reqired: true } },
        setup(props) {
            const begin = ref(dayjs().format('YYYY-MM-DD'))
            const end = ref(dayjs().add(1, 'day').format('YYYY-MM-DD'))

            const { answer } = useCalculateBookingDays(begin, end, props)

            return {
                answer,
                begin,
                end,
            }
        },
        data() {
            return {}
        },
    }
</script>

<style lang="scss" scoped>
    .answer {
        font: normal normal medium 14px/24px 'Noto Sans TC';
        color: #775454;
    }
</style>
