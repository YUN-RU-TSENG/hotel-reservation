<template>
    <section class="datepicker">
        <!-- datepicker-reset button for reset -->
        <button class="datepicker-reset" data-test="reset" @click="resetDatePicker">
            <SvgIcon name="reset" width="20" height="20"></SvgIcon>
        </button>
        <!-- datepicker-begin -->
        <div class="datepicker-begin">
            <!-- month -->
            <div class="month">
                <button
                    class="subtract-begin-month"
                    data-test="subtract-begin-month"
                    @click="subtractMonth('begin')"
                >
                    <SvgIcon name="icon15" width="6.24" height="10.67"></SvgIcon>
                </button>
                <button
                    class="add-begin-month"
                    data-test="add-begin-month"
                    @click="addMonth('begin')"
                >
                    <SvgIcon name="icon15" width="6.24" height="10.67"></SvgIcon>
                </button>
                <h2 data-test="begin-month">{{ beginMonthFormat }}</h2>
            </div>
            <!-- week -->
            <div class="week">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
            </div>
            <!-- date -->
            <div class="date row">
                <div v-for="(_, index) of beginMonthFlexItem" :key="index" class="col"></div>
                <div
                    v-for="date of beginMonthDates"
                    :key="date.date"
                    class="col"
                    :class="dateStyle(date.year, date.month, date.date)"
                    data-test="date"
                    @click="changeSeletDate(date.year, date.month, date.date)"
                >
                    <span>{{ date.date }}</span>
                </div>
            </div>
        </div>
        <!-- datepicker-end -->
        <div class="datepicker-end">
            <!-- month -->
            <div class="month">
                <button
                    class="subtract-end-month"
                    data-test="subtract-end-month"
                    @click="subtractMonth('end')"
                >
                    <SvgIcon name="icon15" width="6.24" height="10.67"></SvgIcon>
                </button>
                <button class="add-end-month" data-test="add-end-month" @click="addMonth('end')">
                    <SvgIcon
                        name="icon15"
                        width="6.24"
                        height="10.67"
                        data-test="subtract-end-month"
                    ></SvgIcon>
                </button>
                <h2 data-test="end-month">{{ endMonthFormat }}</h2>
            </div>
            <!-- week -->
            <div class="week">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
            </div>
            <!-- date -->
            <div class="date row">
                <div v-for="(_, index) of endMonthFlexItem" :key="index" class="col"></div>
                <div
                    v-for="date of endMonthDates"
                    :key="date.date"
                    class="col"
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
    import arraySupport from 'dayjs/plugin/arraySupport'

    dayjs.extend(isBetween)
    dayjs.extend(isSameOrBefore)
    dayjs.extend(arraySupport)

    export default {
        components: {
            SvgIcon,
        },
        setup() {
            const today = dayjs()
            const { beginDate, beginDateFormat, endDate, endDateFormat, changeSeletDate } =
                useSelectDates()
            const {
                beginMonth,
                beginMonthFormat,
                beginMonthDates,
                endMonth,
                endMonthDates,
                addMonth,
                subtractMonth,
                endMonthFormat,
            } = useMonth()

            const resetDatePicker = () => {
                beginMonth.value = dayjs([today.year(), today.month(), 1])
                endMonth.value = beginMonth.value.add(1, 'month')
                beginDate.value = null
                endDate.value = null
            }

            // calculate style class
            const calculateFlexItem = (month) => {
                const firstDay = dayjs([month.value.year(), month.value.month(), 1]).day()
                return firstDay >= 1 ? Array(firstDay - 1).fill(0) : []
            }

            const beginMonthFlexItem = computed(() => calculateFlexItem(beginMonth))
            const endMonthFlexItem = computed(() => calculateFlexItem(endMonth))

            const dateStyle = (year, month, date) => {
                const currentDate = dayjs([year, month, date])

                return !beginDate.value && !endDate.value
                    ? {
                          over: currentDate.isBefore(today),
                      }
                    : {
                          begin: currentDate.isSame(beginDate.value),
                          end: currentDate.isSame(endDate.value),
                          range: currentDate.isBetween(beginDate.value, endDate.value),
                          over: currentDate.isBefore(today),
                      }
            }

            return {
                beginDate,
                beginDateFormat,
                endDate,
                endDateFormat,
                changeSeletDate,
                beginMonth,
                beginMonthFormat,
                beginMonthDates,
                endMonth,
                endMonthDates,
                addMonth,
                subtractMonth,
                endMonthFormat,
                beginMonthFlexItem,
                endMonthFlexItem,
                dateStyle,
                resetDatePicker,
            }
        },
    }

    function useMonth() {
        const today = dayjs()
        const beginMonth = ref(dayjs([today.year(), today.month(), 1]))
        const endMonth = ref(beginMonth.value.add(1, 'month'))

        const formatMonth = (time) => time.value.format('MMMM YYYY')
        const beginMonthFormat = computed(() => formatMonth(beginMonth))
        const endMonthFormat = computed(() => formatMonth(endMonth))

        const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

        /** subtract month
         * @param {string} type - 'begin' or 'end', that represent the month to be calculated
         */
        const subtractMonth = (type) => {
            if (type === 'begin') {
                return (beginMonth.value = beginMonth.value.subtract(1, 'month'))
            }
            if (type === 'end' && endMonth.value.subtract(1, 'month').isAfter(beginMonth.value)) {
                return (endMonth.value = endMonth.value.subtract(1, 'month'))
            }
        }

        /** add month
         * @param {string} type - 'begin' or 'end', that represent the month to be calculated
         */
        const addMonth = (type) => {
            if (type === 'begin' && beginMonth.value.add(1, 'month').isBefore(endMonth.value)) {
                return (beginMonth.value = beginMonth.value.add(1, 'month'))
            }
            if (type === 'end') {
                return (endMonth.value = endMonth.value.add(1, 'month'))
            }
        }

        /** calculate dates in month
         * @param month - month to be calculated
         */
        const calculateCurrentMonthDates = (month) => {
            return Array(daysInMonth(month.value.year(), month.value.month() + 1))
                .fill(0)
                .map((_, index) => {
                    const firstDate = dayjs([month.value.year(), month.value.month(), 1])
                    return {
                        date: firstDate.add(index, 'day').date(),
                        month: firstDate.month(),
                        year: firstDate.add(index, 'day').year(),
                    }
                })
        }

        const beginMonthDates = computed(() => calculateCurrentMonthDates(beginMonth))
        const endMonthDates = computed(() => calculateCurrentMonthDates(endMonth))

        return {
            beginMonth,
            beginMonthFormat,
            beginMonthDates,
            endMonth,
            endMonthDates,
            addMonth,
            subtractMonth,
            endMonthFormat,
        }
    }

    function useSelectDates() {
        const today = dayjs()
        const beginDate = ref(null)
        const endDate = ref(null)

        const formateDate = (date) => {
            return date.value ? date.value.format('YYYY-MM-DD') : ''
        }

        const beginDateFormat = computed(() => formateDate(beginDate))
        const endDateFormat = computed(() => formateDate(endDate))

        /** change selected date
         * @param {number} year
         * @param {number} month
         * @param {number} date
         */
        const changeSeletDate = (year, month, date) => {
            const selectedDate = dayjs([year, month, date])

            if (!selectedDate.isAfter(today)) return
            if (!beginDate.value && !endDate.value) {
                beginDate.value = selectedDate
                return
            }
            if (beginDate.value && endDate.value) {
                endDate.value = null
                beginDate.value = selectedDate
                return
            }

            if (!selectedDate.isSameOrBefore(beginDate.value)) endDate.value = selectedDate
        }

        return {
            beginDate,
            beginDateFormat,
            endDate,
            endDateFormat,
            changeSeletDate,
        }
    }
