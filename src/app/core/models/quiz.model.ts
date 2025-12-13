/**
 * Quiz and evaluation models
 */

export interface Question {
    id: string;
    text: string;
    topic: string;
    difficulty?: string;
}

export interface Answer {
    questionId: string;
    text: string;
}

export interface EvaluateRequest {
    question: string;
    answer: string;
    context?: string;
    apiKey: string;
}

export interface EvaluationResponse {
    success: boolean;
    data: {
        score: number;
        evaluation: string;
        nextStep: string;
        feedback: string;
    };
    meta: {
        model: string;
        agent: string;
        version: string;
    };
}
