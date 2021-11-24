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
    import BaseCarouselIndicators from '../components/Base/BaseCarouselIndicators.vue'

    import HomeIntroduce from '../components/Home/HomeIntroduce.vue'
    import HomeRoomList from '../components/Home/HomeRoomList.vue'

    import useBackgroundStyle from '../composables/Home/useBackgroundStyle'
    import useRooms from '../composables/Home/useRooms'

    export default {
        name: 'HomePage',
        components: {
            HomeIntroduce,
            HomeRoomList,
            BaseCarouselIndicators,
        },
        setup() {
            const { rooms } = useRooms()
            const { backgroundIndex, background, backgroundFormatOptions } = useBackgroundStyle()

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
