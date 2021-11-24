import { computed, ref } from '@vue/reactivity'

/**
 * calculate background style
 * @param room
 * @returns background style
 */
export default function useBackgroundStyle(room) {
    const currentBackground = ref(0)
    const backgroundOptions = computed(() =>
        room.value?.imageUrl?.map((item, index) => ({ id: index, url: item }))
    )
    const backgroundFormatOptions = computed(() =>
        backgroundOptions.value?.map(({ id }) => ({
            id,
            value: id,
        }))
    )
    const background = computed(() => {
        const data = backgroundOptions.value?.find(({ id }) => id == currentBackground.value)

        return `linear-gradient(180deg, #ffffff10, #fff), center / cover no-repeat url(${
            data?.url ?? ''
        })`
    })

    return {
        background,
        currentBackground,
        backgroundFormatOptions,
    }
}
