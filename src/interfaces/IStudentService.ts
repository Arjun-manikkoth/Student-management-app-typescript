import { IUser } from '../models/studentModel';

export interface IStudentService{
  createStudent(studentData: Partial<IUser>): Promise<IUser>;
  loginCheck(email: string, password: string): Promise<Boolean>
  getStudent(email: string): Promise<any>
  getStudentData(email: string): Promise<any>
}