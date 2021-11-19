<template>
    <!-- room-popover -->
    <section v-show="show" class="room-popover">
        <div class="room-popover-container">
            <button class="room-popover-close" @click="$emit('update:show', false)">
                <SvgIcon name="icons8" width="12.8" height="12.8"></SvgIcon>
            </button>
            <slot></slot>
        </div>
    </section>
</template>

<script>
    import SvgIcon from '../SvgIcon.vue'

    export default {
        components: { SvgIcon },
        props: {
            show: { type: Boolean, required: true },
        },
        emits: ['update:show'],
    }
</script>

<style lang="scss" scoped>
    //====================
    // room-popover
    .room-popover {
        background: #ffffff50 0% 0% no-repeat padding-box;
        backdrop-filter: blur(20px);
        min-height: 100vh;
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 99;
    }

    //====================
    // room-popover-container
    .room-popover-container {
        position: relative;
        width: 80.52%;
        max-width: 1100px;
        padding-top: 84px;
        margin: 0 auto;
    }

    // room-popover-close
    .room-popover-close {
        position: absolute;
        padding: 10px;
        top: 116.86px;
        right: 28.86px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
</style>
