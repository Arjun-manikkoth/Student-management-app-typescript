import express from 'express';
import nocache from 'nocache';
import session from 'express-session';
import connectDB from './database/db';
import studentRoute from './routes/studentRoute';
import adminRoute from './routes/adminRoute';

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}))

app.use(nocache())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.set("views", "./src/views")

app.use("/student", studentRoute)
app.use("/admin", adminRoute)

app.use("*", (req,res) => {
  res.send("invalid route")
})

const port = 3000;

app.listen(port, (error?:Error) => {
  if (!error) {
    console.log("Server running at port http://localhost:3000/student/login")
    connectDB();
  } else {
    console.error("Error occurred, The server can't start", error);
  }
})