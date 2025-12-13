import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RAGChatRequest, RAGResponse, RAGStatus } from '../models/rag.model';
import { environment } from '../../../environments/environment';

/**
 * RAG service for document-based chat
 */
@Injectable({
    providedIn: 'root'
})
export class RagService {
    constructor(private apiService: ApiService) { }

    /**
     * Send a RAG chat message
     */
    ragChat(request: RAGChatRequest): Observable<RAGResponse> {
        return this.apiService.post<RAGResponse>(
            environment.apiEndpoints.ragChat,
            request
        );
    }

    /**
     * Get RAG system status
     */
    getRagStatus(): Observable<RAGStatus> {
        return this.apiService.get<RAGStatus>(environment.apiEndpoints.ragStatus);
    }

    /**
     * Get RAG status for a specific user
     */
    getUserRagStatus(userId: string): Observable<RAGStatus> {
        return this.apiService.get<RAGStatus>(
            `${environment.apiEndpoints.ragStatus}/${userId}`
        );
    }
}
