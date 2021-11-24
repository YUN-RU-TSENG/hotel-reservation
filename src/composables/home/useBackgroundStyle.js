import { ref, computed } from 'vue'
import bg1 from '../../assets/images/house/bg1.png'
import bg2 from '../../assets/images/house/bg2.png'
import bg3 from '../../assets/images/house/bg3.png'
import bg4 from '../../assets/images/house/bg4.png'

export default function useBackgroundStyle() {
    const backgroundIndex = ref(0)
    const backgroundOptions = [
        { id: 0, url: bg1 },
        { id: 1, url: bg2 },
        { id: 2, url: bg3 },
        { id: 3, url: bg4 },
    ]
    const backgroundFormatOptions = backgroundOptions.map((item) => ({
        id: item.id,
        value: item.id,
    }))

    const background = computed(() => {
        const url = backgroundOptions.find((item) => item.id == backgroundIndex.value)
        return `linear-gradient(#00000060, #00000060), url(${url.url}) center / cover no-repeat`
    })

    return {
        backgroundIndex,
        background,
        backgroundFormatOptions,
    }
}
