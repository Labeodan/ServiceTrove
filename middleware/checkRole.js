const checkIfCustomer = (req, res, next) => {
    if (req.session.user && req.session.user.role !== "Customer"){
            return res.redirect(`/user/${(req.session.user.role).split(" ").join("")}`)
    } else {
        return next()
    }
}


const checkIfBusinessOwner = ( req, res, next) => {
    if (req.session.user && req.session.user.role !== "Business Owner"){
            return res.redirect(`/user/${(req.session.user.role).split(" ").join("")}`)
    } else {
        return next()
    }
}

module.exports = {
    checkIfCustomer,
    checkIfBusinessOwner
};