import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { API_ENDPOINTS } from '../constants/api.constants';

// ---- Options cho JSON (an toàn với T) ----
export interface HttpOptionsJson {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
  // để TS chọn đúng overload "body + json":
  observe?: 'body';
  responseType?: 'json';
}

// ---- Options cho các kiểu đặc biệt ----
export interface HttpOptionsArrayBuffer {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
  observe?: 'body';
  responseType: 'arraybuffer';
}

export interface HttpOptionsBlob {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
  observe?: 'body';
  responseType: 'blob';
}

export interface HttpOptionsText {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
  observe?: 'body';
  responseType: 'text';
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  // Quan trọng: dùng string, KHÔNG dùng string literal type
  private baseUrl: string = API_ENDPOINTS.BASE_URL;

  constructor(private http: HttpClient) {}

  // ------------ JSON methods (generic T) ------------
  get<T>(endpoint: string, options?: HttpOptionsJson): Observable<T> {
    const opt: HttpOptionsJson = { observe: 'body', responseType: 'json', ...(options || {}) };
    return this.http
      .get<T>(`${this.baseUrl}${endpoint}`, opt)
      .pipe(retry(1), catchError(this.handleError));
  }

  post<T>(endpoint: string, data: any, options?: HttpOptionsJson): Observable<T> {
    const opt: HttpOptionsJson = { observe: 'body', responseType: 'json', ...(options || {}) };
    return this.http
      .post<T>(`${this.baseUrl}${endpoint}`, data, opt)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, data: any, options?: HttpOptionsJson): Observable<T> {
    const opt: HttpOptionsJson = { observe: 'body', responseType: 'json', ...(options || {}) };
    return this.http
      .put<T>(`${this.baseUrl}${endpoint}`, data, opt)
      .pipe(catchError(this.handleError));
  }

  patch<T>(endpoint: string, data: any, options?: HttpOptionsJson): Observable<T> {
    const opt: HttpOptionsJson = { observe: 'body', responseType: 'json', ...(options || {}) };
    return this.http
      .patch<T>(`${this.baseUrl}${endpoint}`, data, opt)
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, options?: HttpOptionsJson): Observable<T> {
    const opt: HttpOptionsJson = { observe: 'body', responseType: 'json', ...(options || {}) };
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`, opt)
      .pipe(catchError(this.handleError));
  }

  // ------------ Special responseType helpers ------------
  getArrayBuffer(endpoint: string, options?: Omit<HttpOptionsArrayBuffer, 'responseType' | 'observe'>): Observable<ArrayBuffer> {
    const opt: HttpOptionsArrayBuffer = { observe: 'body', responseType: 'arraybuffer', ...(options || {}) } as HttpOptionsArrayBuffer;
    return this.http
      .get(`${this.baseUrl}${endpoint}`, opt)
      .pipe(retry(1), catchError(this.handleError));
  }

  getBlob(endpoint: string, options?: Omit<HttpOptionsBlob, 'responseType' | 'observe'>): Observable<Blob> {
    const opt: HttpOptionsBlob = { observe: 'body', responseType: 'blob', ...(options || {}) } as HttpOptionsBlob;
    return this.http
      .get(`${this.baseUrl}${endpoint}`, opt)
      .pipe(retry(1), catchError(this.handleError));
  }

  getText(endpoint: string, options?: Omit<HttpOptionsText, 'responseType' | 'observe'>): Observable<string> {
    const opt: HttpOptionsText = { observe: 'body', responseType: 'text', ...(options || {}) } as HttpOptionsText;
    return this.http
      .get(`${this.baseUrl}${endpoint}`, opt)
      .pipe(retry(1), catchError(this.handleError));
  }

  // ------------ Upload file (JSON trả về) ------------
  uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>, options?: HttpOptionsJson): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        const val = (additionalData as any)[key];
        formData.append(key, val);
      });
    }

    const opt: HttpOptionsJson = { observe: 'body', responseType: 'json', ...(options || {}) };
    // KHÔNG set 'Content-Type': để browser tự đặt boundary
    return this.http
      .post<T>(`${this.baseUrl}${endpoint}`, formData, opt)
      .pipe(catchError(this.handleError));
  }

  // ------------ Error handler ------------
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    // có thể log ra Logger service tại đây
    return throwError(() => new Error(errorMessage));
  }

  // ------------ Base URL helpers ------------
  setBaseUrl(url: string): void {
    this.baseUrl = url; // OK vì this.baseUrl là string
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
