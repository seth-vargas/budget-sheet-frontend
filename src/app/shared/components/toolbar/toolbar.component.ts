import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountButtonComponent } from '../account-button/account-button.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-toolbar',
  imports: [RouterModule, AccountButtonComponent, ToolbarModule, ButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {}
