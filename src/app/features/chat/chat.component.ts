import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { ChatRequest, Message } from '../../core/models/chat.model';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    messages: Message[] = [];
    userMessage = '';
    apiKey = '';
    userId = '';
    isLoading = false;
    currentResponse = '';

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        // Load API key and student ID from localStorage
        this.apiKey = localStorage.getItem('openai_api_key') || '';
        const studentId = localStorage.getItem('studentId') || '';
        this.userId = studentId || 'user-' + Math.random().toString(36).substring(7);
    }

    sendMessage() {
        if (!this.userMessage.trim() || !this.apiKey.trim()) {
            return;
        }

        // Add user message to chat
        const userMsg: Message = {
            role: 'user',
            content: this.userMessage,
            timestamp: new Date().toISOString()
        };
        this.messages.push(userMsg);

        const request: ChatRequest = {
            developerMessage: 'You are a helpful AI assistant.',
            userMessage: this.userMessage,
            model: 'gpt-4o-mini',
            apiKey: this.apiKey,
            userId: this.userId
        };

        this.userMessage = '';
        this.isLoading = true;
        this.currentResponse = '';

        // Stream the response
        this.chatService.streamChat(request).subscribe({
            next: (chunk) => {
                this.currentResponse += chunk;
            },
            error: (error) => {
                console.error('Chat error:', error);
                this.isLoading = false;
                this.messages.push({
                    role: 'assistant',
                    content: 'Error: ' + error.message,
                    timestamp: new Date().toISOString()
                });
            },
            complete: () => {
                this.isLoading = false;
                if (this.currentResponse) {
                    this.messages.push({
                        role: 'assistant',
                        content: this.currentResponse,
                        timestamp: new Date().toISOString()
                    });
                }
                this.currentResponse = '';
            }
        });
    }
}
