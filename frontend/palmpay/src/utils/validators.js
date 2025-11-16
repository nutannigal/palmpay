export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'Email is required'
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  return null
}

export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return null
}

export const validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/
  if (!mobile) return 'Mobile number is required'
  if (!mobileRegex.test(mobile)) return 'Please enter a valid 10-digit mobile number'
  return null
}

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`
  }
  return null
}

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return null
}

export const validateAmount = (amount) => {
  if (!amount) return 'Amount is required'
  if (isNaN(amount) || Number(amount) <= 0) return 'Please enter a valid amount'
  return null
}

export const createValidator = (rules) => {
  return (name, value, allValues) => {
    const rule = rules[name]
    if (!rule) return null

    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.required
    }

    if (rule.validate && value) {
      return rule.validate(value, allValues)
    }

    return null
  }
}