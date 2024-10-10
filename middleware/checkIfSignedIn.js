const checkIfSignedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).redirect("/auth/signin?role=Customer")
    } else {
        return next()
    }
}

module.exports = checkIfSignedIn