export class DateUtils {
  static formatDate(date: Date | string, format = "yyyy-MM-dd"): string {
    const d = new Date(date)

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    const seconds = String(d.getSeconds()).padStart(2, "0")

    return format
      .replace("yyyy", year.toString())
      .replace("MM", month)
      .replace("dd", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds)
  }

  static formatRelativeTime(date: Date | string): string {
    const now = new Date()
    const targetDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`
    }

    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`
  }

  static isToday(date: Date | string): boolean {
    const today = new Date()
    const targetDate = new Date(date)

    return (
      today.getDate() === targetDate.getDate() &&
      today.getMonth() === targetDate.getMonth() &&
      today.getFullYear() === targetDate.getFullYear()
    )
  }

  static isYesterday(date: Date | string): boolean {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const targetDate = new Date(date)

    return (
      yesterday.getDate() === targetDate.getDate() &&
      yesterday.getMonth() === targetDate.getMonth() &&
      yesterday.getFullYear() === targetDate.getFullYear()
    )
  }

  static addDays(date: Date | string, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  static addMonths(date: Date | string, months: number): Date {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
  }

  static addYears(date: Date | string, years: number): Date {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + years)
    return result
  }

  static getStartOfDay(date: Date | string): Date {
    const result = new Date(date)
    result.setHours(0, 0, 0, 0)
    return result
  }

  static getEndOfDay(date: Date | string): Date {
    const result = new Date(date)
    result.setHours(23, 59, 59, 999)
    return result
  }

  static getStartOfWeek(date: Date | string): Date {
    const result = new Date(date)
    const day = result.getDay()
    const diff = result.getDate() - day
    result.setDate(diff)
    return this.getStartOfDay(result)
  }

  static getEndOfWeek(date: Date | string): Date {
    const result = new Date(date)
    const day = result.getDay()
    const diff = result.getDate() - day + 6
    result.setDate(diff)
    return this.getEndOfDay(result)
  }

  static getStartOfMonth(date: Date | string): Date {
    const result = new Date(date)
    result.setDate(1)
    return this.getStartOfDay(result)
  }

  static getEndOfMonth(date: Date | string): Date {
    const result = new Date(date)
    result.setMonth(result.getMonth() + 1, 0)
    return this.getEndOfDay(result)
  }

  static getDaysBetween(startDate: Date | string, endDate: Date | string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  static isWeekend(date: Date | string): boolean {
    const day = new Date(date).getDay()
    return day === 0 || day === 6
  }

  static isBusinessDay(date: Date | string): boolean {
    return !this.isWeekend(date)
  }
}
