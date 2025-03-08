import { Component } from '@angular/core';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ToolbarComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
