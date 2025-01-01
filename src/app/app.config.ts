import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
// import Material from '@primeng/themes/material';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHotToastConfig } from '@ngneat/hot-toast';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHotToastConfig({
        position: 'top-center',
        success: {
            style: {
              border: '1px solid #6366f8',
              background: '#6366', 
              padding: '16px',
              color: '#6366f3', 
            },
          },
          error: {
            style: {
              border: '1px solid #ff3737', 
              background: '#6366', 
              padding: '16px',
              color: '#ff3737', 
            },
          },
        iconTheme: {
            primary: '#818CF8',
            secondary: '#6366F1',
        }
    }),
    provideAnimationsAsync(),
        providePrimeNG({           
            theme: {
                
                preset: Aura,
                
                options: {
                    prefix: 'p',
                    darkModeSelector: 'system',
                    cssLayer: {
                        // import: 'primeng/resources/themes/lara-light-blue/theme.css',
                        name: 'primeng',
                       // order: 'primeng, tailwind-css'
                    }
                }                
            }
        })
  ]
};
