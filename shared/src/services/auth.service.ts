import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of, throwError } from "rxjs"
import { delay, tap } from "rxjs/operators"
import { type User, type LoginCredentials, type AuthToken, type UserSession, UserRole } from "../models/user.model"
import type { StorageService } from "./storage.service"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "auth_token"
  private readonly USER_KEY = "current_user"

  private currentUserSubject = new BehaviorSubject<User | null>(null)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  public currentUser$ = this.currentUserSubject.asObservable()
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  constructor(private storageService: StorageService) {
    this.initializeAuth()
  }

  private initializeAuth(): void {
    const token = this.storageService.getItem(this.TOKEN_KEY)
    const user = this.storageService.getItem(this.USER_KEY)

    if (token && user) {
      this.currentUserSubject.next(user)
      this.isAuthenticatedSubject.next(true)
    }
  }

  login(credentials: LoginCredentials): Observable<UserSession> {
    // Mock authentication - replace with real API call
    return this.mockLogin(credentials).pipe(
      tap((session) => {
        this.storageService.setItem(this.TOKEN_KEY, session.token)
        this.storageService.setItem(this.USER_KEY, session.user)
        this.currentUserSubject.next(session.user)
        this.isAuthenticatedSubject.next(true)
      }),
    )
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      tap(() => {
        this.storageService.removeItem(this.TOKEN_KEY)
        this.storageService.removeItem(this.USER_KEY)
        this.currentUserSubject.next(null)
        this.isAuthenticatedSubject.next(false)
      }),
    )
  }

  refreshToken(): Observable<AuthToken> {
    const currentToken = this.storageService.getItem(this.TOKEN_KEY)
    if (!currentToken) {
      return throwError(() => new Error("No refresh token available"))
    }

    // Mock token refresh - replace with real API call
    return this.mockRefreshToken().pipe(
      tap((token) => {
        this.storageService.setItem(this.TOKEN_KEY, token)
      }),
    )
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser()
    return user ? user.role === role : false
  }

  hasPermission(permission: string): boolean {
    // Mock permission check - implement based on your permission system
    const user = this.getCurrentUser()
    if (!user) return false

    // Admin has all permissions
    if (user.role === UserRole.ADMIN) return true

    // Add your permission logic here
    return true
  }

  updateUserPreferences(preferences: Partial<User["preferences"]>): Observable<User> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      return throwError(() => new Error("No authenticated user"))
    }

    const updatedUser = {
      ...currentUser,
      preferences: { ...currentUser.preferences, ...preferences },
      updatedAt: new Date(),
    }

    return of(updatedUser).pipe(
      delay(500),
      tap((user) => {
        this.storageService.setItem(this.USER_KEY, user)
        this.currentUserSubject.next(user)
      }),
    )
  }

  private mockLogin(credentials: LoginCredentials): Observable<UserSession> {
    // Mock user data - replace with real API call
    if (credentials.email === "admin@example.com" && credentials.password === "password") {
      const user: User = {
        id: "1",
        email: credentials.email,
        firstName: "Admin",
        lastName: "User",
        role: UserRole.ADMIN,
        isActive: true,
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date(),
        preferences: {
          theme: "light",
          language: "en",
          timezone: "UTC",
          notifications: {
            email: true,
            push: true,
            sms: false,
            inApp: true,
          },
        },
      }

      const token: AuthToken = {
        accessToken: "mock-access-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
        expiresIn: 3600,
        tokenType: "Bearer",
      }

      const session: UserSession = {
        user,
        token,
        permissions: ["read", "write", "delete", "admin"],
      }

      return of(session).pipe(delay(1000))
    }

    return throwError(() => new Error("Invalid credentials")).pipe(delay(1000))
  }

  private mockRefreshToken(): Observable<AuthToken> {
    const token: AuthToken = {
      accessToken: "mock-access-token-refreshed-" + Date.now(),
      refreshToken: "mock-refresh-token-refreshed-" + Date.now(),
      expiresIn: 3600,
      tokenType: "Bearer",
    }

    return of(token).pipe(delay(500))
  }
}
