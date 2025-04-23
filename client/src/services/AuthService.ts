import api from '../http';
import { AuthResponse } from '../types/response/AuthResponse';
import { VerifyResponse } from '../types/response/VerifyResponse';
import type { AxiosResponse } from 'axios';

export default class AuthService {
  static async validation(
    code: string
  ): Promise<AxiosResponse<VerifyResponse>> {
    return api.post<VerifyResponse>('/validate', { code });
  }

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/login', { email, password });
  }

  static async registration(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const codeToken = localStorage.getItem('codeToken');
    return api.post<AuthResponse>(
      '/registration',
      { name, surname, email, password },
      {
        headers: {
          verification: `Bearer ${codeToken}`
        }
      }
    );
  }

  static async logout(): Promise<void> {
    await api.post<AuthResponse>('/logout');
  }
}
