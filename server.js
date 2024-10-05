const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv/config")
const port = process.env.PORT
const authRouter = require("./controllers/auth")


// ! MIDDLEWEAR FUNCTIONS



// ! CONTROLLERS




// ! MIDDLEWEAR
app.set("view engine", "ejs")





// ! ROUTE HANDLERS

// Landing Page
app.get("/", (req, res) => {
    res.status(200).render("index")
})


// Routes
app.use("/auth", authRouter);






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
