import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private readonly PREFIX = "mfe_"

  constructor() {}

  // Local Storage methods
  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(this.PREFIX + key, serializedValue)
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  getItem<T = any>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.PREFIX + key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return null
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.PREFIX + key)
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }

  // Session Storage methods
  setSessionItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value)
      sessionStorage.setItem(this.PREFIX + key, serializedValue)
    } catch (error) {
      console.error("Error saving to sessionStorage:", error)
    }
  }

  getSessionItem<T = any>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(this.PREFIX + key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading from sessionStorage:", error)
      return null
    }
  }

  removeSessionItem(key: string): void {
    try {
      sessionStorage.removeItem(this.PREFIX + key)
    } catch (error) {
      console.error("Error removing from sessionStorage:", error)
    }
  }

  clearSession(): void {
    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          sessionStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error("Error clearing sessionStorage:", error)
    }
  }

  // Utility methods
  exists(key: string): boolean {
    return localStorage.getItem(this.PREFIX + key) !== null
  }

  sessionExists(key: string): boolean {
    return sessionStorage.getItem(this.PREFIX + key) !== null
  }

  getSize(): number {
    let total = 0
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith(this.PREFIX)) {
        const item = localStorage.getItem(key)
        if (item) {
          total += item.length
        }
      }
    })
    return total
  }

  // Batch operations
  setMultiple(items: Record<string, any>): void {
    Object.entries(items).forEach(([key, value]) => {
      this.setItem(key, value)
    })
  }

  getMultiple(keys: string[]): Record<string, any> {
    const result: Record<string, any> = {}
    keys.forEach((key) => {
      result[key] = this.getItem(key)
    })
    return result
  }

  removeMultiple(keys: string[]): void {
    keys.forEach((key) => {
      this.removeItem(key)
    })
  }
}
