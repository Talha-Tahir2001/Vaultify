import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FeaturesComponent } from "./components/features/features.component";
import { AboutComponent } from "./components/about/about.component";
import { NgIf } from '@angular/common';
import { SiteListComponent } from './pages/site-list/site-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent, FeaturesComponent, AboutComponent, SiteListComponent],
  templateUrl: './app.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'Vaultify';

  private router = inject(Router);

  isSignUpPage() : boolean { 
    return this.router.url=== '/signup'; 
  }

  isLoginPage() : boolean { 
    return this.router.url=== '/login'; 
  }
  isSignUpOrLoginPage: boolean = false;

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  constructor() {
    this.router.events.subscribe(() => {
      // Check if the current route is login or signup page
      this.isSignUpOrLoginPage = this.router.url.includes('login') || this.router.url.includes('signup');
    });
  }

}

