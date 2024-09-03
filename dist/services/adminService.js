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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminModel_1 = __importDefault(require("../models/adminModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AdminService {
    adminLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield adminModel_1.default.findOne({ email: email });
            if (admin) {
                const passwordMatch = yield bcryptjs_1.default.compare(password, admin === null || admin === void 0 ? void 0 : admin.password);
                if (passwordMatch) {
                    return "Access Granted";
                }
                else {
                    return "Wrong Credentials";
                }
            }
            else {
                return "Admin Not Found";
            }
        });
    }
    addStudent(studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcryptjs_1.default.hash(studentData.password, 10);
            const student = new studentModel_1.default({
                name: studentData.name,
                email: studentData.email,
                password: hashPassword,
                phoneNumber: studentData.phoneNumber
            });
            return yield student.save();
        });
    }
    updateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.findByIdAndUpdate({ _id: id }, {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber
            }, { new: true });
            return student;
        });
    }
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.findByIdAndUpdate({ _id: id }, { isDeleted: 1 }, { new: true });
            return student;
        });
    }
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.find({ isDeleted: 0 });
            return student;
        });
    }
    getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.findOne({ _id: id });
            return student;
        });
    }
    getStudent(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.findOne({ email: email });
            if (student) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    checkStudentUpdate(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.findOne({ email: data.email, _id: { $ne: id } });
            if (student) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    getAdminData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield adminModel_1.default.findOne({ email: email });
            return admin;
        });
    }
}
exports.default = AdminService;
