import api from '../http';
import Course from '../types/Course';
import User from '../types/User';
import type { AxiosResponse } from 'axios';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return api.get<User[]>('/users');
  }

  static fetchUserCourses(): Promise<AxiosResponse<Course[]>> {
    return api.get<Course[]>('/user/courses');
  }

  // static async trackProgress({
  //   courseId,
  //   module,
  //   lesson,
  //   section,
  //   step
  // }): Promise<void> {
  //   return api.post('/user/progress', {
  //     courseId,
  //     module,
  //     lesson,
  //     section,
  //     step
  //   });
  // }
}
