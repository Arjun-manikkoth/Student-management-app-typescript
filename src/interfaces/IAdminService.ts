import { IUser } from "../models/studentModel";

export interface IAdminService{
  adminLogin(email:string,password:string):Promise<String>
  addStudent(studentData: Partial<IUser>): Promise<IUser>;
  updateStudent(id: string,data:Partial<IUser>): Promise<any>;
  deleteStudent(id: string): Promise<any>;
  getAllStudents(): Promise<any[]>
  getStudentById(id: string): Promise<any>
  getStudent(email: string): Promise<any>
  checkStudentUpdate(id: string, data:Partial<IUser>): Promise<any>
  getAdminData(email:string):Promise<any>
}