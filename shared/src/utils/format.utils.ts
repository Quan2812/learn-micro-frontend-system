export class FormatUtils {
  static formatCurrency(amount: number, currency = "USD", locale = "en-US"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  static formatNumber(number: number, locale = "en-US", options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(locale, options).format(number)
  }

  static formatPercentage(value: number, decimals = 2): string {
    return `${(value * 100).toFixed(decimals)}%`
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  static formatPhoneNumber(phoneNumber: string, format = "US"): string {
    const cleaned = phoneNumber.replace(/\D/g, "")

    if (format === "US" && cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }

    if (format === "US" && cleaned.length === 11 && cleaned[0] === "1") {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
    }

    return phoneNumber
  }

  static formatCreditCard(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\D/g, "")
    const groups = cleaned.match(/.{1,4}/g) || []
    return groups.join(" ")
  }

  static truncateText(text: string, maxLength: number, suffix = "..."): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - suffix.length) + suffix
  }

  static capitalizeFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  static capitalizeWords(text: string): string {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  }

  static camelToKebab(text: string): string {
    return text.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()
  }

  static kebabToCamel(text: string): string {
    return text.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  }

  static snakeToKebab(text: string): string {
    return text.replace(/_/g, "-")
  }

  static kebabToSnake(text: string): string {
    return text.replace(/-/g, "_")
  }

  static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  static formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  static formatInitials(firstName: string, lastName: string): string {
    const first = firstName?.charAt(0)?.toUpperCase() || ""
    const last = lastName?.charAt(0)?.toUpperCase() || ""
    return first + last
  }

  static formatFullName(firstName: string, lastName: string, middleName?: string): string {
    const parts = [firstName, middleName, lastName].filter(Boolean)
    return parts.join(" ")
  }

  static formatAddress(address: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }): string {
    const parts = []

    if (address.street) parts.push(address.street)
    if (address.city) parts.push(address.city)
    if (address.state) parts.push(address.state)
    if (address.zipCode) parts.push(address.zipCode)
    if (address.country) parts.push(address.country)

    return parts.join(", ")
  }

  static maskEmail(email: string): string {
    const [username, domain] = email.split("@")
    if (username.length <= 2) return email

    const maskedUsername = username[0] + "*".repeat(username.length - 2) + username[username.length - 1]
    return `${maskedUsername}@${domain}`
  }

  static maskPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, "")
    if (cleaned.length < 4) return phoneNumber

    const masked = "*".repeat(cleaned.length - 4) + cleaned.slice(-4)
    return this.formatPhoneNumber(masked)
  }

  static maskCreditCard(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\D/g, "")
    if (cleaned.length < 4) return cardNumber

    const masked = "*".repeat(cleaned.length - 4) + cleaned.slice(-4)
    return this.formatCreditCard(masked)
  }
}
