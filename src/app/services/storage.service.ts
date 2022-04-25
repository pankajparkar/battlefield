import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string) {
    const result = localStorage.getItem(key);
    try {
      return JSON.parse(result ?? '{}');
    } catch (error) {
      return result;
    }
  }

  set(key: string, value: unknown) {
    let valueToBeStored = value;
    try {
      valueToBeStored = JSON.stringify(value);
    } finally {
      localStorage.setItem(key, valueToBeStored as string);
    }
  }

  getByProperty(key: string, prop: string) {
    const result = JSON.parse(localStorage.getItem(key) || '{}');
    return result[prop];
  }

  setByProperty(key: string, prop: string, propValue: unknown) {
    const result = JSON.parse(localStorage.getItem(key) || '{}');
    result[prop] = propValue || '';
    this.set(key, result);
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data.');
    }
  }

  removeProperty(key: string, prop: string) {
    const result = JSON.parse(localStorage.getItem(key) || '{}');
    delete result[prop];
    this.set(key, result);
  }
}
