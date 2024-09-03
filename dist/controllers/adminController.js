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
class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    adminLoginLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("admin/login");
            }
            catch (error) {
                res.status(500).json({ error: "An unexpected error occured" });
            }
        });
    }
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminService.adminLogin(req.body.email, req.body.password);
                if (admin === "Access Granted") {
                    const adminData = yield this.adminService.getAdminData(req.body.email);
                    req.session.admin_id = adminData._id;
                    res.redirect("home");
                }
                else if (admin === "Wrong Credentials") {
                    res.render("admin/login", { message: "Incorrect Username/Password" });
                }
                else if (admin === "Admin Not Found") {
                    res.render("admin/login", { message: "Please register an account" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "An unexpected error occured" });
            }
        });
    }
    adminHomeLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let search = '';
                // if (req.query.search) {
                //   search = req.query.search 
                // }
                const students = yield this.adminService.getAllStudents();
                res.render("admin/home", { students: students });
            }
            catch (error) {
                res.status(500).json({ error: "An unexpected error occured" });
            }
        });
    }
    addStudentLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("admin/add_user");
            }
            catch (error) {
                res.status(500).json({ error: "An unexpected error occured" });
            }
        });
    }
    addStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.adminService.getStudent(req.body.email);
                if (account) {
                    const student = yield this.adminService.addStudent(req.body);
                    res.redirect("home");
                }
                else {
                    res.render("admin/add_user", { message: "Account exists" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "An unknown error occured" });
            }
        });
    }
    updateStudentLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield this.adminService.getStudentById(req.query.id);
                res.render("admin/edit_user", { student: student });
            }
            catch (error) {
                res.status(500).json({ error: "An unknown error occured" });
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.adminService.checkStudentUpdate(req.query.id, req.body);
            if (account) {
                const student = yield this.adminService.updateStudent(req.query.id, req.body);
                res.redirect("home");
            }
            else {
                const student = yield this.adminService.getStudentById(req.query.id);
                res.render("admin/edit_user", { message: "Email Already Exists", student: student });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.adminService.deleteStudent(req.query.id);
            res.redirect("home");
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
exports.default = AdminController;
