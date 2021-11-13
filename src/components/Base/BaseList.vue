<template>
    <ul class="base-list">
        <li v-for="(item, index) of list" :key="index">
            <span>{{ item }}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'BaseList',
        props: { list: { type: Array, requied: true } },
    }
</script>

<style lang="scss" scoped>
    .base-list {
        font: normal normal 300 14px/24px 'Noto Sans CJK TC';

        li {
            display: block;
            padding-left: 20px;
            background-image: url(../../assets/images/dot.png);
            background-repeat: no-repeat;
            background-position: 0 5px;
        }
    }
</style>
