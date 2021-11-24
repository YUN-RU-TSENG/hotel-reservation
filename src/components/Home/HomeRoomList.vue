<template>
    <div class="home-room-list row">
        <div v-for="room of rooms" :key="room.name" class="home-room-list-item col">
            <router-link
                v-slot="{ navigate }"
                :to="{ name: 'room', params: { id: room.id } }"
                custom
            >
                <a
                    :style="{
                        background: 'url(' + room.imageUrl + ') center / cover no-repeat',
                    }"
                    @click="navigate"
                >
                    <p>
                        <span>{{ room.name }}</span>
                    </p>
                </a>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomeRoomList',
        props: { rooms: { type: Array, required: true } },
    }
</script>

<style lang="scss" scoped>
    // home-room-list
    //====================
    .home-room-list {
    }

    .home-room-list.row {
        display: flex;
        max-width: 825px;
        flex-wrap: wrap;
    }

    // home-room-list-item
    //====================
    .home-room-list-item {
        a {
            font-size: 0px;
            display: block;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
        }

        a:hover > p {
            opacity: 1;
        }

        p {
            opacity: 0;
            height: 275px;
            transition: all 0.3s ease-in-out;
            text-align: center;
            background-color: #38470b60;

            &::before {
                content: '';
                display: inline-block;
                height: 100%;
                vertical-align: middle;
            }

            span {
                font: normal normal normal 19px/26px 'Open Sans';
                color: #fff;
            }
        }
    }

    .home-room-list-item.col {
        flex: 0 1 33.33%;
    }
</style>
