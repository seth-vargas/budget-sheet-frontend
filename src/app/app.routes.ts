import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { authGuard } from './core/auth/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IncomeComponent } from './pages/income/income.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'income', component: IncomeComponent },
      { path: 'expenses', component: ExpensesComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'dashboard' },
];
