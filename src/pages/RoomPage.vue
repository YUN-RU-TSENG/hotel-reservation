<template>
    <!-- room -->
    <section class="room">
        <!-- room-booking -->
        <section v-if="room.id" class="room-booking" :style="{ background }">
            <RoomBooking
                class="room-booking-container"
                :room="room"
                @toggle-show="isShowBookingForm = true"
            >
                <BaseCarouselIndicators
                    v-model:modelValue="currentBackground"
                    :options="backgroundFormatOptions"
                    name="background-room"
                />
            </RoomBooking>
        </section>
        <section class="room-introduce">
            <!-- room-introduce -->
            <RoomInformation v-if="room.id" :room="room" :booking="booking" />
        </section>
    </section>
    <!-- popover -->
    <!-- room-popover-booking -->
    <RoomPopover v-if="room.id" v-model:show="isShowBookingForm" class="room-popover-booking">
        <RoomBookingForm
            :room="room"
            @submit-form="updateBookingResult"
            @update:show="isShowBookingForm = $event"
        />
    </RoomPopover>
    <!-- popover -->
    <!-- room-popover-result -->
    <RoomPopover v-if="room.id" v-model:show="isShowBookingResult" class="room-popover-result">
        <RoomResult :result="bookingResult" />
    </RoomPopover>
</template>

<script>
    import RoomBooking from '../components/Room/RoomBooking.vue'
    import RoomBookingForm from '../components/Room/RoomBookingForm.vue'
    import RoomInformation from '../components/Room/RoomInformation.vue'
    import RoomPopover from '../components/Room/RoomPopover.vue'
    import RoomResult from '../components/Room/RoomResult.vue'
    import BaseCarouselIndicators from '../components/Base/BaseCarouselIndicators.vue'
    import useBackgroundStyle from '../composables/Room/useBackgroundStyle.js'
    import useBookingResult from '../composables/Room/useBookingResult.js'
    import useRoom from '../composables/room/useRoom.js'
    import api from '../API/api'
    import { ref } from 'vue'

    export default {
        name: 'HomePage',
        components: {
            RoomBooking,
            RoomPopover,
            RoomInformation,
            RoomBookingForm,
            RoomResult,
            BaseCarouselIndicators,
        },
        // ! waiting for refactor
        async beforeRouteEnter(to, from, next) {
            try {
                const { data } = await api.get(`/room/${to.params.id}`)
                next((vm) => {
                    vm.room = data.room[0]
                    vm.booking = data.booking
                })
            } catch (error) {
                console.error(error)
            }
        },
        setup() {
            // ! waiting for refactor
            const booking = ref([])

            const isShowBookingResult = ref(false)
            const isShowBookingForm = ref(false)
            const { room } = useRoom()
            const { background, currentBackground, backgroundFormatOptions } =
                useBackgroundStyle(room)
            const { bookingResult, updateBookingResult } = useBookingResult(isShowBookingResult)

            return {
                booking,
                isShowBookingForm,
                isShowBookingResult,
                room,
                background,
                currentBackground,
                backgroundFormatOptions,
                bookingResult,
                updateBookingResult,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .room {
        display: flex;
        align-items: flex-start;
    }

    //====================
    // room-booking
    .room-booking {
        flex: 0 1 41.94%;
        background-size: cover;
        background-position: center;
    }

    .room-booking-container {
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
    //====================
    .room-introduce {
        max-width: 665px;
        margin-left: 30px;
        padding-top: 133px;
        padding-bottom: 40px;
        color: #38470b;
    }

    // room-popover-booking
    //====================
    .room-popover-booking {
        ::v-deep(.room-popover-container) {
            display: flex;
        }
    }

    // room-popover-result
    //====================
    .room-popover-result {
        ::v-deep(.room-popover-close svg use) {
            fill: #fff;
        }
    }
</style>
