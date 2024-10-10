const mongoose = require('mongoose');
const User = require('../models/users');
const Service = require('../models/services');
const userSeed = require('./users');
const serviceSeed = require('./services');
require("dotenv/config")

const seedDatabase = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')

        // Clear existing data
        await User.deleteMany({});
        await Service.deleteMany({});

        // Seed users
        const users = await userSeed();
        const createdUsers = await User.insertMany(users);

        // Get business owners only
        const businessOwners = createdUsers.filter(user => user.role === 'Business Owner');

        // Seed services using the business owners
        const services = serviceSeed(businessOwners);
        await Service.insertMany(services);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect(process.env.MONGODB_URI)
        console.log('MongoDB disconnected')
    }
};

seedDatabase();
