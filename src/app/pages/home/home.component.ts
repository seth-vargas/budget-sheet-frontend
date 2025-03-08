import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-home',
  imports: [TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user!: any;

  ngOnInit() {
    this.user = {
      firstName: 'John',
    };
  }
}
