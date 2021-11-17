<template>
    <!-- submit-result- -->
    <section class="submit-result">
        <SvgIcon :name="result" width="124.46" height="157.71"></SvgIcon>
        <template v-if="result === 'fail'">
            <h2>預約失敗</h2>
            <p>哎呀！晚了一步！您預約的日期已經被預約走了， 再看看其它房型吧</p>
        </template>
        <template v-if="result === 'success'">
            <h2>預約成功</h2>
            <p>
                請留意簡訊發送訂房通知，入住當日務必出示此訂房通知， 若未收到簡訊請來電確認，謝謝您
            </p>
        </template>
    </section>
</template>

<script>
    import SvgIcon from '../SvgIcon.vue'

    export default {
        components: { SvgIcon },
        props: {
            result: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style lang="scss" scoped>
    .submit-result {
        padding: 125px 0 114px 0px;
        background-color: #38470b;
        text-align: center;

        > *:not(:last-child) {
            margin-bottom: 41px;
        }

        h2 {
            font: normal normal 500 50px/74px 'Noto Sans TC';
            color: #ffffff;
        }

        p {
            font: normal normal 300 18px/30px 'Noto Sans TC';
            letter-spacing: 0px;
            color: #ffffff;
            max-width: 396px;
            margin: auto;
        }
    }
</style>
