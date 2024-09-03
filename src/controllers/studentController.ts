import { Request, Response } from 'express';
import { IStudentService } from '../interfaces/IStudentService';

class StudentController{
  
  private studentService: IStudentService;

  constructor(studentService: IStudentService) {

    this.studentService = studentService;

  }

  async loginLoad(req: Request, res: Response): Promise<void>{
    try {

      res.render("student/login")

    }
    catch (error) {
      res.status(500).json({error:"An unknown error occured"})
    }
  }

  async signUpLoad(req: Request, res: Response): Promise<void>{
    try {
  
        res.render("student/registration")

    }
    catch (error) {
      res.status(500).json({error:"An unknown error occured"})
    }
  }

  async signUp(req: Request, res: Response): Promise<void>{
    
    try {

      const account = await this.studentService.getStudent(req.body.email);

      if (account) {

        const student = await this.studentService.createStudent(req.body)
      
        res.render("student/home")
        
      } else {

        res.render("student/registration",{message:"Account already exists"})
      
      }
      
    }
    catch (error) {
      res.status(500).json({ error: "An unknown error occured" })
      
      }
  }
  
  async login(req: Request, res: Response): Promise<void>{
    try {

       const passwordMatch =  await this.studentService.loginCheck(req.body.email,req.body.password)
      
      if (passwordMatch) {

       const student =  await this.studentService.getStudentData(req.body.email)
    
        req.session.user_id = student._id;
         
        res.redirect("home")

      } else {
        res.render("student/login",{message:"Incorrect Username or Password"})
       }
    }
    catch (error) {
      res.status(500).json({error:"An unknown error occured"})
    }
  }

  async homeLoad(req: Request, res: Response): Promise<void>{
    try {
      
      res.render("student/home")
    }
    catch (error) {
      res.status(500)
    }
  }

  async logOut(req: Request, res: Response): Promise<void> {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                res.status(500).json({ error: "Failed to log out. Please try again later." });
            } else {
                res.redirect("login");
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: "An unexpected error occurred during logout." });
    }
}

}

export default StudentController;