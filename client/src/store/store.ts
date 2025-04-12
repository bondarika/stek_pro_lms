import { action, makeAutoObservable } from 'mobx';
import User from '../types/User';
import AuthService from '../services/AuthService';
import { API_URL } from '../http';
import { AuthResponse } from '../types/response/AuthResponse';
import axios from 'axios';

export default class Store {
  user = {} as ;
  isVerified = false;
  isAuth = false;
  step = 1;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      nextStep: action,
      prevStep: action
    });
  }

  setVerified(bool: boolean) {
    this.isVerified = bool;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setError(message: string | null) {
    this.error = message;
  }

  clearError() {
    this.error = null;
  }

  async validation(code: string) {
    try {
      const response = await AuthService.validation(code);
      console.log(response);
      console.log(response.status);
      if (response.status === 200) {
        localStorage.setItem('codeToken', response.data.codeToken);
        this.step++;
        this.clearError();
      }
    } catch (e) {
      this.setError(e.response?.data?.message || 'ошибка валидации кода');
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      console.log(this.isAuth);
      this.setUser(response.data.user);
      this.clearError();
    } catch (e) {
      this.setError(
        e.response?.data?.message || 'произошла ошибка при попытке войти'
      );
    }
  }

  async registration(name: string, surname: string, email: string, password: string) {
    try {
      const response = await AuthService.registration(name, surname, email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.clearError();
    } catch (e) {
      this.setError(
        e.response?.data?.message ||
          'произошла ошибка при попытке зарегистрироваться '
      );
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
      this.clearError();
    } catch (e) {
      this.setError(
        e.response?.data?.message || 'произошла ошибка при попытке выйти'
      );
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.clearError();
    } catch (e) {
      this.setError(
        e.response?.data?.message ||
          'произошла ошибка при проверке авторизации пользователя'
      );
    } finally {
      this.setIsLoading(false);
    }
  }

  nextStep = () => {
    this.clearError();
    if (this.step == 2) {
      this.step++;
    }
  };

  prevStep = () => {
    this.clearError();
    if (this.step == 2) {
      this.step--;
    }
  };
}
