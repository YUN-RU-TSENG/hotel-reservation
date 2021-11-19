<template>
    <!-- booking-form -->
    <section class="booking-form">
        <form @submit.prevent="submitForm">
            <label for="customer-name">姓名</label>
            <input id="customer-name" v-model.trim="name" type="text" />
            <p class="field-error">{{ nameError }}</p>
            <label for="customer-phone">手機號碼</label>
            <input id="customer-phone" v-model.trim="phone" type="tel" />
            <p class="field-error">{{ phoneError }}</p>
            <label for="customer-begin-date">入住日期</label>
            <input id="customer-begin-date" v-model="beginDate" type="date" />
            <p class="field-error">{{ beginDateError }}</p>
            <label for="customer-end-date">退房日期</label>
            <input id="customer-end-date" v-model="endDate" type="date" />
            <p class="field-error">{{ endDateError }}</p>
            <p class="total">
                {{ totalStayDays.length }} 天，{{ totalStayNormalDaysLength }} 晚平日
            </p>
            <div class="line"></div>
            <div class="price">
                <p>總計</p>
                <p>${{ totalPrice }}</p>
            </div>
            <button type="submit">確認送出</button>
            <p class="tip">此預約系統僅預約功能，並不會對您進行收費</p>
        </form>
    </section>
    <!-- booking-information -->
    <section class="booking-information">
        <h2 class="booking-title">
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
        <div class="room-amenities row">
            <div v-for="item of amenities" :key="item.key" class="room-amenities-item col">
                <SvgIcon :name="item[0]" width="30" height="30"></SvgIcon>
                <span>{{ amenitiesChinese[item[0]] }}</span>
            </div>
        </div>
        <h3 class="booking-title"><span>訂房資訊</span></h3>
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
        <h3 class="booking-title"><span>預約流程</span></h3>
        <div class="booking row">
            <div class="booking-item col">
                <div><SvgIcon name="note" width="32.65" height="32.65"></SvgIcon></div>
                <p>送出線上預約單</p>
            </div>
            <div class="booking-item col">
                <div><SvgIcon name="arrow" width="7.46" height="14.24"></SvgIcon></div>
            </div>
            <div class="booking-item col">
                <div><SvgIcon name="ask" width="32.65" height="32.65"></SvgIcon></div>
                <p>
                    系統立即回覆是否預訂成功 <br />
                    並以簡訊發送訂房通知 <br />
                    (若未收到簡訊請來電確認)
                </p>
            </div>
            <div class="booking-item col">
                <div><SvgIcon name="arrow" width="7.46" height="14.24"></SvgIcon></div>
            </div>
            <div class="booking-item col">
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
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    import useRoomPrice from '../../composables/room/useRoomPrice'
    import useRoomGuest from '../../composables/room/useRoomGuest'
    import useTotalStayDays from '../../composables/room/useTotalStayDays'
    import useForm from '../../composables/room/useForm'
    import api from '../../API/api'

    export default {
        components: { SvgIcon, BaseList },
        props: {
            room: { type: Object, required: true },
        },
        emits: ['submit-form', 'update:show'],
        setup(props, { emit }) {
            const route = useRoute()
            const {
                name,
                phone,
                beginDate,
                endDate,
                nameError,
                phoneError,
                beginDateError,
                endDateError,
                handleSubmit,
            } = useForm()
            const { roomPrice } = useRoomPrice(props.room)
            const { roomGuest } = useRoomGuest(props.room)
            const { totalStayDays, totalStayNormalDaysLength, totalPrice } = useTotalStayDays(
                beginDate,
                endDate,
                props
            )

            const amenities = computed(() =>
                Object.entries(props.room.amenities).filter((item) => item[1])
            )

            const submitForm = handleSubmit(async () => {
                try {
                    await api.post(`/room/${route.params.id}`, {
                        name: name.value,
                        tel: phone.value,
                        date: totalStayDays.value,
                    })

                    emit('submit-form', {
                        isSuccess: true,
                        message: '成功預訂',
                    })
                } catch (error) {
                    emit('submit-form', {
                        isSuccess: false,
                        message: error?.response?.data?.message || '異常錯誤',
                    })
                } finally {
                    emit('update:show', false)
                    name.value = ''
                    phone.value = ''
                    beginDate.value = ''
                    endDate.value = ''
                }
            })

            return {
                name,
                phone,
                beginDate,
                endDate,
                totalStayDays,
                totalStayNormalDaysLength,
                totalPrice,
                roomGuest,
                roomPrice,
                nameError,
                phoneError,
                beginDateError,
                endDateError,
                submitForm,
                amenities,
                amenitiesChinese: {
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
    //====================
    // booking-form
    .booking-form {
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

        .field-error {
            font: normal normal normal 12px/20px 'Noto Sans TC';
            color: #f58787;
            margin-bottom: 12px;
        }

        .total {
            font: normal normal normal 14px/20px 'Noto Sans TC';
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

    //====================
    // booking-information
    .booking-information {
        padding: 51px 94px 25px 30px;
        flex: 0 1 59.55%;
        border: 1px solid #38470b;
        background-color: #fff;

        .booking-title {
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

            span {
                position: relative;
                display: inline-block;
                background-color: #fff;
                padding-right: 6px;
                z-index: 2;
            }
        }

        h2.booking-title {
            font: normal normal bold 24px/33px 'Open Sans';
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

        .room-amenities {
            text-align: center;
            margin-bottom: 26px;
            padding: 0px 10px;
        }

        .room-amenities.row {
            display: flex;
            flex-wrap: wrap;
            gap: normal 10px;
        }

        .room-amenities-item {
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

        .room-amenities-item.col {
            flex: 0 1 50px;
        }

        h3.booking-title {
            font: normal normal 500 16px/24px 'Noto Sans TC';
            &::before {
                top: 12px;
            }
        }

        .booking {
            font: normal normal normal 12px/18px 'Noto Sans TC';
        }

        .booking.row {
            display: flex;
        }

        .booking-item {
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

        .booking-item.col {
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
