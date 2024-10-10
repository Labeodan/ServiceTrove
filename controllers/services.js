const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Service = require("../models/services");
const { checkIfBusinessOwner, checkIfCustomer } = require("../middleware/checkRole");
const upload = require("../middleware/upload")

// middleware
const compareIdOfOwner = (req, res, next) => {
    if(req.session.user._id !== req.params.userId) {
        console.log(req.session.user._id)
        console.log(req.params.serviceId)
        return res.redirect("/")
    }
    next()
}

// get all services 
router.get("/", checkIfCustomer, async (req, res) => {
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


// create a new service page //!Business Owner
router.get("/new", checkIfBusinessOwner, (req, res) => {
    return res.status(200).render("services/create")
})

// get a specific service //! Both roles can view, just edit what each one can do
router.get("/:serviceId", async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId)
        // console.log(service)
        
        res.status(200).render("services/view", {
            service: service
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

// get the edit route //! Business Owner But still edit which business owner can edit
router.get("/:serviceId/edit", checkIfBusinessOwner, async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId)
        res.status(200).render("services/edit", {
            service: service
        })
    } catch (error) {
        console.log(error)
    }
})

// PUT request to update the service //! Business Owner But still edit which business owner can edit
router.put("/:serviceId", checkIfBusinessOwner, upload.single("serviceImage"), async (req, res) => {
    try {
        // Extract the service ID from the route parameters
        const  serviceId  = req.params.serviceId

        if (req.file) {
            req.body.image = req.file.path            
        }

        // Extract form data from the request body
        const { name, description, price, timeslots, image } = req.body;
        console.log(req.body)
        
        // If you're handling file uploads (like images), you can handle that here
        let updatedData = {
            name,
            description,
            price,
            timeslots, // Assuming timeslots come in a suitable format
            image
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

// delete service //! Business Owner But still edit which business owner can edit
router.delete("/:serviceId", checkIfBusinessOwner, async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.serviceId);
        res.redirect("/services"); // Redirect to the services list page after deletion
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting the service");
    }
});



// get all the services created by a specific user //! Business Owner 
router.get("/created-by/:userId", checkIfBusinessOwner, compareIdOfOwner, async (req,res) => {
    try {
        const services = await Service.find({ serviceProvider: req.params.userId });
        res.status(200).render("services/singleUser", {
            services: services
        })
    } catch (error) {
        console.log(error)
    }
})




// create a new service //! Business Owner 
router.post("/", checkIfBusinessOwner, upload.single("serviceImage"), async (req, res) => {
    try {

        if (req.file) {
            req.body.image = req.file.path            
        }
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