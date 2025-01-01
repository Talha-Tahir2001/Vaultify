import { Component, inject } from '@angular/core';
import { RouterLink,  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  public auth = inject(AuthService);

  user$ = this.auth.currentUser$;
  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

}
