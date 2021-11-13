<template>
    <!-- room-introduce-advertise -->
    <p class="room-introduce-advertise">1人・ 單人床・ 附早餐・衛浴1間・18平方公尺</p>
    <!-- room-introduce-time -->
    <ul class="room-introduce-time">
        <li>
            平日（一～四）價格：{{ room.normalDayPrice }} / 假日（五〜日）價格：{{
                room.holidayPrice
            }}
        </li>
        <li>
            入住時間：{{ formatTime(room.checkInAndOut.checkInEarly) }}（最早）/
            {{ formatTime(room.checkInAndOut.checkInLate) }}（最晚）
        </li>
        <li>退房時間：{{ formatTime(room.checkInAndOut.checkOut) }}</li>
    </ul>
    <!-- room-introduce-service -->
    <BaseList class="room-introduce-service" :list="introduceList"></BaseList>
    <!-- room-introduce-feature -->
    <section class="room-introduce-feature row">
        <div v-for="item of amenities" :key="item" class="col">
            <div class="feature-item" :style="{ opacity: item[1] ? 1 : 0.2 }">
                <div class="icon">
                    <SvgIcon :name="item[0]" width="40px" height="40px"></SvgIcon>
                    <p>{{ featureChinese[item[0]] }}</p>
                </div>
                <div class="state">
                    <SvgIcon name="icon2" width="15px" height="15px"></SvgIcon>
                </div>
            </div>
        </div>
    </section>
    <h2></h2>
</template>

<script>
    import SvgIcon from '../SvgIcon.vue'
    import BaseList from '../Base/BaseList.vue'

    export default {
        components: { SvgIcon, BaseList },
        props: { room: { type: Object, required: true } },
        setup(props) {
            const introduceList = props.room.description.split('. ')
            const amenities = Object.entries(props.room.amenities)

            const formatTime = (time) => {
                return time.replace(/(\d{2})(:)(\d{2})/g, '$1：$3')
            }

            return {
                introduceList,
                amenities,
                formatTime,
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
    // rroom-introduce-advertise
    .room-introduce-advertise {
        text-align: right;
        margin-bottom: 47px;
        font-size: 14px;
        font-weight: normal;
    }

    //==============================================================================
    // room-introduce-time
    .room-introduce-time {
        margin-bottom: 35px;
        font: normal normal normal 14px/24px 'Noto Sans CJK TC';

        li {
            display: block;
        }
    }

    //==============================================================================
    // room-introduce-service
    .room-introduce-service {
        margin-bottom: 35px;
    }

    //==============================================================================
    // room-introduce-feature
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
