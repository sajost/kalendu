import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // private accessToken: string;
  // public name: string;

  constructor() {
  }

  public get accessToken(): string {
    return localStorage.getItem('accessToken');
  }

  public get name(): string {
    return localStorage.getItem('name');
  }

  public set accessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public set name(name: string) {
    localStorage.setItem('name', name);
  }

  public destroy(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    // this.accessToken = null;
    // this.name = null;
  }
}
