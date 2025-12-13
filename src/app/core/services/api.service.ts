import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Base API service for HTTP communication
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    /**
     * GET request
     */
    get<T>(endpoint: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }, params?: any }): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${endpoint}`, options);
    }

    /**
     * POST request
     */
    post<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }, params?: any }): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options);
    }

    /**
     * Streaming POST request
     * Returns Observable of text chunks
     */
    streamPost(endpoint: string, body: any): Observable<string> {
        return new Observable(observer => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });

            fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: headers as any,
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const reader = response.body?.getReader();
                    const decoder = new TextDecoder();

                    const readChunk = (): any => {
                        return reader?.read().then(({ done, value }) => {
                            if (done) {
                                observer.complete();
                                return;
                            }

                            const chunk = decoder.decode(value, { stream: true });
                            observer.next(chunk);
                            return readChunk();
                        });
                    };

                    return readChunk();
                })
                .catch(error => {
                    observer.error(error);
                });
        });
    }
}