</script>

<style lang="scss" scoped>
    // datepicker
    .datepicker {
        display: flex;
        width: 635px;
        position: relative;
        padding: 27px 33px 30px 33px;
        gap: normal 10px;
        box-shadow: 0px 2px 6px #0000000a;
        border: 1px solid #38470b;
    }

    // datepicker-reset
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

    // datepicker-begin, datepicker-end
    .datepicker-begin,
    .datepicker-end {
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

            &.subtract-begin-month {
                left: -12px;
                top: 1px;
                border: none;
            }

            &.add-begin-month {
                right: 0px;
                top: 1px;
                transform: rotate(180deg);
            }

            &.subtract-end-month {
                left: 0px;
                top: 1px;
                border: none;
            }

            &.add-end-month {
                right: -12px;
                top: 1px;
                transform: rotate(180deg);
            }
        }

        h2 {
            text-align: center;
            font: normal normal bold 12px/17px Open Sans;
            color: #38470b;
        }
    }

    // week
    .week {
        display: flex;
        margin-bottom: 14px;
        padding-bottom: 14px;
        font: normal normal bold 12px/17px 'Open Sans';
        color: #38470b50;
        border-bottom: 1px solid #38470b10;
        text-align: center;

        span {
            flex: 0 1 calc(100% / 7);
        }
    }

    // date
    .date {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        font: normal normal normal 11px/18px 'Open Sans';
        color: #38470b;
        text-align: center;
        overflow: hidden;

        .col {
            flex: 0 1 calc(100% / 7);
            position: relative;
            height: calc(278.5px / 7);
            cursor: pointer;
            transition: all 0.3s ease;
            transform: scale(0.8);
            background-color: transparent;

            // begin date style
            &.begin {
                z-index: 1;
                span:hover,
                span {
                    background-color: #38470b;
                    color: #fff;
                }
            }

            // end date range
            &.begin + .end {
                box-shadow: -30px 0px 0px 0px #ccd3b3, inset 30px 0px 0px 0px #ccd3b3;
            }

            &.end {
                span {
                    background-color: #949c7c;
                    color: #fff;
                }
            }

            // first range date style
            &.begin + .range {
                box-shadow: -30px 0px 0px 0px #ccd3b3, inset -30px 0px 0px 0px #ccd3b3,
                    30px 0px 0px 0px #ccd3b3, inset -30px 0px 0px 0px #ccd3b3;
            }

            // range date style
            &.range {
                box-shadow: 30px 0px 0px 0px #ccd3b3, inset -30px 0px 0px 0px #ccd3b3;
                span {
                    background-color: #ccd3b3;
                    border-radius: 0px;
                }
            }

            // over date style
            &.over {
                span {
                    color: #38470b30;
                    text-decoration: line-through;
                    &:hover {
                        background-color: #38470b10;
                    }
                }
            }
        }

        span {
            display: block;
            height: 100%;
            border-radius: 30px;

            &::before {
                content: '';
                display: inline-block;
                height: 100%;
                vertical-align: middle;
            }
        }
    }
</style>
