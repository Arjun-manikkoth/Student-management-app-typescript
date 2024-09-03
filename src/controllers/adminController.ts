import { Request, Response } from 'express';
import { IAdminService } from '../interfaces/IAdminService';

class AdminController{

  private adminService: IAdminService;

  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }
 
  async adminLoginLoad(req:Request,res:Response):Promise<void> {
    try{
       res.render("admin/login")
    }
    catch(error) {
      res.status(500).json({error:"An unexpected error occured"})
    }
   }

  async adminLogin(req:Request,res:Response): Promise<void>{
    
    try {
      const admin = await this.adminService.adminLogin(req.body.email, req.body.password);
    
    if (admin === "Access Granted") {
     
      const adminData = await this.adminService.getAdminData(req.body.email)
      
      req.session.admin_id = adminData._id;
        
      res.redirect("home")

       
    } else if (admin === "Wrong Credentials") {
      
      res.render("admin/login",{message:"Incorrect Username/Password"})
    
    } else if(admin==="Admin Not Found") {

      res.render("admin/login", { message: "Please register an account" })
      
    }
    }
    catch (error) {
      res.status(500).json({ error: "An unexpected error occured" })
    }

  }

  async adminHomeLoad(req:Request,res:Response):Promise<void> {
    try {
      
      let search: string = '';

      // if (req.query.search) {
      //   search = req.query.search 
      // }

      const students = await this.adminService.getAllStudents()
     
        res.render("admin/home", { students: students })
    
    }
    catch(error) {
      res.status(500).json({error:"An unexpected error occured"})
    }
   }

   async addStudentLoad(req:Request,res:Response):Promise<void> {
    try{
       res.render("admin/add_user")
    }
    catch(error) {
      res.status(500).json({error:"An unexpected error occured"})
    }
   }
  
 async addStudent(req:Request,res:Response): Promise<void>{

   try {
    
     const account = await this.adminService.getStudent(req.body.email);

     if (account) {
       
       const student = await this.adminService.addStudent(req.body)

      res.redirect("home")

     } else {
       res.render("admin/add_user",{message:"Account exists"})
     }
 }
 catch (error) {
   res.status(500).json({ error: "An unknown error occured" })
   
   }
  }

  async updateStudentLoad(req:Request,res:Response): Promise<void>{

    try {
    
      const student = await this.adminService.getStudentById(req.query.id as string)

        res.render("admin/edit_user",{student:student})

   }
   catch (error) {
     res.status(500).json({ error: "An unknown error occured" })
     
     }
    }
 
  async updateStudent(req:Request,res:Response): Promise<void>{
    
    const account = await this.adminService.checkStudentUpdate(req.query.id as string,req.body);

    if (account) {

      const student = await this.adminService.updateStudent(req.query.id as string, req.body)
     
      res.redirect("home")

    } else {

      const student = await this.adminService.getStudentById(req.query.id as string)

      res.render("admin/edit_user",{message:"Email Already Exists",student:student})
    }

  }

  async deleteStudent(req:Request,res:Response): Promise<void>{
    
    const student = await this.adminService.deleteStudent(req.query.id as string);
    
    res.redirect("home")
 

  }

  async logOut(req: Request, res: Response): Promise<void>{
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
export default AdminController;