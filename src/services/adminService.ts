import Admin,{ IAdmin } from "../models/adminModel";
import Student, { IUser } from "../models/studentModel";
import bcrypt from 'bcryptjs'
import StudentService from "./studentService";


class AdminService{

  async adminLogin(email:string,password:string): Promise<String>{
    
    const admin = await Admin.findOne({ email: email })
  
    if (admin) {
      const passwordMatch = await bcrypt.compare(password, admin?.password)
     
      if (passwordMatch) {
        return "Access Granted"
      } else {
        return "Wrong Credentials"
      }
    }
    else {
      return "Admin Not Found";
    }
  }

 async addStudent(studentData:IUser): Promise<IUser>{

  const hashPassword = await bcrypt.hash(studentData.password, 10)

  const student = new Student({
    name: studentData.name,
    email: studentData.email,
    password: hashPassword,
    phoneNumber: studentData.phoneNumber
  });
  return await student.save();
   
  }

  async updateStudent(id: string, data: Partial<IUser>): Promise<any>{
    
    const student = await Student.findByIdAndUpdate({ _id: id }, {
      name: data.name,
      email: data.email,
      phoneNumber:data.phoneNumber
    }, { new: true })

    return student;

  }

  async deleteStudent(id: string): Promise<any>{
    
    const student = await Student.findByIdAndUpdate({ _id: id },{isDeleted:1},{new:true})
    
    return student;
  }

  async getAllStudents(): Promise<any[]>{
    
    const student = await Student.find({ isDeleted: 0 })

    return student;
  }

  async getStudentById(id:string):Promise<any> {
     
    const student = await Student.findOne({ _id: id })

    return student;
  }
  async getStudent(email: string): Promise<any>{

    const student = await Student.findOne({ email: email })

    if (student) {
      return false;
    } else {
      return true;
    }
    
  }
  async checkStudentUpdate(id: string, data:Partial<IUser>): Promise<any>{

    const student = await Student.findOne({ email: data.email, _id: { $ne: id } })

    if (student) {
      return false;
    } else {
      return true;
    }
    
  }
  async getAdminData(email:string):Promise<any>{
   
    const admin = await Admin.findOne({ email: email });

    return admin;
 }
}

export default AdminService;