import { Request, Response,NextFunction } from "express";

const isLogin = async (req:Request, res:Response,next:NextFunction) => {
  try {
    if (req.session.admin_id) {
      next();
    }
    else {
      res.redirect("login");
    }
    
  }
  catch (error) {

}  
}


const isLogout = async (req:Request, res:Response,next:NextFunction) => {
  try {
    if (req.session.admin_id) {
      res.redirect("home")
    } else {
      next();
    }
  }
  catch (error) {
 
}  
}

export default {isLogin,isLogout}