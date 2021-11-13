<template>
    <section class="room">
        <!-- rooom-reservation -->
        <section
            class="room-reservation"
            :style="{
                background:
                    'linear-gradient(180deg, #ffffff10, #ffffff), center / cover no-repeat ' +
                    background,
            }"
        >
            <RoomPageReservation class="room-reservation-container" :price="price">
                <BaseCarouselIndicators
                    v-model:modelValue="backgroundIndex"
                    :options="backgroundFormatOptions"
                    name="background-room"
                ></BaseCarouselIndicators>
            </RoomPageReservation>
        </section>
        <!-- rooom-introduce -->
        <section class="room-introduce">
            <RoomPageInformation :room="room" />
        </section>
    </section>
</template>

<script>
    import RoomPageReservation from '../components/RoomPage/RoomPageReservation.vue'
    import RoomPageInformation from '../components/RoomPage/RoomPageInformation.vue'
    import BaseCarouselIndicators from '../components/Base/BaseCarouselIndicators.vue'
    import { ref, computed } from 'vue'

    export default {
        components: { RoomPageReservation, RoomPageInformation, BaseCarouselIndicators },
        setup() {
            const room = {
                id: '3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu',
                name: 'Single Room',
                imageUrl: [
                    'https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
                    'https://images.unsplash.com/photo-1526880792616-4217886b9dc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
                    'https://images.unsplash.com/photo-1515511856280-7b23f68d2996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80',
                ],
                normalDayPrice: 1380,
                holidayPrice: 1500,
                descriptionShort: {
                    GuestMin: 1,
                    GuestMax: 1,
                    Bed: ['Single'],
                    'Private-Bath': 1,
                    Footage: 18,
                },
                description:
                    'Single Room is only reserved for one guest. There is a bedroom with a single size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.',
                checkInAndOut: {
                    checkInEarly: '15:00',
                    checkInLate: '19:00',
                    checkOut: '10:00',
                },
                amenities: {
                    'Wi-Fi': true,
                    Breakfast: true,
                    'Mini-Bar': false,
                    'Room-Service': false,
                    Television: true,
                    'Air-Conditioner': true,
                    Refrigerator: true,
                    Sofa: false,
                    'Great-View': false,
                    'Smoke-Free': true,
                    'Child-Friendly': false,
                    'Pet-Friendly': true,
                },
            }

            const price = isHoliday() ? room.holidayPrice : room.normalDayPrice

            function isHoliday() {
                const today = new Date()
                if (today.getDay() === 0 || today.getDay() === 6) return true
                else return false
            }

            const backgroundIndex = ref(1)
            const backgroundOptions = room.imageUrl.map((item, index) => ({ id: index, url: item }))
            const backgroundFormatOptions = backgroundOptions.map((item) => ({
                id: item.id,
                value: item.id,
            }))
            const background = computed(() => {
                const url = backgroundOptions.find((item) => item.id == backgroundIndex.value)
                return `url(${url.url})`
            })

            return {
                backgroundIndex,
                background,
                backgroundFormatOptions,
                room,
                price,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .room {
        display: flex;
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
        color: #38470b;
    }
</style>
