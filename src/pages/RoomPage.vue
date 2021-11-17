<template>
    <!-- room -->
    <section class="room">
        <!-- rooom-reservation -->
        <section v-if="room.id" class="room-reservation" :style="{ background }">
            <RoomPageReservation
                class="room-reservation-container"
                :price="roomPrice"
                @toggle-show="isShowReserveForm = true"
            >
                <BaseCarouselIndicators
                    v-model:modelValue="currentBackground"
                    :options="backgroundFormatOptions"
                    name="background-room"
                ></BaseCarouselIndicators>
            </RoomPageReservation>
        </section>
        <!-- rooom-introduce -->
        <section class="room-introduce">
            <RoomPageInformation v-if="room.id" :room="room" />
        </section>
    </section>
    <!-- popover -->
    <!-- room-page-popover-reserve -->
    <RoomPagePopover
        v-if="room.id"
        v-model:show="isShowReserveForm"
        class="room-page-popover-reserve"
    >
        <RoomPageReserveForm
            :room="room"
            :price="roomPrice"
            :is-submiting-reserve-form="isSubmitingReserveForm"
            :is-show-reserve-form="isShowReserveForm"
            @submit-form="submitReserveForm"
        ></RoomPageReserveForm>
    </RoomPagePopover>
    <!-- popover -->
    <!-- room-page-popover-result -->
    <RoomPagePopover v-if="room.id" v-model:show="isShowResult" class="room-page-popover-result">
        <RoomPageResult :result="reserveResult"></RoomPageResult>
    </RoomPagePopover>
</template>

<script>
    import RoomPageReservation from '../components/RoomPage/RoomPageReservation.vue'
    import RoomPageInformation from '../components/RoomPage/RoomPageInformation.vue'
    import RoomPagePopover from '../components/RoomPage/RoomPagePopover.vue'
    import RoomPageReserveForm from '../components/RoomPage/RoomPageReserveForm.vue'
    import RoomPageResult from '../components/RoomPage/RoomPageResult.vue'
    import BaseCarouselIndicators from '../components/Base/BaseCarouselIndicators.vue'
    import { ref, computed } from 'vue'
    import { useRoute } from 'vue-router'
    // import { useRoute, onBeforeRouteUpdate } from 'vue-router'
    import axios from 'axios'

    const api = axios.create({
        baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6/',
        timeout: 3000,
        headers: {
            Authorization: 'Bearer p2FP3rIsABET2oxPlvYOBSCkT4qb6XxJU3Rt19hjxfFyyDjoW1UFnQouCoBe',
            Accept: 'application/json',
        },
    })

    export default {
        components: {
            RoomPageReservation,
            RoomPageInformation,
            RoomPageReserveForm,
            RoomPagePopover,
            RoomPageResult,
            BaseCarouselIndicators,
        },
        async beforeRouteEnter(to, from, next) {
            try {
                const { data } = await api.get(`/room/${to.params.id}`)
                next((vm) => (vm.room = data.room[0]))
            } catch (error) {
                console.error(error)
            }
        },
        setup() {
            const { room } = useRoom()
            const { roomPrice } = useRoomPrice(room)
            const { background, currentBackground, backgroundFormatOptions } =
                useBackgroundStyle(room)

            const route = useRoute()

            const isShowReserveForm = ref(false)
            const isShowResult = ref(false)
            const isReserveSuccess = ref(null)
            const reserveResult = computed(() => (isReserveSuccess.value ? 'success' : 'fail'))
            const isSubmitingReserveForm = ref(false)
            const submitReserveForm = async (formData) => {
                try {
                    isReserveSuccess.value = null
                    isSubmitingReserveForm.value = true
                    const { data } = await api.post(`/room/${route.params.id}`, formData)
                    isReserveSuccess.value = data.success
                } catch (err) {
                    console.error(err)
                } finally {
                    isSubmitingReserveForm.value = false
                    isShowReserveForm.value = false
                    isShowResult.value = true
                }
            }

            return {
                background,
                currentBackground,
                backgroundFormatOptions,
                room,
                roomPrice,
                isShowReserveForm,
                isShowResult,
                isReserveSuccess,
                reserveResult,
                isSubmitingReserveForm,
                submitReserveForm,
            }
        },
    }

    function useBackgroundStyle(room) {
        const currentBackground = ref(1)
        const backgroundOptions = computed(() =>
            room.value?.imageUrl?.map((item, index) => ({ id: index, url: item }))
        )
        const backgroundFormatOptions = computed(() =>
            backgroundOptions.value?.map(({ id }) => ({
                id,
                value: id,
            }))
        )
        const background = computed(() => {
            const data = backgroundOptions.value?.find(({ id }) => id == currentBackground.value)

            return `linear-gradient(180deg, #ffffff10, #fff), center / cover no-repeat url(${
                data?.url ?? ''
            })`
        })

        return {
            background,
            currentBackground,
            backgroundFormatOptions,
        }
    }

    function useRoom() {
        const room = ref({})

        return {
            room,
        }
    }

    function useRoomPrice(room) {
        const isHoliday = () => {
            const today = new Date()
            if (today.getDay() === 0 || today.getDay() === 6) return true
            else return false
        }

        const roomPrice = computed(() =>
            isHoliday() ? room.value?.holidayPrice : room.value?.normalDayPrice
        )

        return {
            roomPrice,
        }
    }
</script>

<style lang="scss" scoped>
    .room {
        display: flex;
        align-items: flex-start;
    }

    //==============================================================================
    // room-reservation
    .room-reservation {
        flex: 0 1 41.94%;
        background-size: cover;
        background-position: center;
    }

    .room-reservation-container {
        height: 768px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 445px;
        margin-left: auto;
        margin-right: 0;
        padding-top: 87px;
        padding-bottom: 47px;
        align-items: start;

        ::v-deep(form span) {
            background-color: transparent;
            border-color: #38470b;
        }
        ::v-deep(form input:checked ~ span) {
            background-color: #38470b;
        }
    }

    // room-introduce
    //==============================================================================
    .room-introduce {
        max-width: 665px;
        margin-left: 30px;
        padding-top: 133px;
        padding-bottom: 40px;
        color: #38470b;
    }

    // room-page-popover-reserve
    //==============================================================================
    .room-page-popover-reserve {
        ::v-deep(.room-popover-container) {
            display: flex;
        }
    }

    // room-page-popover-result
    //==============================================================================
    .room-page-popover-result {
        ::v-deep(.room-popover-close svg use) {
            fill: #fff;
        }
    }
</style>
