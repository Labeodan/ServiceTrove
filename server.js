const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv/config")
const port = process.env.PORT || 5000
const session = require("express-session");
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const Service = require("./models/services.js")




// ! MIDDLEWEAR FUNCTIONS
const passUserToView = require("./middleware/pass-user-to-view")
const checkIfSignedIn = require("./middleware/checkIfSignedIn")



// ! CONTROLLERS
const authRouter = require("./controllers/auth")
const serviceRouter = require("./controllers/services")
const usersrouter = require("./controllers/users.js")





// ! MIDDLEWEAR
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(morgan("dev"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
    }),
}))
app.use(passUserToView);

const handleError = (res, error, message = "Internal Server Error", statusCode = 500) => {
    console.error(error);
    res.status(statusCode).render("error", { message }); // Assuming you have an 'error.ejs' page
};



// ! ROUTE HANDLERS

// Landing Page
app.get("/", async (req, res) => {
    try {
        const services = await Service.find();
        // Slice the services array to get only the first 4 services
        const limitedServices = services.slice(0, 4);
        res.status(200).render("index", { services: limitedServices });
    } catch (error) {
        handleError(res, error);
    }
});


// Routes
app.use("/auth", authRouter);
app.use("/services", checkIfSignedIn, serviceRouter);
app.use("/user", checkIfSignedIn, usersrouter)





// ! 404 Handling
app.get("*", (req, res) => {
    res.status(404).render("404")
})



// ! Start Server
const startServer = async() => {
    try {
        // Connect to Database
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB")

        // start server
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}


startServer()
