"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    loginLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("student/login");
            }
            catch (error) {
                res.status(500).json({ error: "An unknown error occured" });
            }
        });
    }
    signUpLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("student/registration");
            }
            catch (error) {
                res.status(500).json({ error: "An unknown error occured" });
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.studentService.getStudent(req.body.email);
                if (account) {
                    const student = yield this.studentService.createStudent(req.body);
                    res.render("student/home");
                }
                else {
                    res.render("student/registration", { message: "Account already exists" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "An unknown error occured" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordMatch = yield this.studentService.loginCheck(req.body.email, req.body.password);
                if (passwordMatch) {
                    const student = yield this.studentService.getStudentData(req.body.email);
                    req.session.user_id = student._id;
                    res.redirect("home");
                }
                else {
                    res.render("student/login", { message: "Incorrect Username or Password" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "An unknown error occured" });
            }
        });
    }
    homeLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("student/home");
            }
            catch (error) {
                res.status(500);
            }
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.destroy((err) => {
                    if (err) {
                        console.error('Session destruction error:', err);
                        res.status(500).json({ error: "Failed to log out. Please try again later." });
                    }
                    else {
                        res.redirect("login");
                    }
                });
            }
            catch (error) {
                console.error('Unexpected error:', error);
                res.status(500).json({ error: "An unexpected error occurred during logout." });
            }
        });
    }
}
exports.default = StudentController;
