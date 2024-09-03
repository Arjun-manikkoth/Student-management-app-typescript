import { IStudentService } from '../interfaces/IStudentService';
import Student, { IUser } from '../models/studentModel';
import bcrypt from 'bcryptjs'

class StudentService implements IStudentService{
  
  async createStudent(studentData: IUser): Promise<IUser> {
  

    const hashPassword = await bcrypt.hash(studentData.password, 10)

    const student = new Student({
      name: studentData.name,
      email: studentData.email,
      password: hashPassword,
      phoneNumber: studentData.phoneNumber
    });
    return await student.save();
  }
  
  
  async loginCheck(email: string, password: string): Promise<Boolean>{
    
    const student = await Student.findOne({ email: email })
    
    if (student) {
      const passwordMatch = await bcrypt.compare(password, student?.password)
      
      if (passwordMatch) {
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  async getStudent(email: string): Promise<any>{

    const student = await Student.findOne({ email: email })

    if (student) {
      return false;
    } else {
      return true;
    }
    
  }

  async getStudentData(email: string): Promise<any>{
    
    const student = await Student.findOne({ email: email })
    
    return student;
  }

}
export default StudentService;