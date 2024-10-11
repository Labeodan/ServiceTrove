const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const session = require("express-session");

// middleware
const checkUser = (req, res, next) => {
    if(req.session.user) {
        return res.redirect("/")
    }

    next()
}

const handleError = (res, error, message = "Internal Server Error", statusCode = 500) => {
    console.error(error);
    res.status(statusCode).render("error", { message }); // Assuming you have an 'error.ejs' page
};


// SIGNUP PAGE
router.get("/signup", checkUser, (req, res, next) => {
    try {
        const role = req.query.role

        if (role === "Customer" || role === "Business Owner") {
            return res.status(200).render("auth/signup", {
                role: role 
            })
        } else {
           return  next()
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})


router.post("/signup", async (req, res, next) => {
    try {
       const role = req.body.role;

         // check if password and confirm password match
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(422).send("<h1>passwords do not match</h1>")
        }

        // Hash password
        req.body.password = bcrypt.hashSync(req.body.password, 10)

        const createUser = await User.create(req.body)

        // Automatically sign them in
        req.session.user = {
            username: createUser.username,
            _id: createUser._id,
            role: createUser.role,
        }

        req.session.save(() => {
            if(role === "Business Owner") {
                res.redirect("/user/businessOwner")
            } else if (role === "Customer") {
                res.redirect("/user/customer")
            } else {
                next()
            }
        })


    } catch (error) {
        handleError(res, error);
    }
})



// Signin form
router.get("/signin", checkUser, (req, res, next) => {
    try {
        const role = req.query.role

        if (role === "Customer" || role === "Business Owner") {
            return res.status(200).render("auth/signin", {
                role: role 
            })
        } else {
            return next()
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})


// SIGNIN
router.post("/signin", async (req, res, next) => {
    try {
       const role = req.body.role;

        // find user trying to loginin
       const userInDatabase = await User.findOne({username: req.body.username})

       // Check if password provided matches the users password in the DB
       const userPassword = req.body.password
       const comparePassword = bcrypt.compareSync(userPassword, userInDatabase.password)

       // check role
       const checkRole = req.body.role === userInDatabase.role? true : false


        // validate user
       if (!userInDatabase) {
        console.log("user not found")
        return res.status(401).send("Login Failed, Plase Try Again")
       }


        // CREATE A SESSION TO SIGN THE USER IN.
        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id,
            role: userInDatabase.role,
        }

        // log user in        
        if (userInDatabase && comparePassword && checkRole) {
            req.session.save(() => {
                if(role === "Business Owner") {
                    res.redirect("/user/businessOwner")
                } else if (role === "Customer") {
                    res.redirect("/user/customer")
                } else {
                    next()
                }
            })

        } else {
            return res.status(401).send("Login Failed, Plase Try Again")
        }

    } catch (error) {
        console.log(error)
        handleError(res, error);
    }
})


router.get("/signout", (req, res) => {
    try {
        req.session.destroy();
        res.status(200).redirect("/")
    } catch (error) {
        handleError(res, error);
    }
})

















module.exports = router
