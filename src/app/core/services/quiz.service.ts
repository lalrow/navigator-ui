import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EvaluateRequest, EvaluationResponse } from '../models/quiz.model';
import { environment } from '../../../environments/environment';

/**
 * Quiz service for student evaluations
 */
@Injectable({
    providedIn: 'root'
})
export class QuizService {
    constructor(private apiService: ApiService) { }

    /**
     * Evaluate a student's answer using the diagnostic agent
     */
    evaluateAnswer(request: EvaluateRequest): Observable<EvaluationResponse> {
        // Convert camelCase to snake_case for Python backend
        const backendRequest = {
            question: request.question,
            answer: request.answer,
            context: request.context || '',
            api_key: request.apiKey  // Convert apiKey to api_key
        };
        return this.apiService.post<EvaluationResponse>(
            environment.apiEndpoints.evaluate,
            backendRequest
        );
    }

    /**
     * Search for relevant context
     */
    search(query: string, topK: number, apiKey: string): Observable<any[]> {
        return this.apiService.post<any[]>(environment.apiEndpoints.search, {
            query,
            topK,
            apiKey
        });
    }
}
