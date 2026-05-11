import { Injectable, signal, computed } from '@angular/core';

export interface User {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'y2k_users';
  private readonly CURRENT_USER_KEY = 'y2k_current_user';

  users = signal<User[]>(this.loadUsers());
  currentUser = signal<User | null>(this.loadCurrentUser());
  isAuthenticated = computed(() => !!this.currentUser());

  private get storageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadUsers(): User[] {
    if (!this.storageAvailable) {
      return [];
    }

    try {
      return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private loadCurrentUser(): User | null {
    if (!this.storageAvailable) {
      return null;
    }

    const username = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!username) {
      return null;
    }

    return this.loadUsers().find(user => user.username === username) || null;
  }

  private saveUsers() {
    if (!this.storageAvailable) {
      return;
    }

    localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users()));
  }

  private saveCurrentUser() {
    if (!this.storageAvailable) {
      return;
    }

    if (this.currentUser()) {
      localStorage.setItem(this.CURRENT_USER_KEY, this.currentUser()!.username);
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  register(username: string, password: string, confirmPassword: string) {
    const normalized = username.trim().toLowerCase();
    if (!normalized || !password.trim() || !confirmPassword.trim()) {
      return { success: false, message: 'Rellena todos los campos.' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden.' };
    }

    const exists = this.users().some(user => user.username === normalized);
    if (exists) {
      return { success: false, message: 'El nombre de usuario ya existe.' };
    }

    const newUser: User = { username: normalized, password: password.trim() };
    this.users.update(list => [...list, newUser]);
    this.saveUsers();
    this.currentUser.set(newUser);
    this.saveCurrentUser();

    return { success: true, message: 'Usuario registrado y autenticado.' };
  }

  login(username: string, password: string) {
    const normalized = username.trim().toLowerCase();
    if (!normalized || !password.trim()) {
      return { success: false, message: 'Rellena todos los campos.' };
    }

    const user = this.users().find(
      user => user.username === normalized && user.password === password.trim()
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos.' };
    }

    this.currentUser.set(user);
    this.saveCurrentUser();
    return { success: true, message: 'Has iniciado sesión correctamente.' };
  }

  logout() {
    this.currentUser.set(null);
    this.saveCurrentUser();
  }
}
