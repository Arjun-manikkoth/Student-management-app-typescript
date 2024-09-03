"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = __importDefault(require("../controllers/studentController"));
const studentService_1 = __importDefault(require("../services/studentService"));
const studentAuth_1 = __importDefault(require("../middleware/studentAuth"));
const student_route = express_1.default.Router();
const studentService = new studentService_1.default();
const studentController = new studentController_1.default(studentService);
student_route.get('/login', studentAuth_1.default.isLogout, studentController.loginLoad.bind(studentController));
student_route.get('/sign_up', studentController.signUpLoad.bind(studentController));
student_route.get('/home', studentAuth_1.default.isLogin, studentController.homeLoad.bind(studentController));
student_route.post('/sign_up', studentController.signUp.bind(studentController));
student_route.post('/login', studentAuth_1.default.isLogout, studentController.login.bind(studentController));
student_route.get('/logout', studentAuth_1.default.isLogin, studentController.logOut.bind(studentController));
exports.default = student_route;
