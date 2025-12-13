import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { DocumentService } from '../../core/services/document.service';
import { Document } from '../../core/models/document.model';

@Component({
    selector: 'app-read',
    standalone: true,
    imports: [CommonModule, DocumentViewerComponent],
    template: `
    <div class="read-container">
      <div class="header">
        <h2>Knowledge Base</h2>
        <p>Explore the documents available to the AI.</p>
      </div>

      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading documents...</p>
      </div>

      <div *ngIf="error && !loading" class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Failed to load documents</h3>
        <p>{{ error }}</p>
        <button class="retry-btn" (click)="loadDocuments()">Retry</button>
      </div>

      <div *ngIf="!loading && !error" class="documents-grid">
        <div class="document-card" *ngFor="let doc of documents">
          <div class="doc-icon">📄</div>
          <div class="doc-info">
            <h3>{{ doc.title }}</h3>
            <p class="meta">{{ doc.pages }} pages • {{ doc.date }}</p>
            <p class="summary">{{ doc.summary }}</p>
          </div>
          <div class="doc-actions">
            <button class="btn-read" (click)="openDocument(doc)">Read</button>
          </div>
        </div>

        <div class="upload-card" (click)="uploadDocument()">
          <div class="upload-content">
            <span class="plus-icon">+</span>
            <h3>Upload PDF</h3>
            <p>Add new materials to the knowledge base</p>
          </div>
        </div>
      </div>
    </div>

    <app-document-viewer
      *ngIf="selectedDocument"
      [document]="selectedDocument"
      (close)="closeDocument()">
    </app-document-viewer>
  `,
    styles: [`
    .read-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      margin-bottom: 2rem;
    }

    .header h2 {
      font-size: 2rem;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .documents-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .document-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
    }

    .document-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .doc-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .doc-info h3 {
      margin: 0 0 0.5rem 0;
      color: #1f2937;
      font-size: 1.125rem;
    }

    .meta {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.75rem;
    }

    .summary {
      font-size: 0.875rem;
      color: #4b5563;
      line-height: 1.5;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .btn-read {
      width: 100%;
      padding: 0.5rem;
      background-color: #e0e7ff;
      color: #4f46e5;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-read:hover {
      background-color: #c7d2fe;
    }

    .upload-card {
      border: 2px dashed #d1d5db;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      cursor: pointer;
      transition: border-color 0.2s, background-color 0.2s;
    }

    .upload-card:hover {
      border-color: #4f46e5;
      background-color: #f9fafb;
    }

    .upload-content {
      text-align: center;
      color: #6b7280;
    }

    .plus-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .upload-content h3 {
      margin: 0;
      font-size: 1.125rem;
      color: #374151;
    }

    .loading-state {
      text-align: center;
      padding: 4rem 2rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #e5e7eb;
      border-top-color: #4f46e5;
      border-radius: 50%;
      margin: 0 auto 1rem;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-state p {
      color: #6b7280;
      font-size: 1rem;
    }

    .error-state {
      text-align: center;
      padding: 4rem 2rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .error-state h3 {
      color: #ef4444;
      margin: 0 0 0.5rem 0;
    }

    .error-state p {
      color: #6b7280;
      margin-bottom: 1.5rem;
    }

    .retry-btn {
      padding: 0.75rem 1.5rem;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .retry-btn:hover {
      background-color: #4338ca;
    }
  `]
})
export class ReadComponent implements OnInit {
    selectedDocument: Document | null = null;
    documents: Document[] = [];
    loading = false;
    error: string | null = null;

    // Fallback mock documents if backend is not available
    private mockDocuments: Document[] = [
        {
            id: '1',
            title: 'Grade 3 Science Curriculum',
            pages: 45,
            date: 'Nov 15, 2023',
            summary: 'Core concepts including life cycles, forces, and weather patterns.'
        },
        {
            id: '2',
            title: 'Photosynthesis Guide',
            pages: 12,
            date: 'Nov 20, 2023',
            summary: 'Detailed explanation of plant energy production and cellular respiration.'
        },
        {
            id: '3',
            title: 'Solar System Overview',
            pages: 28,
            date: 'Nov 22, 2023',
            summary: 'Planetary characteristics, orbits, and space exploration history.'
        }
    ];

    constructor(private documentService: DocumentService) {}

    ngOnInit() {
        this.loadDocuments();
    }

    loadDocuments() {
        this.loading = true;
        this.error = null;

        this.documentService.getDocuments().subscribe({
            next: (response) => {
                this.documents = response.documents;
                this.loading = false;
                console.log('Documents loaded from backend:', this.documents);
            },
            error: (err) => {
                console.error('Failed to load documents from backend, using mock data:', err);
                // Fallback to mock data if backend is not available
                this.documents = this.mockDocuments;
                this.loading = false;
                // Only show error if we don't have mock data
                // this.error = 'Could not connect to backend. Showing sample documents.';
            }
        });
    }

    openDocument(doc: Document) {
        console.log('Opening document:', doc.title);
        this.selectedDocument = doc;
    }

    closeDocument() {
        this.selectedDocument = null;
    }

    uploadDocument() {
        console.log('Upload document clicked');
        // TODO: Implement file upload dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf';
        input.onchange = (event: any) => {
            const file = event.target.files[0];
            if (file) {
                this.handleFileUpload(file);
            }
        };
        input.click();
    }

    private handleFileUpload(file: File) {
        console.log('Uploading file:', file.name);
        this.loading = true;

        this.documentService.uploadDocument(file).subscribe({
            next: (response) => {
                console.log('Document uploaded successfully:', response);
                alert(`Document "${response.document.title}" uploaded successfully!`);
                this.loadDocuments(); // Reload documents list
            },
            error: (err) => {
                console.error('Failed to upload document:', err);
                this.loading = false;
                alert('Failed to upload document. Please make sure the backend is running.');
            }
        });
    }
}
