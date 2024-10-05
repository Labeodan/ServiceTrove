const express = require("express")
const router = express.Router()
const User = require("../models/users")





// SIGNUP PAGE
router.get("/signup", async (req, res, next) => {
    try {
        const role = req.query.role
        if (role === "Customer" || role === "Business Owner") {
            res.status(200).render("auth/signup", {role: role})
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
})














module.exports = router
