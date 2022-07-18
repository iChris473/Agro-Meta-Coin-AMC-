
require('dotenv').config()
const express = require('express')
const app = express()
require("./models/db");
const cors = require("cors")

app.enable('trust proxy')

app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})

// serve your css as static
app.use('/public', express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ALL API ROUTES
const router = require("./route/routes")

app.use("/api", router)

// index route for User Domain
app.get("/", (req, res) => res.render("./pages/index"))

// Register route for User Domain
app.get("/register", (req, res) => res.render("./pages/register"))

// Login route for User Domain
app.get("/login", (req, res) => res.render("./pages/login"))


// PROCESS OF VERIFICATIONS WITH EMAILS

// Checkemail route for User Domain
app.get("/checkemail", (req, res) => res.render("./pages/checkemail"))

// Confirmed Email route for User Domain
app.get("/confirmed", (req, res) => res.render("./pages/confirmed"))

// Reset Password route for User Domain
app.get("/reset", (req, res) => res.render("./pages/reset"))

// Password Email route for User Domain
app.get("/passemail", (req, res) => res.render("./pages/passemail"))

// Update pass route for User Domain
app.get("/updatepass", (req, res) => res.render("./pages/updatepass"))

// Airdrop pass route for User Domain
app.get("/airdrop", (req, res) => res.render("./pages/airdrop"))

// editPassword pass route for User Domain
app.get("/editpassword", (req, res) => res.render("./pages/editpass"))

// editProfile pass route for User Domain
app.get("/editemail", (req, res) => res.render("./pages/editemail"))

// editProfile pass route for User Domain
app.get("/editbsc", (req, res) => res.render("./pages/editbsc"))

// editProfile pass route for User Domain
app.get("/dashboard", (req, res) => res.render("./pages/dashboard"))

// Presale pass route for User Domain
app.get("/presale", (req, res) => res.render("./pages/presale"))

// Roadmap pass route for User Domain
app.get("/roadmap", (req, res) => res.render("./pages/roadmap"))

// White pass route for User Domain
app.get("/white", (req, res) => res.render("./pages/white"))

// White pass route for User Domain
app.get("/emailer", (req, res) => res.render("./pages/emailer"))

// FAQ route for User Domain
app.get("/faq", (req, res) => res.render("./pages/faq"))



// DASHBOARD ROUTES

// DEPOSIT route for User Domain
app.get("/coming", (req, res) => res.render("./pages/coming"))

// TRANSFER route for User Domain
app.get("/transfer", (req, res) => res.render("./pages/transfer"))

// TRANSFER route for User Domain
app.get("/bnb", (req, res) => res.render("./pages/bnb"))



// ADMIN ROUTES //

// Home Route
app.get("/admin", (req, res) => res.render("./admin/index"))
// User Route
app.get("/admin/users", (req, res) => res.render("./admin/users"))
// Password Work Route
app.get("/admin/adminpass", (req, res) => res.render("./admin/adminpass"))
// EMail Work Route
app.get("/admin/adminemail", (req, res) => res.render("./admin/adminemail"))
// LOGIN Work Route
app.get("/admin/login", (req, res) => res.render("./admin/login"))
// This User Route
app.get("/admin/thisuser", (req, res) => res.render("./admin/thisuser"))
// History route for Admin Domain
app.get("/admin/history", (req, res) => res.render("./admin/history"))
// Presale route for Admin Domain
app.get("/admin/presales", (req, res) => res.render("./admin/presales"))
// Now Payments route for Admin Domain
app.get("/admin/payments", (req, res) => res.render("./admin/payments"))
// Admin route for This Presale
app.get("/admin/thispresale", (req, res) => res.render("./admin/thispresale"))
// Route for Generating CSV files
app.get("/admin/generate", (req, res) => res.render("./admin/generate"))


const port = process.env.PORT || 8800
app.listen(port, () => console.log(`Backend running on ${port}`))