<template>
    <form class="base-carousel-indicators">
        <label v-for="option of options" :key="option.id" :for="name + '-' + option.id">
            <input
                :id="name + '-' + option.id"
                :checked="option.value === modelValue"
                type="radio"
                :name="name"
                :value="option.value"
                @change="$emit('update:modelValue', $event.target.value)"
            />
            <span></span>
        </label>
    </form>
</template>

<script>
    export default {
        name: 'BaseCarouselIndicators',
        props: {
            options: { type: Object, required: true },
            modelValue: { required: true },
            name: { type: String, required: true },
        },
        emits: ['update:modelValue'],
    }
</script>

<style lang="scss" scoped>
    .base-carousel-indicators {
        text-align: center;
        font-size: 0;

        label {
            display: inline-block;
            font-size: 0;
            cursor: pointer;
            margin-right: 12px;
            &:last-child {
                margin-right: 0;
            }
        }

        input {
            display: none;
        }

        input:hover ~ span {
            background-color: rgba(255, 255, 255, 0.45);
        }

        input:checked ~ span {
            background-color: #fff;
        }

        span {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-color: transparent;
            border-radius: 12px;
            border: 1px solid #fff;
        }
    }
</style>
