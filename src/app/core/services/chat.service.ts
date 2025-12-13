import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ChatRequest, Conversation } from '../models/chat.model';
import { environment } from '../../../environments/environment';

/**
 * Chat service for managing chat interactions
 */
@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private apiService: ApiService) { }

    /**
     * Send a chat message with streaming response
     */
    streamChat(request: ChatRequest): Observable<string> {
        return this.apiService.streamPost(environment.apiEndpoints.chat, request);
    }

    /**
     * Get conversation history for a user
     */
    getConversations(userId: string): Observable<Conversation> {
        return this.apiService.get<Conversation>(
            `${environment.apiEndpoints.conversations}/${userId}`
        );
    }

    /**
     * Check API health
     */
    healthCheck(): Observable<{ status: string }> {
        return this.apiService.get<{ status: string }>(environment.apiEndpoints.health);
    }
}
