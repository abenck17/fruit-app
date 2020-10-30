// node is the webserver
// express is the framework 
// localhost: 3000 refers to our computer, acting as a server

require('dotenv').config()
const express = require('express'); // require means import 
const app = express(); // app is an object 

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt; // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt
  
    console.log("Cookies: ", req.cookies.jwt);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err || !decodedUser) {
        return res.status(401).json({ error: "Unauthorized Request" });
      }
      req.user = decodedUser; // ADDS A .user PROP TO REQ FOR TOKEN USER
      console.log(decodedUser);
  
      next();
    });
  };

const methodOverride = require('method-override'); //include the method-override package
app.use(methodOverride('_method')); //after app has been defined, use methodOverride. //We'll be adding a query parameter to our delete form named _method  
app.use(express.static("public"));

// const fruits = require('./models/fruits.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package // fruits is our object

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: true }));
app.use('/auth', require('./controllers/authController.js'));
app.use('/fruits', verifyToken, require('./controllers/fruitsController.js'));
// ADD THE VERIFY TOKEN MIDDLEWARE WHERE WE WANT AUTHENTICATION
app.use("/users", verifyToken, require("./controllers/usersController.js"));



// New index page / 
app.get("/", (req, res) => {
      res.render("users/index.ejs");
    });


app.listen(process.env.PORT, ()=> { // tying this to our .env file PORT=3000
    console.log("I am listening...");
});
