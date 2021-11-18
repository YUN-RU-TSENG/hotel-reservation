<template>
    <!-- reserve-form -->
    <section class="reserve-form">
        <form @submit.prevent="submitForm">
            <label for="customer-name">姓名</label>
            <input id="customer-name" v-model.trim="form.name" type="text" required />
            <label for="customer-phone">手機號碼</label>
            <input id="customer-phone" v-model.trim="form.phone" type="tel" required />
            <label for="customer-begin-date">入住日期</label>
            <input id="customer-begin-date" v-model="form.beginDate" type="date" required />
            <label for="customer-end-date">退房日期</label>
            <input id="customer-end-date" v-model="form.endDate" type="date" required />
            <p class="total">
                {{ totalDates }} 天，{{ totalDates === 0 ? 0 : totalDates - 1 }} 晚平日
            </p>
            <div class="line"></div>
            <div class="price">
                <p>總計</p>
                <p>${{ totalPrice }}</p>
            </div>
            <button type="submit" :disabled="isSubmitingReserveForm">確認送出</button>
            <p class="tip">此預約系統僅預約功能，並不會對您進行收費</p>
        </form>
    </section>
    <!-- reserve-information -->
    <section class="reserve-information">
        <h2>
            <span>{{ room.name }}</span>
        </h2>
        <ul class="room-information">
            <li>
                {{ roomGuest }}人・ {{ room.descriptionShort.Bed[0] }} 床{{
                    room.amenities.Breakfast ? '・附早餐・' : '・'
                }}衛浴{{ room.descriptionShort['Private-Bath'] }}間・{{
                    room.descriptionShort.Footage
                }}
                平方公尺
            </li>
            <li>
                平日（一～四）價格：{{ room.normalDayPrice }} / 假日（五〜日）價格：{{
                    room.holidayPrice
                }}
            </li>
        </ul>
        <div class="room-feature row">
            <div v-for="item of amenities" :key="item.key" class="room-feature-item col">
                <SvgIcon :name="item[0]" width="30" height="30"></SvgIcon>
                <span>{{ featureChinese[item[0]] }}</span>
            </div>
        </div>
        <h3><span>訂房資訊</span></h3>
        <BaseList
            class="qa-list"
            :font-size="12"
            :space="10"
            :list="[
                '入住時間：最早' +
                    room.checkInAndOut.checkInEarly +
                    '，最晚' +
                    room.checkInAndOut.checkInLate +
                    '；退房時間：' +
                    room.checkInAndOut.checkOut +
                    '，請自行確認行程安排。',
                '平日定義週一至週四；假日定義週五至週日及國定假日。',
                '好室旅店全面禁止吸菸。',
                '若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00）',
            ]"
        />
        <h3><span>預約流程</span></h3>
        <div class="reserve row">
            <div class="reserve-item col">
                <div><SvgIcon name="note" width="32.65" height="32.65"></SvgIcon></div>
                <p>送出線上預約單</p>
            </div>
            <div class="reserve-item col">
                <div><SvgIcon name="arrow" width="7.46" height="14.24"></SvgIcon></div>
            </div>
            <div class="reserve-item col">
                <div><SvgIcon name="ask" width="32.65" height="32.65"></SvgIcon></div>
                <p>
                    系統立即回覆是否預訂成功 <br />
                    並以簡訊發送訂房通知 <br />
                    (若未收到簡訊請來電確認)
                </p>
            </div>
            <div class="reserve-item col">
                <div><SvgIcon name="arrow" width="7.46" height="14.24"></SvgIcon></div>
            </div>
            <div class="reserve-item col">
                <div><SvgIcon name="pay" width="32.65" height="32.65"></SvgIcon></div>
                <p>
                    入住當日憑訂房通知 <br />
                    以現金或刷卡付款即可 <br />
                    (僅接受VISA.JCB.銀聯卡)
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    import SvgIcon from '../SvgIcon.vue'
    import BaseList from '../Base/BaseList.vue'
    import useRoomGuest from '../../composables/roomPages/useRoomGuest'
    import { computed, ref, watchEffect } from 'vue'
    import dayjs from 'dayjs'

    export default {
        components: { SvgIcon, BaseList },
        props: {
            price: { type: Number, required: true },
            room: { type: Object, required: true },
            isSubmitingReserveForm: { type: Boolean, required: true },
            isShowReserveForm: { type: Boolean, required: true },
        },
        emits: ['submit-form', 'toggle-show'],
        setup(props, { emit }) {
            const { roomGuest } = useRoomGuest(props.room)
            const form = ref({
                name: '',
                phone: '',
                beginDate: null,
                endDate: null,
            })
            const totalDates = computed(() => {
                return form.value.beginDate && form.value.endDate
                    ? Math.abs(dayjs(form.value.beginDate).diff(dayjs(form.value.endDate), 'day'))
                    : 0
            })
            const totalDatesFormat = (begindate, enddate) => {
                const total = Math.abs(dayjs(begindate).diff(dayjs(enddate), 'day'))
                return Array(total)
                    .fill(0)
                    .map((_, index) => {
                        return dayjs(begindate).add(index, 'day').format('YYYY-MM-DD')
                    })
            }
            const totalPrice = computed(() => props.price * totalDates.value)
            const submitForm = () => {
                emit('submit-form', {
                    name: form.value.name,
                    tel: form.value.phone,
                    date: totalDatesFormat(form.value.beginDate, form.value.endDate),
                })
            }
            const amenities = computed(() =>
                Object.entries(props.room.amenities).filter((item) => item.value)
            )

            watchEffect(() => {
                if (props.isShowReserveForm === false)
                    form.value = {
                        name: '',
                        phone: '',
                        beginDate: null,
                        endDate: null,
                    }
            })

            return {
                form,
                totalPrice,
                totalDates,
                submitForm,
                amenities,
                roomGuest,
                featureChinese: {
                    'Wi-Fi': 'Wi-Fi',
                    Breakfast: '早餐',
                    'Mini-Bar': 'Mini Bar',
                    'Room-Service': 'Room service',
                    Television: '電視',
                    'Air-Conditioner': '空調',
                    Refrigerator: '冰箱',
                    Sofa: '沙發',
                    'Great-View': '漂亮的視野',
                    'Smoke-Free': '全面禁菸',
                    'Child-Friendly': '適合兒童',
                    'Pet-Friendly': '攜帶寵物',
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    //==============================================================================
    // reserve-form
    .reserve-form {
        flex: 0 1 40.45%;
        padding: 50px 65px 25px 65px;
        background: #38470b;

        form {
            font: normal normal normal 14px/20px 'Noto Sans TC';
            color: #ffffff;
        }

        label {
            display: block;
            margin-bottom: 7px;
        }

        input[type='text'],
        input[type='tel'],
        input[type='date'] {
            display: block;
            width: 100%;
            font: normal normal 600 16px/22px 'Open Sans';
            color: #6a6a6a;
            padding: 8px 10px;
            border: none;
            background: #fff;
            margin-bottom: 16px;
            &:focus {
                opacity: 0.9;
                outline: 1px dotted #fff;
            }
        }

        input[type='date']::-webkit-calendar-picker-indicator {
            display: block;
            background: url(../../assets/images/icons/triangle.svg) no-repeat center center;
            width: 20px;
            height: 20px;
            transform: rotate(180deg) scale(0.6, 0.4);
        }

        .total {
            font: normal normal normal 14px/20px Noto Sans TC;
            color: #949c7c;
            margin-bottom: 16px;
        }

        .line {
            background-color: #949c7c;
            height: 1px;
            margin-bottom: 16px;
        }

        .price {
            margin-bottom: 20px;
            text-align: right;

            p:nth-of-type(1) {
                font: normal normal medium 14px/20px 'Noto Sans TC';
            }

            p:nth-of-type(2) {
                font: normal normal 600 26px/36px 'Open Sans';
            }
        }

        .tip {
            text-align: center;
            font: normal normal normal 12px/18px 'Noto Sans TC';
        }

        button {
            display: block;
            width: 100%;
            padding: 9px 0px;
            border: 1px solid #ffffff;
            background-color: transparent;
            margin-bottom: 18px;
            color: #ffffff;
            cursor: pointer;
            &:hover {
                background-color: #ffffff10;
            }
            &:disabled {
                opacity: 0.5;
                border: 1px solid #411b1b;
                cursor: not-allowed;
            }
        }
    }

    //==============================================================================
    // reserve-information
    .reserve-information {
        padding: 51px 94px 25px 30px;
        flex: 0 1 59.55%;
        border: 1px solid #38470b;
        background-color: #fff;

        h2 {
            font: normal normal bold 24px/33px 'Open Sans';
            color: #38470b;
            margin-bottom: 8px;
            position: relative;

            &::before {
                content: '';
                display: block;
                width: 100%;
                top: 18px;
                position: absolute;
                height: 1px;
                background-color: #949c7c;
                z-index: 1;
            }
        }

        h2 span {
            position: relative;
            display: inline-block;
            background-color: #fff;
            padding-right: 6px;
            z-index: 2;
        }

        .qa-list {
            margin-bottom: 24px;
        }

        .room-information {
            font: normal normal normal 14px/22px 'Noto Sans TC';
            color: #38470b;
            margin-bottom: 27px;
            li {
                display: block;
            }
        }

        .room-feature {
            text-align: center;
            margin-bottom: 26px;
            padding: 0px 10px;
        }

        .room-feature.row {
            display: flex;
            flex-wrap: wrap;
            gap: normal 10px;
        }

        .room-feature-item {
            font: normal normal normal 12px/15px 'Noto Sans TC';
            color: #949c7c;
            svg {
                margin-bottom: 7px;
            }
            span {
                display: block;
                transform: scale(0.8);
                transform-origin: center;
            }
        }

        .room-feature-item.col {
            flex: 0 1 50px;
        }

        h3 {
            font: normal normal 500 16px/24px 'Noto Sans TC';
            color: #38470b;
            position: relative;
            margin-bottom: 19px;

            &:nth-of-type(1) {
                margin-bottom: 12px;
            }

            &::after {
                content: '';
                display: block;
                width: 100%;
                top: 12px;
                position: absolute;
                height: 1px;
                background-color: #949c7c;
                z-index: 1;
            }
        }

        h3 span {
            position: relative;
            z-index: 2;
            background-color: #fff;
            padding-right: 6px;
        }
        .reserve {
            font: normal normal normal 12px/18px 'Noto Sans TC';
        }

        .reserve.row {
            display: flex;
        }

        .reserve-item {
            text-align: center;

            &:nth-of-type(even) {
                padding-top: 9px;
            }

            &:nth-of-type(odd) {
                border-radius: 0px 0px 10px 10px;
                border: 1px solid #949c7c;
                div {
                    background-color: #949c7c;
                    padding: 9px 0;
                    margin-bottom: 12px;
                }
                p {
                    font: normal normal normal 12px/18px 'Noto Sans TC';
                    color: #38470b;
                }
            }
        }

        .reserve-item.col {
            min-height: 136px;

            &:nth-of-type(even) {
                flex: 0 1 31px;
            }

            &:nth-of-type(odd) {
                flex: 0 1 160px;
            }
        }
    }
</style>
