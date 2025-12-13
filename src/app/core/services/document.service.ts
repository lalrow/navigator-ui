import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Document, DocumentListResponse, DocumentUploadResponse } from '../models/document.model';
import { environment } from '../../../environments/environment';

/**
 * Document service for managing knowledge base documents
 */
@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    constructor(private apiService: ApiService) { }

    /**
     * Get all documents from the knowledge base
     */
    getDocuments(): Observable<DocumentListResponse> {
        return this.apiService.get<DocumentListResponse>(
            environment.apiEndpoints.documents
        );
    }

    /**
     * Get a specific document by ID
     */
    getDocument(id: string): Observable<Document> {
        return this.apiService.get<Document>(
            `${environment.apiEndpoints.documents}/${id}`
        );
    }

    /**
     * Upload a new document
     */
    uploadDocument(file: File): Observable<DocumentUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return this.apiService.post<DocumentUploadResponse>(
            environment.apiEndpoints.uploadDocument,
            formData
        );
    }

    /**
     * Delete a document
     */
    deleteDocument(id: string): Observable<{ success: boolean; message: string }> {
        return this.apiService.post<{ success: boolean; message: string }>(
            `${environment.apiEndpoints.documents}/${id}/delete`,
            {}
        );
    }
}

