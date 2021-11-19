<template>
    <!-- home -->
    <section class="home" :style="{ background }">
        <section class="home-container">
            <!-- home-introduce -->
            <div class="home-introduce">
                <HomeIntroduce>
                    <BaseCarouselIndicators
                        v-model:modelValue="backgroundIndex"
                        :options="backgroundFormatOptions"
                        name="background"
                    />
                </HomeIntroduce>
            </div>
            <!-- home-room-list -->
            <div class="home-room-list">
                <HomeRoomList :rooms="rooms" />
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
    import HomeIntroduce from '../components/Home/HomeIntroduce.vue'
    import HomeRoomList from '../components/Home/HomeRoomList.vue'
    import BaseCarouselIndicators from '../components/Base/BaseCarouselIndicators.vue'
    import api from '../API/api'

    export default {
        name: 'HomePage',
        components: {
            HomeIntroduce,
            HomeRoomList,
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
                return `linear-gradient(#00000060, #00000060), url(${url.url}) center / cover no-repeat`
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
    //====================
    .home-container {
        display: flex;
        justify-content: space-between;
        width: 82%;
        max-width: 1110px;
        margin: 0 auto;
        padding-top: 109px;
    }

    // home-introduce
    //====================
    .home-introduce {
        padding: 10px 9px;
    }

    // home-room-list
    //====================
    .home-room-list {
        // width: 100%;
    }
</style>
