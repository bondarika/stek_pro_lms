﻿import { action, makeAutoObservable } from 'mobx';
import User from '../types/User';
import AuthService from '../services/AuthService';
import { API_URL } from '../http';
import { AuthResponse } from '../types/response/AuthResponse';
import axios from 'axios';
import Course from '../types/Course';
import UserService from '../services/UserService';
import { AxiosError } from 'axios';

export default class Store {
  user = {} as User;
  isVerified = false;
  isAuth = false;
  step = 1;
  isLoading = false;
  error: string | null = null;
  courses: Course[] = [];

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

  setCourses(courses: Course[]) {
    this.courses = courses;
  }

  clearError() {
    this.error = null;
  }

  async validation(code: string) {
    try {
      const response = await AuthService.validation(code);
      if (response.status === 200) {
        localStorage.setItem('codeToken', response.data.codeToken);
        this.step++;
        this.clearError();
      }
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(error.response?.data?.message || 'ошибка валидации кода');
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      await this.fetchCourses();
      this.clearError();
      return true;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(
        error.response?.data?.message || 'произошла ошибка при попытке войти'
      );
    }
  }

  async registration(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    try {
      const response = await AuthService.registration(
        name,
        surname,
        email,
        password
      );
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      await this.fetchCourses();
      this.clearError();
      return true;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(
        error.response?.data?.message ||
          'произошла ошибка при попытке зарегистрироваться '
      );
    }
  }

  async sendResetEmail(email: string) {
    try {
      AuthService.sendResetEmail(email);
      return true;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(
        error.response?.data?.message || 'произошла ошибка при отправке письма'
      );
      return false;
    }
  }

  async resetPassword(resetLink: string, newPassword: string) {
    try {
      await AuthService.resetPassword(resetLink, newPassword);
      return true;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(
        error.response?.data?.message || 'произошла ошибка при смене пароля'
      );
      return false;
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
      this.clearError();
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(
        error.response?.data?.message || 'произошла ошибка при попытке выйти'
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
      await this.fetchCourses();
      this.clearError();
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(
        error.response?.data?.message ||
          'произошла ошибка при проверке авторизации пользователя'
      );
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchCourses() {
    try {
      const response = await UserService.fetchUserCourses();
      this.setCourses(response.data);
      this.clearError();
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      this.setError(
        error.response?.data?.message || 'произошла ошибка при загрузке курсов'
      );
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

  // trackCurrentUserProgress = async ({
  //   courseId,
  //   module,
  //   lesson,
  //   section,
  //   step
  // }) => {
  //   await api.post('/user/progress', {
  //     courseId,
  //     module,
  //     lesson,
  //     section,
  //     step
  //   });
  // };

  // async trackUserProgress(courseId, module, lesson, section, step) {
  //   try {
  //     const response = await UserService.trackProgress();
  //     this.setCourses(response.data);
  //     this.clearError();
  //   } catch (e) {
  //     this.setError(
  //       e.response?.data?.message || 'произошла ошибка при загрузке курсов'
  //     );
  //   }
  // }
}
