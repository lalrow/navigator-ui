/**
 * Document models for knowledge base
 */

export interface Document {
    id: string;
    title: string;
    pages: number;
    date: string;
    summary: string;
    url?: string;
    filename?: string;
    size?: number;
}

export interface DocumentListResponse {
    documents: Document[];
    total: number;
}

export interface DocumentUploadResponse {
    success: boolean;
    document: Document;
    message: string;
}

