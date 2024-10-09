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

// get the edit route
router.get("/:serviceId/edit", async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId)
        res.status(200).render("services/edit", {
            service: service
        })
    } catch (error) {
        console.log(error)
    }
})

// PUT request to update the service
router.put("/:serviceId", async (req, res) => {
    try {
        // Extract the service ID from the route parameters
        const  serviceId  = req.params.serviceId

        // Extract form data from the request body
        const { name, description, price, timeslots } = req.body;
        console.log(req.body)
        
        // If you're handling file uploads (like images), you can handle that here
        let updatedData = {
            name,
            description,
            price,
            timeslots // Assuming timeslots come in a suitable format
        };

        // Find the service by ID and update it with the new data
        const updatedService = await Service.findByIdAndUpdate(serviceId, updatedData, { new: true });

        // Redirect the user to the updated service page or another route
        

        res.redirect(`/services/${updatedService._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating service");
    }
});



// get all the services created by a specific user
router.get("/created-by/:userId", async (req,res) => {
    try {
        const services = await Service.find({ serviceProvider: req.params.userId });
        res.status(200).render("services/singleUser", {
            services: services
        })
    } catch (error) {
        console.log(error)
    }
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