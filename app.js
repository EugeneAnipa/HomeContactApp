require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.json());

const homedb = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

Email1 = "qwerty@1.com";
Password1 = 1234;

app.get("/adminlogin", function (request, respond, next) {
  respond.render("adminlogin");
});

app.post("/adminlogin", function (request, respond) {
  let Email = request.body.email;
  let Password = request.body.password;
  var sql = "";

  /*
  homedb.query(sql, [Email, Password], function (err, result) {
    if (!err) {
      respond.render("admindash", { result });
    } else {
      respond.render("adminlogin");
    }
  });    */

  if (Email == Email1 && Password == Password1) {
    respond.send("success!");
  } else {
    respond.render("adminlogin", { invalid: "invalid" });
  }
  let token;
  try {
    //creating jwt token
    token = jwt.sign({ Email: Email1 }, "secret", { expiresIn: "1h" });
  } catch (err) {
    console.log(err);
    const error = new Error("Error ! something went wrong");
    return next(error);
  }
  response.status(200).json({
    success: true,
    data: {
      Email: Email1,
      token: token,
    },
  });
});

app.get("/adminsignUp", function (request, respond) {
  respond.render("adminsignUp");
});

app.post("/adminsignUp", function (request, respond) {
  let Email = request.body.email;
  let Password = request.body.password;
  let Firstname = request.body.firstname;
  let Lastname = request.body.lastname;
  let Role = request.body.role;
});

app.get("/admindash", function (request, respond) {
  var sql = "SELECT * FROM contacts ";
  homedb.query(sql, function (err, result) {
    console.log(result);

    if (err) {
      throw err;
    } else {
      respond.render("admindash", { contact: result });
    }
  });
});

app.post("/admindash", function (request, respond) {
  let Name = request.body.name;
  let Mobile = request.body.mobile;
  let Email = request.body.email;
  let Comments = request.body.comments;

  var sql = "INSERT INTO contacts(name,mobile,email,comments) VALUES (?,?,?,?)";
  homedb.query(sql, [Name, Mobile, Email, Comments], function (err, result) {
    if (err) throw err;
    console.log("contact inserted");
    respond.redirect("/admindash");
  });
});

app.get("/userlogin", function (request, respond) {
  respond.render("userlogin");
});

app.post("/userlogin", function (request, respond) {
  let Email = request.body.email;
  let Password = request.body.password;
});

app.get("/usersignup", function (request, respond) {
  respond.render("usersignup");
});
app.post("/usersignup", function (request, respond) {
  let Email = request.body.email;
  let Password = request.body.password;
  let Firstname = request.body.firstname;
  let Lastname = request.body.lastname;
});

app.post("/userlogin", function (request, respond) {});
app.listen(3000, function () {
  console.log("server started on port 3000");
});
