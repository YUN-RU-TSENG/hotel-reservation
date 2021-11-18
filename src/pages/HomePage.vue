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
    import { ref, computed, onBeforeMount } from 'vue'
    import bg1 from '../assets/images/house/bg1.png'
    import bg2 from '../assets/images/house/bg2.png'
    import bg3 from '../assets/images/house/bg3.png'
    import bg4 from '../assets/images/house/bg4.png'
    import HomePageIntroduce from '../components/HomePage/HomePageIntroduce.vue'
    import HomePageRoomList from '../components/HomePage/HomePageRoomList.vue'
    import BaseCarouselIndicators from '../components/Base/BaseCarouselIndicators.vue'

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
        name: 'HomePage',
        components: {
            HomePageIntroduce,
            HomePageRoomList,
            BaseCarouselIndicators,
        },
        setup() {
            const rooms = ref([])

            onBeforeMount(async () => {
                try {
                    const { data } = await api.get('/rooms')
                    rooms.value = data.items
                } catch (error) {
                    console.error(error)
                }
            })

            const backgroundIndex = ref(0)
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
                rooms,
                backgroundIndex,
                background,
                backgroundFormatOptions,
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
