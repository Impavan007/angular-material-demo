import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true, 
  styleUrls: ['./navbar.component.scss'],
  imports: [MatIconModule,RouterLink]
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menu = document.querySelector('.navbar-menu');
    if (menu) {
      menu.classList.toggle('active', this.menuOpen);
    }
  }
}
