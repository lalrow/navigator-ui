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
        return this.apiService.post<EvaluationResponse>(
            environment.apiEndpoints.evaluate,
            request
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
