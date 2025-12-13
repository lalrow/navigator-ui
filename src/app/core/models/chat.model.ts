/**
 * Chat-related models
 */

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: string;
}

export interface ChatRequest {
    developerMessage: string;
    userMessage: string;
    model?: string;
    apiKey: string;
    userId: string;
}

export interface Conversation {
    userId: string;
    conversations: Message[];
    totalMessages: number;
}

export interface ChatResponse {
    message: string;
    status: string;
}
