import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    template: `
    <header class="header">
      <div class="logo">
        <a routerLink="/">
          <h1>Navigator</h1>
        </a>
      </div>
      <nav class="nav">
        <ul>
          <li><a routerLink="/chat" routerLinkActive="active">Chat</a></li>
          <li><a routerLink="/quiz" routerLinkActive="active">Quiz</a></li>
          <li><a routerLink="/read" routerLinkActive="active">Read</a></li>
          <li><a routerLink="/report" routerLinkActive="active">Report</a></li>
        </ul>
      </nav>
      <div class="user-profile">
        <div class="avatar">S</div>
      </div>
    </header>
  `,
    styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #4f46e5;
      background: linear-gradient(to right, #4f46e5, #7c3aed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }

    .nav a {
      text-decoration: none;
      color: #6b7280;
      font-weight: 500;
      transition: color 0.2s;
      padding-bottom: 0.25rem;
      border-bottom: 2px solid transparent;
    }

    .nav a:hover {
      color: #1f2937;
    }

    .nav a.active {
      color: #4f46e5;
      border-bottom-color: #4f46e5;
    }

    .user-profile .avatar {
      width: 36px;
      height: 36px;
      background-color: #e0e7ff;
      color: #4f46e5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent { }
