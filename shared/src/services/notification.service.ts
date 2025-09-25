import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import type { NotificationItem } from "../models/common.model"

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<NotificationItem[]>([])
  private unreadCountSubject = new BehaviorSubject<number>(0)

  public notifications$ = this.notificationsSubject.asObservable()
  public unreadCount$ = this.unreadCountSubject.asObservable()

  constructor() {}

  // Show different types of notifications
  showSuccess(title: string, message: string, actionUrl?: string, actionLabel?: string): void {
    this.addNotification("success", title, message, actionUrl, actionLabel)
  }

  showError(title: string, message: string, actionUrl?: string, actionLabel?: string): void {
    this.addNotification("error", title, message, actionUrl, actionLabel)
  }

  showWarning(title: string, message: string, actionUrl?: string, actionLabel?: string): void {
    this.addNotification("warning", title, message, actionUrl, actionLabel)
  }

  showInfo(title: string, message: string, actionUrl?: string, actionLabel?: string): void {
    this.addNotification("info", title, message, actionUrl, actionLabel)
  }

  // Add notification
  private addNotification(
    type: NotificationItem["type"],
    title: string,
    message: string,
    actionUrl?: string,
    actionLabel?: string,
  ): void {
    const notification: NotificationItem = {
      id: this.generateId(),
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
      actionUrl,
      actionLabel,
    }

    const currentNotifications = this.notificationsSubject.value
    const updatedNotifications = [notification, ...currentNotifications]

    this.notificationsSubject.next(updatedNotifications)
    this.updateUnreadCount()
  }

  // Mark notification as read
  markAsRead(id: string): void {
    const notifications = this.notificationsSubject.value
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )

    this.notificationsSubject.next(updatedNotifications)
    this.updateUnreadCount()
  }

  // Mark all notifications as read
  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))

    this.notificationsSubject.next(updatedNotifications)
    this.updateUnreadCount()
  }

  // Remove notification
  removeNotification(id: string): void {
    const notifications = this.notificationsSubject.value
    const updatedNotifications = notifications.filter((notification) => notification.id !== id)

    this.notificationsSubject.next(updatedNotifications)
    this.updateUnreadCount()
  }

  // Clear all notifications
  clearAll(): void {
    this.notificationsSubject.next([])
    this.unreadCountSubject.next(0)
  }

  // Get all notifications
  getNotifications(): NotificationItem[] {
    return this.notificationsSubject.value
  }

  // Get unread notifications
  getUnreadNotifications(): NotificationItem[] {
    return this.notificationsSubject.value.filter((notification) => !notification.read)
  }

  // Get notifications by type
  getNotificationsByType(type: NotificationItem["type"]): NotificationItem[] {
    return this.notificationsSubject.value.filter((notification) => notification.type === type)
  }

  // Update unread count
  private updateUnreadCount(): void {
    const unreadCount = this.notificationsSubject.value.filter((notification) => !notification.read).length
    this.unreadCountSubject.next(unreadCount)
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Toast-like notifications (auto-dismiss)
  showToast(type: NotificationItem["type"], title: string, message: string, duration = 5000): void {
    const id = this.generateId()
    const notification: NotificationItem = {
      id,
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
    }

    const currentNotifications = this.notificationsSubject.value
    const updatedNotifications = [notification, ...currentNotifications]

    this.notificationsSubject.next(updatedNotifications)
    this.updateUnreadCount()

    // Auto-remove after duration
    setTimeout(() => {
      this.removeNotification(id)
    }, duration)
  }
}
