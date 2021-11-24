/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import BaseDatePicker from '../components/Base/BaseDatePicker.vue'
import dayjs from 'dayjs'

describe('Component BaseDatePicker', () => {
    it('should subtract begin month, when click subtract button', async () => {
        const wrapper = mount(BaseDatePicker)

        await wrapper.get('[data-test="subtract-begin-month"]').trigger('click')

        expect(wrapper.get('[data-test="begin-month"]').text()).toBe(
            dayjs().subtract(1, 'month').format('MMMM YYYY')
        )
    })

    it('should add begin month, when click add button', async () => {
        const wrapper = mount(BaseDatePicker)

        await wrapper.get('[data-test="add-end-month"]').trigger('click')
        await wrapper.get('[data-test="add-begin-month"]').trigger('click')

        expect(wrapper.get('[data-test="begin-month"]').text()).toBe(
            dayjs().add(1, 'month').format('MMMM YYYY')
        )
    })

    it('should subtract end month, when click subtract button', async () => {
        const wrapper = mount(BaseDatePicker)

        await wrapper.get('[data-test="add-end-month"]').trigger('click')
        await wrapper.get('[data-test="subtract-end-month"]').trigger('click')

        expect(wrapper.get('[data-test="end-month"]').text()).toBe(
            dayjs().add(1, 'month').format('MMMM YYYY')
        )
    })

    it('should add end month, when click add button', async () => {
        const wrapper = mount(BaseDatePicker)

        await wrapper.get('[data-test="add-end-month"]').trigger('click')

        expect(wrapper.get('[data-test="end-month"]').text()).toBe(
            dayjs().add(2, 'month').format('MMMM YYYY')
        )
    })

    it('should select range, when click day', async () => {
        const wrapper = mount(BaseDatePicker)

        // set begin date
        await wrapper.get('[data-test="date"]:not(.over)').trigger('click')

        expect(wrapper.emitted()).toHaveProperty('update:begin')

        // set end date
        await wrapper.setProps({ begin: dayjs().format('YYYY-MM-DD'), end: '' })
        await wrapper
            .get('[data-test="date"]:not(.over) + [data-test="date"] + [data-test="date"]')
            .trigger('click')

        expect(wrapper.emitted()).toHaveProperty('update:end')

        // reselect begin date
        await wrapper.setProps({
            begin: dayjs().add(10, 'day').format('YYYY-MM-DD'),
            end: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        })
        await wrapper.get('[data-test="date"]:not(.over)').trigger('click')

        expect(wrapper.emitted('update:begin').length).toBe(2)
    })

    it('should add class to select range', async () => {
        const wrapper = mount(BaseDatePicker, {
            props: {
                begin: dayjs().format('YYYY-MM-DD'),
                end: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            },
        })

        expect(wrapper.get('[data-test="date"]:not(.over)').classes('begin')).toBe(true)
        expect(
            wrapper.get('[data-test="date"]:not(.over) + [data-test="date"]').classes('end')
        ).toBe(true)
    })

    it('should reset month and range, when click select button', async () => {
        const wrapper = mount(BaseDatePicker)

        await wrapper.get('[data-test="reset"]').trigger('click')
        await wrapper.setProps({
            begin: '',
            end: '',
        })

        expect(wrapper.get('[data-test="date"]:not(.over)').classes('begin')).toBe(false)
        expect(
            wrapper.get('[data-test="date"]:not(.over) + [data-test="date"]').classes('end')
        ).toBe(false)
    })
})
