const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Service = require("../models/services");
const { checkIfBusinessOwner, checkIfCustomer } = require("../middleware/checkRole");
const upload = require("../middleware/upload");

//! middleware
const compareIdOfOwner = (req, res, next) => {
    if (req.session.user._id !== req.params.userId) {
        return res.redirect("/");
    }
    next();
};

// Error handling middleware
const handleError = (res, error, message = "Internal Server Error", statusCode = 500) => {
    console.error(error);
    res.status(statusCode).render("error", { message }); // Assuming you have an 'error.ejs' page
};

// 404 handler
const handleNotFound = (res, message = "Resource not found") => {
    res.status(404).render("404", { message }); // Assuming you have a '404.ejs' page
};


// ! ROUTES
// Get all services
router.get("/", checkIfCustomer, async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).render("services/allServices", { services });
    } catch (error) {
        handleError(res, error);
    }
});



// Create a new service page (Business Owner)
router.get("/new", checkIfBusinessOwner, (req, res) => {
    res.status(200).render("services/create");
});



// Get a specific service
router.get("/:serviceId", async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId);
        if (!service) {
            return handleNotFound(res, "Service not found");
        }
        res.status(200).render("services/view", { service });
    } catch (error) {
        handleError(res, error);
    }
});




// Get the edit route (Business Owner)
router.get("/:serviceId/edit", checkIfBusinessOwner, async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId);
        if (!service) {
            return handleNotFound(res, "Service not found");
        }
        res.status(200).render("services/edit", { service });
    } catch (error) {
        handleError(res, error);
    }
});




// Update the service (Business Owner)
router.put("/:serviceId", checkIfBusinessOwner, upload.single("serviceImage"), async (req, res) => {
    try {
        const serviceId = req.params.serviceId;

        if (req.file) {
            req.body.image = req.file.path;
        }

        const { name, description, price, timeslots, image } = req.body;

        const updatedData = {
            name,
            description,
            price,
            timeslots,
            image,
        };

        const updatedService = await Service.findByIdAndUpdate(serviceId, updatedData, { new: true });

        if (!updatedService) {
            return handleNotFound(res, "Service not found for update");
        }

        res.redirect(`/services/${updatedService._id}`);
    } catch (error) {
        handleError(res, error, "Error updating service");
    }
});




// Delete service (Business Owner)
router.delete("/:serviceId", checkIfBusinessOwner, async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.serviceId);
        if (!service) {
            return handleNotFound(res, "Service not found for deletion");
        }
        res.redirect("/services");
    } catch (error) {
        handleError(res, error, "Error deleting service");
    }
});




// Get all the services created by a specific user (Business Owner)
router.get("/created-by/:userId", checkIfBusinessOwner, compareIdOfOwner, async (req, res) => {
    try {
        const services = await Service.find({ serviceProvider: req.params.userId });
        res.status(200).render("services/singleUser", { services });
    } catch (error) {
        handleError(res, error);
    }
});




// Create a new service (Business Owner)
router.post("/", checkIfBusinessOwner, upload.single("serviceImage"), async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }

        req.body.serviceProvider = req.session.user._id;

        const service = await Service.create(req.body);
        res.status(200).redirect("/services");
    } catch (error) {
        handleError(res, error, "Error creating service");
    }
});




module.exports = router;
