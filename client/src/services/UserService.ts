import api from '../http';
import User from '../types/User';
import type { AxiosResponse } from 'axios';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return api.get<User[]>('/users');
  }
}
