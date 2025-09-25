import { Injectable } from "@angular/core"
import type { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http"
import { type Observable, throwError } from "rxjs"
import { catchError, retry } from "rxjs/operators"
import { API_ENDPOINTS } from "../constants/api.constants"

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] }
  params?: HttpParams | { [param: string]: string | string[] }
  withCredentials?: boolean
  responseType?: "json" | "text" | "blob" | "arraybuffer"
}

@Injectable({
  providedIn: "root",
})
export class HttpClientService {
  private baseUrl = API_ENDPOINTS.BASE_URL

  constructor(private http: HttpClient) {}

  // GET request
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options).pipe(retry(1), catchError(this.handleError))
  }

  // POST request
  post<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, options).pipe(catchError(this.handleError))
  }

  // PUT request
  put<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, options).pipe(catchError(this.handleError))
  }

  // PATCH request
  patch<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data, options).pipe(catchError(this.handleError))
  }

  // DELETE request
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options).pipe(catchError(this.handleError))
  }

  // Upload file
  uploadFile<T>(endpoint: string, file: File, additionalData?: any): Observable<T> {
    const formData = new FormData()
    formData.append("file", file)

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key])
      })
    }

    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData).pipe(catchError(this.handleError))
  }

  // Download file
  downloadFile(endpoint: string, filename?: string): Observable<Blob> {
    return this.http
      .get(`${this.baseUrl}${endpoint}`, {
        responseType: "blob",
      })
      .pipe(catchError(this.handleError))
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred"

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`
    }

    console.error("HTTP Error:", errorMessage)
    return throwError(() => new Error(errorMessage))
  }

  // Set base URL
  setBaseUrl(url: string): void {
    this.baseUrl = url
  }

  // Get current base URL
  getBaseUrl(): string {
    return this.baseUrl
  }
}
