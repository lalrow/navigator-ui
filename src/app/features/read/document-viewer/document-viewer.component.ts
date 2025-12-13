import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-document-viewer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="viewer-overlay" (click)="onClose()">
      <div class="viewer-container" (click)="$event.stopPropagation()">
        <div class="viewer-header">
          <div class="header-left">
            <h3>{{ document?.title }}</h3>
            <span class="page-info">{{ document?.pages }} pages</span>
          </div>
          <button class="close-btn" (click)="onClose()">✕</button>
        </div>
        <div class="viewer-content">
          <div class="pdf-placeholder">
            <div class="placeholder-icon">📄</div>
            <h4>{{ document?.title }}</h4>
            <p class="placeholder-text">{{ document?.summary }}</p>
            <div class="document-info">
              <p><strong>Pages:</strong> {{ document?.pages }}</p>
              <p><strong>Date:</strong> {{ document?.date }}</p>
            </div>
            <div class="placeholder-note">
              <p>💡 <strong>Note:</strong> To display actual PDF content, you need to:</p>
              <ul>
                <li>Upload PDF files to your server</li>
                <li>Use a PDF viewer library like <code>ng2-pdf-viewer</code> or <code>ngx-extended-pdf-viewer</code></li>
                <li>Or embed PDFs using <code>&lt;iframe&gt;</code> or <code>&lt;object&gt;</code> tags</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .viewer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .viewer-container {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 1200px;
      height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .viewer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #e5e7eb;
      background: linear-gradient(to right, #f9fafb, #ffffff);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .viewer-header h3 {
      margin: 0;
      color: #1f2937;
      font-size: 1.25rem;
    }

    .page-info {
      background-color: #e0e7ff;
      color: #4f46e5;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 6px;
      transition: background-color 0.2s, color 0.2s;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      background-color: #f3f4f6;
      color: #1f2937;
    }

    .viewer-content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
      background-color: #f9fafb;
    }

    .pdf-placeholder {
      background: white;
      border-radius: 8px;
      padding: 3rem;
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .placeholder-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .pdf-placeholder h4 {
      color: #1f2937;
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    .placeholder-text {
      color: #6b7280;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .document-info {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      text-align: left;
    }

    .document-info p {
      margin: 0.5rem 0;
      color: #4b5563;
    }

    .document-info strong {
      color: #1f2937;
    }

    .placeholder-note {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 1.5rem;
      text-align: left;
      border-radius: 4px;
      margin-top: 2rem;
    }

    .placeholder-note p {
      margin: 0 0 1rem 0;
      color: #1e40af;
      font-weight: 600;
    }

    .placeholder-note ul {
      margin: 0;
      padding-left: 1.5rem;
      color: #1e40af;
    }

    .placeholder-note li {
      margin: 0.5rem 0;
    }

    .placeholder-note code {
      background-color: #dbeafe;
      padding: 0.125rem 0.375rem;
      border-radius: 3px;
      font-family: monospace;
      font-size: 0.875rem;
    }
  `]
})
export class DocumentViewerComponent {
    @Input() document: any;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}

