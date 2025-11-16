export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phoneNumber
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`
}

export const formatSocialNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export const maskEmail = (email) => {
  const [local, domain] = email.split('@')
  const maskedLocal = local.substring(0, 2) + '*'.repeat(local.length - 2)
  return maskedLocal + '@' + domain
}

export const maskMobile = (mobile) => {
  return mobile.substring(0, 3) + '****' + mobile.substring(7)
}