import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
 // styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(public auth: AuthService) {}
}
