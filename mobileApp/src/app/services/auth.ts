import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(cpf: string, pass: string, type: string): boolean {
    if (cpf === '123.456.789-00' && pass === '1234') {
      return true;
    } else {
      return false;
    }
  }
}