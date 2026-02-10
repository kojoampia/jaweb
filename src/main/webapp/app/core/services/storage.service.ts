import { Injectable } from '@angular/core';
import { signal, effect } from '@angular/core';
import { WritableSignal } from '@angular/core';

/**
 * Modern storage service using Angular Signals
 * Replaces deprecated @LocalStorage decorators
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private static readonly PREFIX = 'app_storage_';

  /**
   * Create a signal that syncs with localStorage
   */
  createLocalStorageSignal<T>(key: string, initialValue: T): WritableSignal<T> {
    // Try to load from localStorage
    const stored = localStorage.getItem(StorageService.PREFIX + key);
    const value: T = stored ? JSON.parse(stored) : initialValue;

    // Create signal with initial value
    const sig = signal<T>(value);

    // Set up effect to persist changes to localStorage
    effect(() => {
      const current = sig();
      if (current !== null && current !== undefined) {
        localStorage.setItem(StorageService.PREFIX + key, JSON.stringify(current));
      } else {
        localStorage.removeItem(StorageService.PREFIX + key);
      }
    });

    return sig;
  }

  /**
   * Get value from localStorage
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    const stored = localStorage.getItem(StorageService.PREFIX + key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultValue || null;
      }
    }
    return defaultValue || null;
  }

  /**
   * Set value in localStorage
   */
  setItem(key: string, value: any): void {
    if (value === null || value === undefined) {
      this.removeItem(key);
    } else {
      localStorage.setItem(StorageService.PREFIX + key, JSON.stringify(value));
    }
  }

  /**
   * Remove value from localStorage
   */
  removeItem(key: string): void {
    localStorage.removeItem(StorageService.PREFIX + key);
  }

  /**
   * Clear all stored values
   */
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(StorageService.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}
