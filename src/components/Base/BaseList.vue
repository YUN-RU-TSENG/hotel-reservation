<template>
    <ul class="base-list" :style="{ fontSize: fontSize + 'px' }">
        <li
            v-for="(item, index) of list"
            :key="index"
            :style="{ marginBottom: space + 'px', paddingLeft: paddingLeft, backgroundPosition }"
        >
            <span>{{ item }}</span>
        </li>
    </ul>
</template>

<script>
    import { computed } from '@vue/reactivity'

    export default {
        name: 'BaseList',
        props: {
            list: { type: Array, requied: true },
            fontSize: { type: Number, default: 14 },
            space: { type: Number, default: 0 },
        },
        setup(props) {
            const backgroundPosition = computed(
                () => props.fontSize - 12 + 'px ' + (props.fontSize - 10) + 'px'
            )
            const paddingLeft = computed(() => props.fontSize + 2 + 'px ')

            return {
                backgroundPosition,
                paddingLeft,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .base-list {
        font-family: 'Noto Sans TC', sans-serif;
        font-weight: 300;
        color: #38470b;

        li {
            display: block;
            background-image: url(../../assets/images/dot.png);
            background-repeat: no-repeat;
        }
    }
</style>
