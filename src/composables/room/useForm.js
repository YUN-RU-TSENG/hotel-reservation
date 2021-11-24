import { useForm as useVeeForm, useField as useVeeField } from 'vee-validate'
import * as yup from 'yup'

export default function useForm() {
    const { handleSubmit } = useVeeForm({
        validationSchema: yup.object({
            name: yup.string().required(),
            phone: yup
                .string()
                .required()
                .matches(/09[0-9]{8}/),
            beginDate: yup
                .string()
                .required()
                .matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
            endDate: yup
                .string()
                .required()
                .matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
        }),
    })

    // ! waiting for refactor : use reactive to wrapper
    const { value: name, errorMessage: nameError } = useVeeField('name')
    const { value: phone, errorMessage: phoneError } = useVeeField('phone')
    const { value: beginDate, errorMessage: beginDateError } = useVeeField('beginDate')
    const { value: endDate, errorMessage: endDateError } = useVeeField('endDate')

    return {
        name,
        nameError,
        phone,
        phoneError,
        beginDate,
        beginDateError,
        endDate,
        endDateError,
        handleSubmit,
    }
}
