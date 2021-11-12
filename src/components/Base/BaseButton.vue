<template>
    <button class="base-button"><slot></slot></button>
</template>

<script>
    export default {
        name: 'BaseButton',
    }
</script>

<style lang="scss" scoped>
    .base-button {
        width: 100%;
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
</style>
