import express from 'express';
import AdminController from '../controllers/adminController';
import AdminService from '../services/adminService';
import auth from '../middleware/adminauth';

const admin_route = express.Router()
const adminService = new AdminService()
const adminController = new AdminController(adminService)

admin_route.get('/login',auth.isLogout, adminController.adminLoginLoad.bind(adminController));
admin_route.get('/add_user',auth.isLogin, adminController.addStudentLoad.bind(adminController));
admin_route.get('/update_user',auth.isLogin, adminController.updateStudentLoad.bind(adminController));
admin_route.get('/delete_user', auth.isLogin,adminController.deleteStudent.bind(adminController));
admin_route.get('/home',auth.isLogin, adminController.adminHomeLoad.bind(adminController));
admin_route.post('/login',auth.isLogout, adminController.adminLogin.bind(adminController));
admin_route.post('/add_user', auth.isLogin,adminController.addStudent.bind(adminController));
admin_route.post('/update_user',auth.isLogin, adminController.updateStudent.bind(adminController));
admin_route.get('/logout',auth.isLogin,adminController.logOut.bind(adminController));


export default admin_route;