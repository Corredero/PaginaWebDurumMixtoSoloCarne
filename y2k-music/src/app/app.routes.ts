import { Routes } from '@angular/router';
import { authGuard } from './auth.guard'; // Importamos el archivo que acabas de crear

export const routes: Routes = [
  // Esta es tu página principal (donde está el login en el header)
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
  
  // Aquí pones la ruta de tu lista de canciones
  { 
    path: 'canciones', 
    component: /* NombreDeTuComponenteDeCanciones */ undefined, 
    canActivate: [authGuard] // <--- ESTE ES EL CANDADO
  },
];