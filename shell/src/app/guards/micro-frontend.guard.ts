import { Injectable } from "@angular/core"
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router"
import { Observable, of } from "rxjs"
import { catchError, map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class MicroFrontendGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const mfeName = route.url[0]?.path

    if (!mfeName) {
      return of(true)
    }

    // Check if the micro frontend is available
    return this.checkMicroFrontendAvailability(mfeName).pipe(
      map(() => true),
      catchError((error) => {
        console.error(`Micro frontend ${mfeName} is not available:`, error)
        this.router.navigate(["/"], {
          queryParams: { error: `${mfeName}_unavailable` },
        })
        return of(false)
      }),
    )
  }

  private checkMicroFrontendAvailability(mfeName: string): Observable<boolean> {
    const remoteUrls: { [key: string]: string } = {
      campaign: "http://localhost:4201/remoteEntry.js",
      template: "http://localhost:4202/remoteEntry.js",
    }

    const remoteUrl = remoteUrls[mfeName]
    if (!remoteUrl) {
      throw new Error(`Unknown micro frontend: ${mfeName}`)
    }

    // Simple availability check by trying to fetch the remote entry
    return new Observable<boolean>((observer) => {
      fetch(remoteUrl, { method: "HEAD" })
        .then((response) => {
          if (response.ok) {
            observer.next(true)
            observer.complete()
          } else {
            observer.error(new Error(`Remote entry not available: ${response.status}`))
          }
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }
}
