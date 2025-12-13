import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="login-container">
      <div class="login-card">
        <div class="logo">
          <h1>Navigator</h1>
          <p>AI-Powered Learning Companion</p>
        </div>

        <form (ngSubmit)="login()">
          <div class="form-group">
            <label for="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              [(ngModel)]="studentId"
              name="studentId"
              placeholder="Enter your student ID"
              required
            >
          </div>

          <div class="form-group">
            <label for="pin">PIN</label>
            <input
              type="password"
              id="pin"
              [(ngModel)]="pin"
              name="pin"
              placeholder="Enter your PIN"
              required
            >
          </div>

          <div class="form-group">
            <label for="apiKey">OpenAI API Key <span class="optional">(Optional)</span></label>
            <input
              type="password"
              id="apiKey"
              [(ngModel)]="apiKey"
              name="apiKey"
              placeholder="sk-... (for AI features)"
            >
            <p class="hint">Required for AI chat and quiz features. Stored locally in your browser.</p>
          </div>

          <button class="btn-login" type="submit" [disabled]="!studentId || !pin">
            Sign In
          </button>
        </form>

        <div class="register-link">
          <p>Don't have an account? <a href="#" (click)="showRegistration($event)">Register here</a></p>
        </div>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f3f4f6;
    }

    .login-card {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    .logo h1 {
      font-size: 2.5rem;
      color: #4f46e5;
      margin: 0 0 0.5rem 0;
    }

    .logo p {
      color: #6b7280;
      margin-bottom: 2.5rem;
    }

    .form-group {
      text-align: left;
      margin-bottom: 2rem;
    }

    label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .optional {
      font-weight: 400;
      color: #9ca3af;
      font-size: 0.875rem;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }

    input:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .hint {
      font-size: 0.875rem;
      color: #9ca3af;
      margin-top: 0.5rem;
    }

    .btn-login {
      width: 100%;
      padding: 0.75rem;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-login:hover {
      background-color: #4338ca;
    }

    .btn-login:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .register-link {
      margin-top: 1.5rem;
      text-align: center;
    }

    .register-link p {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .register-link a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    .error-message {
      margin-top: 1rem;
      padding: 0.75rem;
      background-color: #fee2e2;
      color: #dc2626;
      border-radius: 8px;
      font-size: 0.875rem;
      text-align: center;
    }

    form {
      width: 100%;
    }
  `]
})
export class LoginComponent {
    studentId = '';
    pin = '';
    apiKey = '';
    errorMessage = '';

    constructor(private router: Router) { }

    login() {
        // Clear any previous error
        this.errorMessage = '';

        // Validate that both fields are filled
        if (!this.studentId || !this.pin) {
            this.errorMessage = 'Please enter both Student ID and PIN';
            return;
        }

        // Accept any valid number as PIN and any student ID
        if (this.studentId.trim() && this.pin.trim()) {
            // Store credentials in localStorage
            localStorage.setItem('studentId', this.studentId);
            localStorage.setItem('isLoggedIn', 'true');

            // Store API key if provided
            if (this.apiKey.trim()) {
                localStorage.setItem('openai_api_key', this.apiKey);
            }

            // Navigate to chat page
            this.router.navigate(['/chat']);
        } else {
            this.errorMessage = 'Please enter valid credentials';
        }
    }

    showRegistration(event: Event) {
        event.preventDefault();
        alert('Registration Coming Soon!\n\nThe registration feature will be available in a future update.');
    }
}
