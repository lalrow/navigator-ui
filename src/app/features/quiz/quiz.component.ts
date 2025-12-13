import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../core/services/quiz.service';
import { Question, EvaluationResponse } from '../../core/models/quiz.model';

@Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="quiz-container">
      <div class="quiz-header">
        <h2>Knowledge Check</h2>
        <p>Test your understanding of the material.</p>
      </div>

      <div class="question-card" *ngIf="currentQuestion">
        <div class="question-text">
          <h3>Question {{ currentQuestionIndex + 1 }}</h3>
          <p>{{ currentQuestion.text }}</p>
        </div>

        <div class="answer-section">
          <textarea 
            [(ngModel)]="userAnswer" 
            placeholder="Type your answer here..."
            rows="4"
            [disabled]="isEvaluating"
          ></textarea>
          
          <div class="actions">
            <button 
              class="btn-submit" 
              (click)="submitAnswer()" 
              [disabled]="!userAnswer.trim() || isEvaluating"
            >
              {{ isEvaluating ? 'Evaluating...' : 'Submit Answer' }}
            </button>
          </div>
        </div>
      </div>

      <div class="feedback-card" *ngIf="evaluation">
        <div class="feedback-header" [ngClass]="{'success': evaluation.data.score > 0.7, 'warning': evaluation.data.score <= 0.7}">
          <h3>Feedback</h3>
          <span class="score">Score: {{ (evaluation.data.score * 100) | number:'1.0-0' }}%</span>
        </div>
        
        <div class="feedback-content">
          <p class="evaluation-text">{{ evaluation.data.evaluation }}</p>
          
          <div class="feedback-details">
            <h4>Detailed Feedback:</h4>
            <p>{{ evaluation.data.feedback }}</p>
          </div>
          
          <div class="next-steps">
            <h4>Next Steps:</h4>
            <p>{{ evaluation.data.nextStep }}</p>
          </div>
        </div>

        <div class="feedback-actions">
          <button class="btn-next" (click)="nextQuestion()">Next Question</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .quiz-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .quiz-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .quiz-header h2 {
      font-size: 2rem;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .question-card, .feedback-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .question-text h3 {
      color: #4f46e5;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .question-text p {
      font-size: 1.125rem;
      color: #374151;
      line-height: 1.6;
    }

    .answer-section {
      margin-top: 2rem;
    }

    textarea {
      width: 100%;
      padding: 1rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      resize: vertical;
      margin-bottom: 1rem;
      font-family: inherit;
    }

    textarea:focus {
      outline: none;
      border-color: #4f46e5;
      ring: 2px solid #e0e7ff;
    }

    .btn-submit, .btn-next {
      background-color: #4f46e5;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-submit:hover, .btn-next:hover {
      background-color: #4338ca;
    }

    .btn-submit:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .feedback-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .feedback-header h3 {
      margin: 0;
      color: #1f2937;
    }

    .score {
      font-size: 1.25rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
    }

    .success .score {
      background-color: #d1fae5;
      color: #065f46;
    }

    .warning .score {
      background-color: #fef3c7;
      color: #92400e;
    }

    .feedback-content h4 {
      color: #4b5563;
      margin-bottom: 0.5rem;
      margin-top: 1.5rem;
    }

    .feedback-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class QuizComponent implements OnInit {
    questions: Question[] = [
        {
            id: '1',
            text: 'Explain the process of photosynthesis and why it is important for plants.',
            topic: 'Biology',
            difficulty: 'Medium'
        },
        {
            id: '2',
            text: 'What are the three states of matter? Describe the properties of each.',
            topic: 'Physics',
            difficulty: 'Easy'
        },
        {
            id: '3',
            text: 'How does the water cycle work? Include the terms evaporation, condensation, and precipitation.',
            topic: 'Earth Science',
            difficulty: 'Medium'
        }
    ];

    currentQuestionIndex = 0;
    currentQuestion: Question | null = null;
    userAnswer = '';
    isEvaluating = false;
    evaluation: EvaluationResponse | null = null;

    constructor(private quizService: QuizService) { }

    ngOnInit() {
        this.loadQuestion();
    }

    loadQuestion() {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.userAnswer = '';
        this.evaluation = null;
    }

    submitAnswer() {
        if (!this.currentQuestion || !this.userAnswer.trim()) return;

        this.isEvaluating = true;

        // In a real app, we would get the API key from a service or state
        const apiKey = localStorage.getItem('openai_api_key') || '';

        this.quizService.evaluateAnswer({
            question: this.currentQuestion.text,
            answer: this.userAnswer,
            context: '', // Context will be retrieved by the backend agent
            apiKey: apiKey
        }).subscribe({
            next: (response) => {
                this.evaluation = response;
                this.isEvaluating = false;
            },
            error: (error) => {
                console.error('Evaluation failed:', error);
                this.isEvaluating = false;
                // Handle error (show message to user)
            }
        });
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
        } else {
            // Quiz finished
            alert('Quiz completed! Great job!');
            this.currentQuestionIndex = 0;
            this.loadQuestion();
        }
    }
}
