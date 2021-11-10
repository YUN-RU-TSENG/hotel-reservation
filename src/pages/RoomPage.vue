<template>
    <section class="room">
        <!-- rooom-reservation -->
        <section class="room-reservation">
            <div class="room-reservation-container">
                <!-- reservation-goback -->
                <a href class="room-reservation-goback"
                    ><SvgIcon name="icon15" width="8.31px" height="15.87px"></SvgIcon>
                    <span>查看其他房型</span>
                </a>
                <!-- reservation-price -->
                <section class="room-reservation-price">
                    <p>
                        <span>$1,380</span>
                        <span>/</span>
                        <span>1晚</span>
                    </p>
                    <button>Booking now</button>
                </section>
            </div>
        </section>
        <!-- rooom-introduce -->
        <section class="room-introduce">
            <p class="room-introduce-advertise">1人・ 單人床・ 附早餐・衛浴1間・18平方公尺</p>
            <ul class="room-introduce-time">
                <li>平日（一～四）價格：1380 / 假日（五〜日）價格：1500</li>
                <li>入住時間：15：00（最早）/ 21：00（最晚）</li>
                <li>退房時間：10：00</li>
            </ul>
            <ul class="room-introduce-service">
                <li><span>單人間僅供一位客人使用。</span></li>
                <li><span>臥室配有單人床和私人浴室。</span></li>
                <li>
                    <span>您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。</span>
                </li>
                <li><span>房間裡有AC，當然還有WiFi。</span></li>
            </ul>
            <section class="room-introduce-feature row">
                <div
                    v-for="item of [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
                    :key="item"
                    class="col"
                >
                    <div class="feature-item">
                        <div class="icon">
                            <SvgIcon :name="'icon' + item" width="40px" height="40px"></SvgIcon>
                            <p>早餐</p>
                        </div>
                        <div class="state">
                            <SvgIcon name="icon2" width="15px" height="15px"></SvgIcon>
                        </div>
                    </div>
                </div>
            </section>
            <h2></h2>
        </section>
    </section>
</template>

<script>
    import SvgIcon from '../components/SvgIcon.vue'

    export default {
        components: { SvgIcon },
    }
</script>

<style lang="scss" scoped>
    .room {
        display: flex;
    }

    .room-reservation {
        flex: 0 1 41.94%;
        background-image: linear-gradient(180deg, #ffffff10, #ffffff),
            url(../assets/images/room/room1.jpeg);
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
    }

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
        font: normal normal 300 14px/24px 'Noto Sans CJK TC';
        color: #38470b;
        text-align: center;

        p {
            margin-bottom: 15px;
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
            background-color: #38470b;
            font: normal normal 600 20px/27px 'Open Sans';
            color: #ffffff;
            padding: 8.5px 0;
            text-align: center;
            cursor: pointer;
            &:hover {
                background-color: #242e05;
            }
        }
    }

    // room-introduce
    .room-introduce {
        max-width: 665px;
        margin-left: 30px;
        padding-top: 133px;
        color: #38470b;
    }

    .room-introduce-advertise {
        text-align: right;
        margin-bottom: 47px;
        font-size: 14px;
        font-weight: normal;
    }

    .room-introduce-time {
        margin-bottom: 35px;
        font: normal normal normal 14px/24px 'Noto Sans CJK TC';

        li {
            display: block;
        }
    }

    .room-introduce-service {
        margin-bottom: 35px;
        font: normal normal 300 14px/24px 'Noto Sans CJK TC';

        li {
            display: block;
        }

        li::before {
            content: '・';
            vertical-align: middle;
        }
    }

    .room-introduce-feature {
        &.row {
            display: flex;
            flex-wrap: wrap;
        }

        .col {
            flex: 0 1 85px;
            padding: 0px 15px 25px 15px;
        }

        .feature-item {
            display: flex;

            .icon {
                flex: 0 1 68.34%;
                font-size: 12px;
                color: #949c7c;
                text-align: center;
            }

            .state {
                flex: 0 1 31.66%;
                padding-left: 4px;
            }
        }
    }
</style>
