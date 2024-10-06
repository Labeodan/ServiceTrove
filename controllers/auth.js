const express = require("express")
const router = express.Router()
const User = require("../models/users")





// SIGNUP PAGE
router.get("/signup", (req, res, next) => {
    try {
        const role = req.query.role

        if (role === "Customer" || role === "Business Owner") {
            res.status(200).render("auth/signup", {
                role: role 
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


router.post("/signup", async (req, res, next) => {
    try {
       role = req.body.role

       if (role === "Customer") {
        res.status(200).render("users/customer")
       } else if (role === "Business Owner") {
        res.status(200).render("users/businessOwner")
       } else {
        next()
       }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})














module.exports = router
