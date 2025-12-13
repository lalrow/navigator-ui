import { Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { ReadComponent } from './features/read/read.component';
import { ReportComponent } from './features/report/report.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'read', component: ReadComponent },
    { path: 'report', component: ReportComponent },
    { path: '**', redirectTo: '/login' }
];
