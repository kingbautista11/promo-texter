import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'login-form123-ec5a0',
        appId: '1:437371834081:web:d9b36a4583ef40494f31a0',
        storageBucket: 'login-form123-ec5a0.firebasestorage.app',
        apiKey: 'AIzaSyBHRKGDobxCbGeWIisOEO444mguvTP3rZA',
        authDomain: 'login-form123-ec5a0.firebaseapp.com',
        messagingSenderId: '437371834081',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
