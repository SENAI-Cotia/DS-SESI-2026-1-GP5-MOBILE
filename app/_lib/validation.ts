export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidCpf(cpf: string) {
  return cpf.replace(/\D/g, '').length === 11
}

export function isValidPhone(phone: string) {
  return phone.replace(/\D/g, '').length >= 10
}

export function validatePassword(password: string) {
  const errors: string[] = []
  const value = password.trim()

  if (value.length < 8) {
    errors.push('pelo menos 8 caracteres')
  }
  if (!/[A-Z]/.test(value)) {
    errors.push('uma letra maiúscula')
  }
  if (!/[a-z]/.test(value)) {
    errors.push('uma letra minúscula')
  }
  if (!/[0-9]/.test(value)) {
    errors.push('um número')
  }
  if (!/[^A-Za-z0-9]/.test(value)) {
    errors.push('um símbolo')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function parseCurrency(value: string) {
  const formatted = String(value).replace(/[^0-9,\.]/g, '').replace(',', '.')
  const parsed = parseFloat(formatted)
  return Number.isFinite(parsed) ? parsed : 0
}
