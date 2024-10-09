const checkRole = (req, res, next) => {
    if(req.session.role === "Business Owner") {
        res.redirect("user/businessOwner")
    } else if (req.session.role === "Customer") {
        res.redirect("user/customer")
    } else {
        next()
    }
}

module.exports = checkRole;