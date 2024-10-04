const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv/config")
const port = process.env.PORT
const router = express.Router()


// ! MIDDLEWEAR FUNCTIONS



// ! CONTROLLERS




// ! MIDDLEWEAR





// ! ROUTE HANDLERS

// Landing Page
app.get("/", (req, res) => {
    res.status(200).send("<h1>This is the landing Page</h1>")
})


// Routes




// ! 404 Handling
app.get("*", (req, res) => {
    res.status(404).send("<h1>Page Not Found</h1>")
})















// ! Start Server
const startServer = () => {
    try {
        // start server
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}


startServer()
