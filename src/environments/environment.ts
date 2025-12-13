export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000',
    apiEndpoints: {
        chat: '/api/chat',
        ragChat: '/api/rag-chat',
        search: '/api/search',
        evaluate: '/api/evaluate',
        health: '/api/health',
        conversations: '/api/conversations',
        ragStatus: '/api/rag-status',
        documents: '/api/documents',
        uploadDocument: '/api/documents/upload'
    }
};
