const express = require("express")
const router = express.Router();


// const checkRoleCustomer = (req, res, next) => {
//     if (req.session.role !== "Customer") {
//         res.status(401).redirect("/auth/signin?role=Customer")
//     } 

//     next()
// }

// const checkRoleBusinessOwner = (req, res, next) => {
//     if (req.session.role !== "Business Owner") {
//         res.status(401).redirect("/auth/signin?role=Business%20Owner")
//     } 

//     next()
// }




// Customer Landing Page
router.get("/customer", (req, res, next) => {
    try {
        // prevent unauthorised role from having access
        if (res.locals.user.role && res.locals.user.role !== "Customer") {
            return res.status(401).redirect("/auth/signin?role=Customer")
        } else {
            return res.status(200).render("users/customer")
        }
    } catch (error) {
        console.log(error)
    }

    next()
})



// Business Owner Landing Page
router.get("/businessOwner", (req, res, next) => {
   try {
    // prevent unauthorised role from having access
     if (res.locals.user.role && res.locals.user.role !== "Business Owner") {
         return res.status(401).redirect("/auth/signin?role=Business%20Owner")
     } else {
         return res.status(200).render("users/businessOwner", {
            businessOwnerId: res.locals.user._id
         })
     }
 
    } catch (error) {
        console.log(error)
    }
    
    next()
})





module.exports = router

