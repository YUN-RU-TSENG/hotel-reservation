<template>
    <!-- home -->
    <section
        class="home"
        :style="{
            background:
                'linear-gradient(#00000060, #00000060),' + background + 'center / cover no-repeat',
        }"
    >
        <section class="home-container">
            <!-- home-introduce -->
            <div class="home-introduce">
                <HomePageIntroduce>
                    <BaseCarouselIndicators
                        v-model:modelValue="backgroundIndex"
                        :options="backgroundFormatOptions"
                        name="background"
                    ></BaseCarouselIndicators>
                </HomePageIntroduce>
            </div>
            <!-- home-room-list -->
            <div class="home-room-list">
                <HomePageRoomList :rooms="rooms"></HomePageRoomList>
            </div>
        </section>
    </section>
</template>

<script>
    import { ref, computed } from 'vue'
    import bg1 from '../assets/images/house/bg1.png'
    import bg2 from '../assets/images/house/bg2.png'
    import bg3 from '../assets/images/house/bg3.png'
    import bg4 from '../assets/images/house/bg4.png'
    import HomePageIntroduce from '../components/HomePage/HomePageIntroduce.vue'
    import HomePageRoomList from '../components/HomePage/HomePageRoomList.vue'
    import BaseCarouselIndicators from '../components/Base/BaseCarouselIndicators.vue'

    export default {
        name: 'HomePage',
        components: {
            HomePageIntroduce,
            HomePageRoomList,
            BaseCarouselIndicators,
        },
        setup() {
            const backgroundIndex = ref(1)
            const backgroundOptions = [
                { id: 0, url: bg1 },
                { id: 1, url: bg2 },
                { id: 2, url: bg3 },
                { id: 3, url: bg4 },
            ]
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
                rooms: [
                    {
                        id: '3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu',
                        imageUrl:
                            'https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
                        normalDayPrice: 1380,
                        holidayPrice: 1500,
                        name: 'Single Room',
                    },
                    {
                        id: 'g0mYhN6ignMz4VYW7eiWsXZN8DHolHzH8LuVmM6hq5h6BrrqrLMw4aJgHv7LZ3RQ',
                        imageUrl:
                            'https://images.unsplash.com/photo-1564182379166-8fcfdda80151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80',
                        normalDayPrice: 1899,
                        holidayPrice: 2000,
                        name: 'Deluxe Single Room',
                    },
                    {
                        id: 'RA8NhExaXXZB7EODVALSDvFFQzj1JP0a4C1pwZ1acPaieRBwiWoCb0FE0KUbXaxg',
                        imageUrl:
                            'https://images.unsplash.com/photo-1526913621366-a4583840d736?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
                        normalDayPrice: 2460,
                        holidayPrice: 2500,
                        name: 'Double Room',
                    },
                    {
                        id: 'kICyWhZ5XsfI4n1d4gBOsDjIyIxNozwgmxYKyZpzi5pjLcU2Nl4RhiGrn6zaPuTJ',
                        imageUrl:
                            'https://images.unsplash.com/photo-1519710889408-a67e1c7e0452?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
                        normalDayPrice: 2888,
                        holidayPrice: 3000,
                        name: 'Deluxe Double Room',
                    },
                    {
                        id: 'VCxbQq1vLeUtxW781k9Dlq3mHBRNl5YP19Lhq8k5TbIr2BeH58gRpnNKGoEgkysz',
                        imageUrl:
                            'https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
                        normalDayPrice: 3350,
                        holidayPrice: 3500,
                        name: 'Twin Room',
                    },
                    {
                        id: 'YovqNpFDaal598jbpd1A14gXwDE6gekTqJgxOAGcq78B8YnP7claymQVFy2GTwgb',
                        imageUrl:
                            'https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
                        normalDayPrice: 3899,
                        holidayPrice: 4000,
                        name: 'Deluxe Twin Room',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
    .home {
        min-height: 100vh;
    }

    // home-container
    //==============================================================================
    .home-container {
        display: flex;
        justify-content: space-between;
        width: 82%;
        max-width: 1110px;
        margin: 0 auto;
        padding-top: 109px;
    }

    // home-introduce
    //==============================================================================
    .home-introduce {
        padding: 10px 9px;
    }

    // home-room-list
    //==============================================================================
    .home-room-list {
        // width: 100%;
    }
</style>
