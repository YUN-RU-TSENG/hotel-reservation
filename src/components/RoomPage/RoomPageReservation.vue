<template>
    <div>
        <!-- reservation-goback -->
        <router-link v-slot="{ navigate }" :to="{ name: 'home' }" custom>
            <a href class="room-reservation-goback" @click="navigate"
                ><SvgIcon name="icon15" width="8.31px" height="15.87px"></SvgIcon>
                <span>查看其他房型</span>
            </a>
        </router-link>
        <!-- reservation-price -->
        <section class="room-reservation-price">
            <p>
                <span>${{ price }}</span>
                <span>/</span>
                <span>1晚</span>
            </p>
            <BaseButton>Booking now</BaseButton>
            <slot></slot>
        </section>
    </div>
</template>

<script>
    import SvgIcon from '../SvgIcon.vue'
    import BaseButton from '../Base/BaseButton.vue'

    export default {
        components: { SvgIcon, BaseButton },
        props: { price: { type: Number, required: true } },
    }
</script>

<style lang="scss" scoped>
    .room-reservation-goback {
        display: inline-block;
        font-size: 0;
        text-decoration: none;

        svg {
            fill: #38470b;
            vertical-align: middle;
            margin-right: 9.68px;
        }

        span {
            vertical-align: middle;
            font: normal normal 300 14px/24px 'Noto Sans CJK TC';
            letter-spacing: 0px;
            color: #38470b;
        }
    }

    .room-reservation-price {
        padding-left: 33px;
        color: #38470b;
        text-align: center;

        p {
            margin-bottom: 10px;
            font-size: 20px;
        }

        span:nth-of-type(1) {
            font-size: 36px;
            margin-right: 19px;
        }

        span:nth-of-type(2) {
            margin-right: 19px;
        }

        button {
            width: 252px;
            margin-bottom: 50px;
        }
    }
</style>
