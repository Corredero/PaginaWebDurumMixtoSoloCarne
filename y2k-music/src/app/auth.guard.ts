import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Si está logueado, lo deja pasar
  } else {
    // Si no está logueado, le avisamos y lo mandamos al inicio
    alert('¡Alto ahí! Debes iniciar sesión para ver la música.');
    router.navigate(['/']); 
    return false;
  }
};