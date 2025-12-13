import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-report',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="report-container">
      <div class="header">
        <h2>Progress Report</h2>
        <p>Track your learning journey and mastery of topics.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">85%</div>
          <div class="stat-label">Overall Mastery</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">12</div>
          <div class="stat-label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">4.5h</div>
          <div class="stat-label">Time Spent</div>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-card">
          <h3>Topic Mastery</h3>
          <div class="skills-list">
            <div class="skill-item" *ngFor="let skill of skills">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percent">{{ skill.percent }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="skill.percent"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h3>Recent Activity</h3>
          <div class="activity-list">
            <div class="activity-item" *ngFor="let activity of activities">
              <div class="activity-icon" [ngClass]="activity.type">{{ activity.icon }}</div>
              <div class="activity-details">
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.date }}</p>
              </div>
              <div class="activity-score" *ngIf="activity.score">{{ activity.score }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .report-container {
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

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #4f46e5;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #6b7280;
      font-weight: 500;
    }

    .charts-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .chart-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .chart-card h3 {
      margin: 0 0 1.5rem 0;
      color: #1f2937;
      font-size: 1.25rem;
    }

    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .progress-bar {
      height: 8px;
      background-color: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background-color: #4f46e5;
      border-radius: 4px;
      transition: width 0.5s ease-out;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .activity-item:hover {
      background-color: #f9fafb;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .activity-icon.quiz { background-color: #e0e7ff; color: #4f46e5; }
    .activity-icon.chat { background-color: #d1fae5; color: #059669; }
    .activity-icon.read { background-color: #fef3c7; color: #d97706; }

    .activity-details h4 {
      margin: 0;
      font-size: 1rem;
      color: #1f2937;
    }

    .activity-details p {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .activity-score {
      margin-left: auto;
      font-weight: 600;
      color: #4f46e5;
    }
  `]
})
export class ReportComponent {
    skills = [
        { name: 'Biology', percent: 92 },
        { name: 'Physics', percent: 78 },
        { name: 'Earth Science', percent: 85 },
        { name: 'Chemistry', percent: 64 }
    ];

    activities = [
        { type: 'quiz', icon: '📝', title: 'Photosynthesis Quiz', date: 'Today, 10:30 AM', score: 90 },
        { type: 'chat', icon: '💬', title: 'Chat about Gravity', date: 'Yesterday, 2:15 PM' },
        { type: 'read', icon: '📖', title: 'Solar System Guide', date: 'Nov 28, 4:00 PM' },
        { type: 'quiz', icon: '📝', title: 'Matter States Quiz', date: 'Nov 27, 11:00 AM', score: 85 }
    ];
}
