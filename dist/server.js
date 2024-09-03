"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nocache_1 = __importDefault(require("nocache"));
const express_session_1 = __importDefault(require("express-session"));
const db_1 = __importDefault(require("./database/db"));
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));
app.use((0, nocache_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.set('view engine', 'ejs');
app.set("views", "./src/views");
app.use("/student", studentRoute_1.default);
app.use("/admin", adminRoute_1.default);
app.use("*", (req, res) => {
    res.send("invalid route");
});
const port = 3000;
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running at port http://localhost:3000/student/login");
        (0, db_1.default)();
    }
    else {
        console.error("Error occurred, The server can't start", error);
    }
});
