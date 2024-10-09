const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Service = require("../models/services")



// get all services
router.get("/", async (req, res) => {
    try {
        const services = await Service.find()
        console.log(services)

        res.status(200).render("services/allServices", {
            services: services
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})


// create a new service page
router.get("/new", (req, res) => {
    return res.status(200).render("services/create")
})


// get a specific service
router.get("/:serviceId", async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId)
        console.log(service)

        res.status(200).render("services/view", {
            service: service
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})


// get all the services created by a specific user
router.get("/created-by/:userId", async (req,res) => {
    res.status(200).render("services/singleUser")
})




// create a new service
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        req.body.serviceProvider = req.session.user._id
        const service = await Service.create(req.body)
        console.log(service)
        return res.status(200).redirect("/services")
    } catch (error) {
        console.log(error)
    }
})















module.exports = router