export class ValidationUtils {
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static isPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
  }

  static isUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  static isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return strongPasswordRegex.test(password)
  }

  static isNumeric(value: string): boolean {
    return !isNaN(Number(value)) && !isNaN(Number.parseFloat(value))
  }

  static isInteger(value: string): boolean {
    return Number.isInteger(Number(value))
  }

  static isPositiveNumber(value: string | number): boolean {
    const num = typeof value === "string" ? Number(value) : value
    return !isNaN(num) && num > 0
  }

  static isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max
  }

  static hasMinLength(value: string, minLength: number): boolean {
    return value.length >= minLength
  }

  static hasMaxLength(value: string, maxLength: number): boolean {
    return value.length <= maxLength
  }

  static isAlphanumeric(value: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/
    return alphanumericRegex.test(value)
  }

  static isAlphabetic(value: string): boolean {
    const alphabeticRegex = /^[a-zA-Z]+$/
    return alphabeticRegex.test(value)
  }

  static containsOnlyNumbers(value: string): boolean {
    const numbersOnlyRegex = /^\d+$/
    return numbersOnlyRegex.test(value)
  }

  static isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date.getTime())
  }

  static isFutureDate(dateString: string): boolean {
    const date = new Date(dateString)
    const now = new Date()
    return date > now
  }

  static isPastDate(dateString: string): boolean {
    const date = new Date(dateString)
    const now = new Date()
    return date < now
  }

  static isValidCreditCard(cardNumber: string): boolean {
    // Luhn algorithm
    const cleanNumber = cardNumber.replace(/\D/g, "")
    let sum = 0
    let isEven = false

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(cleanNumber.charAt(i), 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  }

  static isValidPostalCode(postalCode: string, country = "US"): boolean {
    const patterns: Record<string, RegExp> = {
      US: /^\d{5}(-\d{4})?$/,
      CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
      UK: /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/,
      DE: /^\d{5}$/,
      FR: /^\d{5}$/,
    }

    const pattern = patterns[country.toUpperCase()]
    return pattern ? pattern.test(postalCode) : true
  }

  static sanitizeHtml(html: string): string {
    const div = document.createElement("div")
    div.textContent = html
    return div.innerHTML
  }

  static validateRequired(value: any): boolean {
    if (value === null || value === undefined) return false
    if (typeof value === "string") return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  }

  static getPasswordStrength(password: string): "weak" | "medium" | "strong" {
    let score = 0

    // Length
    if (password.length >= 8) score++
    if (password.length >= 12) score++

    // Character types
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[@$!%*?&]/.test(password)) score++

    if (score <= 2) return "weak"
    if (score <= 4) return "medium"
    return "strong"
  }
}
