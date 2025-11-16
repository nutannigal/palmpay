import { useState } from 'react'

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (validate) {
      setErrors(prev => ({
        ...prev,
        [name]: validate(name, value, values)
      }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    if (validate) {
      setErrors(prev => ({
        ...prev,
        [name]: validate(name, values[name], values)
      }))
    }
  }

  const setFieldValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  const isValid = !validate || Object.keys(errors).every(key => !errors[key])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    isValid
  }
}