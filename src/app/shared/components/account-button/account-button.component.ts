import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-button',
  imports: [ButtonModule, Menu],
  templateUrl: './account-button.component.html',
  styleUrl: './account-button.component.scss',
})
export class AccountButtonComponent {
  constructor(private authService: AuthService, private router: Router) {}
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'General',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog',
          },
        ],
      },
      {
        label: 'Actions',
        items: [
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.logout();
              this.router.navigate(['/login']);
            },
          },
        ],
      },
    ];
  }
}
