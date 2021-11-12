<template>
    <div class="row">
        <div v-for="room of rooms" :key="room.name" class="col">
            <router-link v-slot="{ navigate }" :to="{ name: 'room' }" custom>
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
        props: { rooms: { type: Array, required: true } },
    }
</script>

<style lang="scss" scoped>
    .row {
        display: flex;
        max-width: 825px;
        flex-wrap: wrap;
    }

    .col {
        flex: 0 1 33.33%;

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
</style>
