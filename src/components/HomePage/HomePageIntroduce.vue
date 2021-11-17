<template>
    <img class="introduce-image" src="../../assets/images/logo.png" alt="logo house hotel" />
    <section class="introduce-text">
        <p><strong>好室旅店。HOUSE HOTEL</strong></p>
        <p>花蓮縣花蓮市國聯一路1號</p>
        <p>03-8321155</p>
        <p>HOUSE@HOTEL.COM</p>
    </section>
    <slot></slot>
</template>

<script>
    export default {
        name: 'HomePageIntroduce',
    }
</script>

<style lang="scss" scoped>
    .introduce-text {
        margin-left: -9px;
        margin-bottom: 51px;

        strong {
            font-weight: normal;
        }

        p {
            color: #fff;
            font: normal normal 300 12px/18px Noto Sans TC;
            &:nth-of-type(1) {
                margin-bottom: 16px;
                font-weight: normal;
            }
            &:nth-of-type(2) {
                margin-bottom: 6px;
            }
            &:nth-of-type(3) {
                margin-bottom: 6px;
            }
        }
    }

    .introduce-image {
        width: 141px;
        margin-bottom: 185.22px;
    }
</style>
