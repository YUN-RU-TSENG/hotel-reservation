import { computed } from '@vue/reactivity'

export default function useForm(props, emit) {
    const name = computed({
        get() {
            return props.bookingForm.name
        },
        set(value) {
            emit('update:bookingForm', { ...props.bookingForm, name: value })
        },
    })
    const phone = computed({
        get() {
            return props.bookingForm.phone
        },
        set(value) {
            emit('update:bookingForm', { ...props.bookingForm, phone: value })
        },
    })
    const beginDate = computed({
        get() {
            return props.bookingForm.beginDate
        },
        set(value) {
            emit('update:bookingForm', { ...props.bookingForm, beginDate: value })
        },
    })
    const endDate = computed({
        get() {
            return props.bookingForm.endDate
        },
        set(value) {
            emit('update:bookingForm', { ...props.bookingForm, endDate: value })
        },
    })

    return { name, phone, beginDate, endDate }
}
