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
const studentModel_1 = __importDefault(require("../models/studentModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class StudentService {
    createStudent(studentData) {
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
    loginCheck(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.findOne({ email: email });
            if (student) {
                const passwordMatch = yield bcryptjs_1.default.compare(password, student === null || student === void 0 ? void 0 : student.password);
                if (passwordMatch) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
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
    getStudentData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentModel_1.default.findOne({ email: email });
            return student;
        });
    }
}
exports.default = StudentService;
