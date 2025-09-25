import { Injectable } from "@angular/core"
import type {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router"
import type { Observable } from "rxjs"
import { map, take } from "rxjs/operators"
import type { AuthService } from "../services/auth.service"
import type { UserRole } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth(route, state)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth(childRoute, state)
  }

  private checkAuth(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          // Store the attempted URL for redirecting after login
          this.router.navigate(["/login"], {
            queryParams: { returnUrl: state.url },
          })
          return false
        }

        // Check for required roles
        const requiredRoles = route.data?.["roles"] as UserRole[]
        if (requiredRoles && requiredRoles.length > 0) {
          const user = this.authService.getCurrentUser()
          if (!user || !requiredRoles.includes(user.role)) {
            this.router.navigate(["/unauthorized"])
            return false
          }
        }

        // Check for required permissions
        const requiredPermissions = route.data?.["permissions"] as string[]
        if (requiredPermissions && requiredPermissions.length > 0) {
          const hasAllPermissions = requiredPermissions.every((permission) =>
            this.authService.hasPermission(permission),
          )

          if (!hasAllPermissions) {
            this.router.navigate(["/unauthorized"])
            return false
          }
        }

        return true
      }),
    )
  }
}
