import { computed } from '@vue/reactivity'

export function useRoomGuest(room) {
    const roomGuest = computed(() =>
        room.descriptionShort.GuestMin === room.descriptionShort.GuestMax
            ? room.descriptionShort.GuestMin
            : room.descriptionShort.GuestMin + '~' + room.descriptionShort.GuestMax
    )
    return { roomGuest }
}
