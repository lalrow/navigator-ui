/**
 * RAG-related models
 */

export interface RAGChatRequest {
    userMessage: string;
    model?: string;
    apiKey: string;
    userId: string;
}

export interface RAGResponse {
    message: string;
    documentsCount: number;
    status: string;
}

export interface RAGStatus {
    hasIndex: boolean;
    documentsCount: number;
    status: string;
    message: string;
}
