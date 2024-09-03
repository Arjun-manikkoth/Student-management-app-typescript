import express from 'express';
import StudentController  from '../controllers/studentController';
import StudentService from '../services/studentService';
import auth from '../middleware/studentAuth';

const student_route = express.Router()
const studentService = new StudentService();
const studentController = new StudentController(studentService)


student_route.get('/login', auth.isLogout,studentController.loginLoad.bind(studentController));
student_route.get('/sign_up', studentController.signUpLoad.bind(studentController));
student_route.get('/home',auth.isLogin,studentController.homeLoad.bind(studentController));
student_route.post('/sign_up', studentController.signUp.bind(studentController));
student_route.post('/login',auth.isLogout, studentController.login.bind(studentController));
student_route.get('/logout',auth.isLogin,studentController.logOut.bind(studentController));

export default student_route;