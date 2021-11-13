<template>
    <section class="datepicker">
        <div class="datepicker-current">
            <button class="datepicker-reset" data-test="reset" @click="reset">
                <SvgIcon name="reset" width="20" height="20"></SvgIcon>
            </button>
            <div class="month">
                <button
                    class="begin-left"
                    data-test="subtract-begin-month"
                    @click="subtractMonth('begin')"
                >
                    <SvgIcon name="icon15" width="6.24" height="10.67"></SvgIcon>
                </button>
                <button class="begin-right" data-test="add-begin-month" @click="addMonth('begin')">
                    <SvgIcon name="icon15" width="6.24" height="10.67"></SvgIcon>
                </button>
                <h2 data-test="begin-month">{{ beginMonthFormat }}</h2>
            </div>
            <div class="week">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
            </div>
            <div class="date">
                <div v-for="(_, index) of beginMonthFlexItem" :key="index"></div>
                <div
                    v-for="date of beginMonthDates"
                    :key="date.date"
                    :class="dateStyle(date.year, date.month, date.date)"
                    data-test="date"
                    @click="changeSeletDate(date.year, date.month, date.date)"
                >
                    <span>{{ date.date }}</span>
                </div>
            </div>
        </div>
        <div class="datepicker-next">
            <div class="month">
                <button
                    class="end-left"
                    data-test="subtract-end-month"
                    @click="subtractMonth('end')"
                >
                    <SvgIcon name="icon15" width="6.24" height="10.67"></SvgIcon>
                </button>
                <button class="end-right" data-test="add-end-month" @click="addMonth('end')">
                    <SvgIcon
                        name="icon15"
                        width="6.24"
                        height="10.67"
                        data-test="subtract-end-month"
                    ></SvgIcon>
                </button>
                <h2 data-test="end-month">{{ endMonthFormat }}</h2>
            </div>
            <div class="week">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
            </div>
            <div class="date">
                <div v-for="(_, index) of endMonthFlexItem" :key="index"></div>
                <div
                    v-for="date of endMonthDates"
                    :key="date.date"
                    :class="dateStyle(date.year, date.month, date.date)"
                    @click="changeSeletDate(date.year, date.month, date.date)"
                >
                    <span>{{ date.date }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import SvgIcon from '../SvgIcon.vue'
    import { computed, ref } from 'vue'
    import dayjs from 'dayjs'
    import isBetween from 'dayjs/plugin/isBetween'
    import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
    dayjs.extend(isBetween)
    dayjs.extend(isSameOrBefore)

    export default {
        components: {
            SvgIcon,
        },
        setup() {
            const beginDate = ref(null)
            const beginDateFormat = computed(() =>
                beginDate.value ? beginDate.value.format('YYYY-MM-DD') : ''
            )
            const endDate = ref(null)
            const endDateFormat = computed(() =>
                endDate.value ? endDate.value.format('YYYY-MM-DD') : ''
            )

            // 更換選擇日期期間
            const changeSeletDate = (year, month, date) => {
                if (!dayjs(new Date(year, month, date)).isAfter(dayjs(new Date()))) return
                if (beginDate.value && endDate.value) {
                    endDate.value = null
                    beginDate.value = dayjs(new Date(year, month, date))
                    return
                } else if (!beginDate.value && !endDate.value) {
                    beginDate.value = dayjs(new Date(year, month, date))
                    return
                }

                if (dayjs(new Date(year, month, date)).isSameOrBefore(beginDate.value)) return
                endDate.value = dayjs(new Date(year, month, date))
            }

            //=====================================================
            // 今天
            const today = dayjs(new Date())

            // 一個月長度
            const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

            const beginMonth = ref(null)
            beginMonth.value = dayjs(new Date(today.year(), today.month(), 1))
            const beginMonthFormat = computed(() => beginMonth.value.format('MMMM YYYY'))

            const endMonth = ref(null)
            endMonth.value = beginMonth.value.add(1, 'month')
            const endMonthFormat = computed(() => endMonth.value.format('MMMM YYYY'))

            // 減少月份
            const subtractMonth = (type) => {
                if (type === 'end') {
                    if (!endMonth.value.subtract(1, 'month').isAfter(beginMonth.value)) return
                    return (endMonth.value = endMonth.value.subtract(1, 'month'))
                } else if (type === 'begin') {
                    return (beginMonth.value = beginMonth.value.subtract(1, 'month'))
                }
            }

            // 增加月份
            const addMonth = (type) => {
                if (type === 'begin') {
                    if (!beginMonth.value.add(1, 'month').isBefore(endMonth.value)) return
                    return (beginMonth.value = beginMonth.value.add(1, 'month'))
                } else if (type === 'end') {
                    return (endMonth.value = endMonth.value.add(1, 'month'))
                }
            }

            // 重置
            const reset = () => {
                beginMonth.value = dayjs(new Date(today.year(), today.month(), 1))
                endMonth.value = beginMonth.value.add(1, 'month')
                beginDate.value = null
                endDate.value = null
            }

            const calculateCurrentMonthDates = (month) => {
                return Array(daysInMonth(month.value.year(), month.value.month() + 1))
                    .fill(0)
                    .map((_, index) => {
                        const firstDate = dayjs(
                            new Date(month.value.year(), month.value.month(), 1)
                        )
                        return {
                            date: firstDate.add(index, 'day').date(),
                            day: firstDate.add(index, 'day').day(),
                            month: firstDate.month(),
                            year: firstDate.add(index, 'day').year(),
                        }
                    })
            }

            // 計算展示需要填充的 flex 項目數量
            const calculateFlexItem = (month) => {
                const length =
                    dayjs(new Date(month.value.year(), month.value.month(), 1)).day() >= 1
                        ? dayjs(new Date(month.value.year(), month.value.month(), 1)).day() - 1
                        : 0
                return Array(length).fill(0)
            }

            // 算出這個月的月份、所有日期隨月份更動
            const beginMonthDates = computed(() => calculateCurrentMonthDates(beginMonth))
            const beginMonthFlexItem = computed(() => calculateFlexItem(beginMonth))

            // 算出下個月的月份、所有日期隨月份更動
            const endMonthDates = computed(() => calculateCurrentMonthDates(endMonth))
            const endMonthFlexItem = computed(() => calculateFlexItem(endMonth))

            //=====================================================
            // date style class
            const dateStyle = (year, month, date) => {
                if (!beginDate.value && !endDate.value) {
                    return { over: dayjs(new Date(year, month, date)).isBefore(today) }
                }
                return {
                    begin: dayjs(new Date(year, month, date)).isSame(beginDate.value),
                    end: dayjs(new Date(year, month, date)).isSame(endDate.value),
                    range: dayjs(new Date(year, month, date)).isBetween(
                        beginDate.value,
                        endDate.value
                    ),
                    over: dayjs(new Date(year, month, date)).isBefore(today),
                }
            }

            return {
                beginDate,
                beginDateFormat,
                endDate,
                endDateFormat,
                beginMonth,
                beginMonthFormat,
                beginMonthDates,
                beginMonthFlexItem,
                endMonth,
                endMonthFormat,
                endMonthFlexItem,
                endMonthDates,
                subtractMonth,
                addMonth,
                changeSeletDate,
                dateStyle,
                reset,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .datepicker {
        display: flex;
        width: 635px;
        position: relative;
        padding: 27px 33px 30px 33px;
        gap: normal 10px;
        box-shadow: 0px 2px 6px #0000000a;
        border: 1px solid #38470b;
    }

    .datepicker-reset {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 12px;
        cursor: pointer;
        background-color: transparent;
        border: none;
        color: #38470b;
    }

    .datepicker-current,
    .datepicker-next {
        flex: 1 1 50%;
    }

    .month {
        position: relative;
        margin-bottom: 24px;

        button {
            border: none;
            background-color: transparent;
            cursor: pointer;
            position: absolute;
            font-size: 0;
        }

        button.begin-left {
            left: -12px;
            top: 1px;
            border: none;
        }

        button.begin-right {
            right: 0px;
            top: 1px;
            transform: rotate(180deg);
        }

        button.end-left {
            left: 0px;
            top: 1px;
            border: none;
        }
        button.end-right {
            right: -12px;
            top: 1px;
            transform: rotate(180deg);
        }

        h2 {
            text-align: center;
            font: normal normal bold 12px/17px Open Sans;
            color: #38470b;
        }
    }

    .week {
        display: flex;
        margin-bottom: 14px;
        justify-content: flex-start;
        padding-bottom: 14px;
        font: normal normal bold 12px/17px 'Open Sans';
        color: #38470b50;
        border-bottom: 1px solid #38470b10;
        text-align: center;
        span {
            flex: 0 0 calc(100% / 7);
        }
    }

    .date {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        font: normal normal normal 11px/18px 'Open Sans';
        color: #38470b;
        text-align: center;
        gap: 5px normal;
        overflow: hidden;

        > div {
            flex: 0 0 calc(278.5px / 7);
            position: relative;
            height: calc(278.5px / 7);
            cursor: pointer;
            transition: all 0.3s ease;
            transform: scale(0.8);
            background-color: transparent;
        }
        > div.begin {
            z-index: 1;
        }

        > div.begin + .end {
            box-shadow: -30px 0px 0px 0px #ccd3b3, inset 30px 0px 0px 0px #ccd3b3;
        }

        > div.begin + .range {
            box-shadow: -30px 0px 0px 0px #ccd3b3, inset -30px 0px 0px 0px #ccd3b3,
                30px 0px 0px 0px #ccd3b3, inset -30px 0px 0px 0px #ccd3b3;
        }

        > div.range {
            box-shadow: 30px 0px 0px 0px #ccd3b3, inset -30px 0px 0px 0px #ccd3b3;
        }

        span {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 30px;
            background: #fff;
        }

        span::before {
            content: '';
            display: inline-block;
            height: 100%;
            vertical-align: middle;
        }

        span:hover,
        .begin span {
            background-color: #38470b;
            color: #fff;
        }

        .end span {
            background-color: #949c7c;
            color: #fff;
        }

        .range span {
            background-color: #ccd3b3;
            border-radius: 0px;
        }

        .over span {
            color: #38470b30;
            text-decoration: line-through;
            &:hover {
                background-color: #38470b10;
            }
        }
    }
</style>
