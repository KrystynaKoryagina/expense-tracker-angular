import { Injectable } from '@angular/core';
import { LocalStorageEntities } from '../models/local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set<T>(key: LocalStorageEntities, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: LocalStorageEntities): T {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  remove(key: LocalStorageEntities): void {
    localStorage.removeItem(key);
  }

  has(key: LocalStorageEntities): boolean {
    return localStorage.getItem(key) !== null;
  }

  clear(): void {
    localStorage.clear();
  }
}
