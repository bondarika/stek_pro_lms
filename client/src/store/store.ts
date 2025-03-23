import { action, makeAutoObservable } from 'mobx';
import IUser from '../types/IUser';
import AuthService from '../services/AuthService';
import { API_URL } from '../http';
import { AuthResponse } from '../types/response/AuthResponse';
import axios from 'axios';

export default class Store {
  user = {} as IUser;
  isVerified = false;
  isAuth = false;
  step = 1;
  isLoading = false;

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

  setUser(user: IUser) {
    this.user = user;
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async validation(code: string) {
    try {
      const response = await AuthService.validation(code);
      console.log(response);
      console.log(response.status);
      if (response.status === 200) {
        localStorage.setItem('codeToken', response.data.codeToken);
        this.step++;
      }
    } catch (e) {
      console.log(e.response?.data?.message);
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
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e.response?.data?.message);
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
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  nextStep = () => {
    if (this.step == 2) {
      this.step++;
    }
  };

  prevStep = () => {
    if (this.step == 2) {
      this.step--;
    }
  };
}
