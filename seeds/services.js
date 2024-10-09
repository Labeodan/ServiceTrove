const Service = require('../models/services');
const mongoose = require('mongoose');

// Define service data
const services = (businessOwners) => [
    {
        name: 'Haircut',
        description: 'Professional haircut service',
        price: 50,
        serviceProvider: businessOwners[0]._id,
        timeslots: [
            { date: new Date(), time: '10:00 AM' },
            { date: new Date(), time: '11:00 AM' }
        ]
    },
    {
        name: 'Massage',
        description: 'Relaxing full-body massage',
        price: 100,
        serviceProvider: businessOwners[1]._id,
        timeslots: [
            { date: new Date(), time: '2:00 PM' },
            { date: new Date(), time: '3:00 PM' }
        ]
    },
    {
        name: 'Car Repair',
        description: 'Car repair and maintenance',
        price: 200,
        serviceProvider: businessOwners[2]._id,
        timeslots: [
            { date: new Date(), time: '4:00 PM' },
            { date: new Date(), time: '5:00 PM' }
        ]
    },
    {
        name: 'Dog Grooming',
        description: 'Full dog grooming service',
        price: 75,
        serviceProvider: businessOwners[0]._id,
        timeslots: [
            { date: new Date(), time: '12:00 PM' },
            { date: new Date(), time: '1:00 PM' }
        ]
    },
    {
        name: 'Plumbing',
        description: 'Expert plumbing services for home repairs',
        price: 150,
        serviceProvider: businessOwners[1]._id,
        timeslots: [
            { date: new Date(), time: '9:00 AM' },
            { date: new Date(), time: '10:00 AM' }
        ]
    },
    {
        name: 'House Cleaning',
        description: 'Complete house cleaning services',
        price: 120,
        serviceProvider: businessOwners[2]._id,
        timeslots: [
            { date: new Date(), time: '11:00 AM' },
            { date: new Date(), time: '12:00 PM' }
        ]
    },
    {
        name: 'Web Development',
        description: 'Custom web development services',
        price: 300,
        serviceProvider: businessOwners[0]._id,
        timeslots: [
            { date: new Date(), time: '3:00 PM' },
            { date: new Date(), time: '4:00 PM' }
        ]
    },
    {
        name: 'Photography',
        description: 'Professional photography for events',
        price: 400,
        serviceProvider: businessOwners[1]._id,
        timeslots: [
            { date: new Date(), time: '5:00 PM' },
            { date: new Date(), time: '6:00 PM' }
        ]
    },
    {
        name: 'Painting',
        description: 'Residential and commercial painting services',
        price: 250,
        serviceProvider: businessOwners[2]._id,
        timeslots: [
            { date: new Date(), time: '7:00 AM' },
            { date: new Date(), time: '8:00 AM' }
        ]
    },
    {
        name: 'Yoga Classes',
        description: 'Yoga classes for stress relief and fitness',
        price: 50,
        serviceProvider: businessOwners[0]._id,
        timeslots: [
            { date: new Date(), time: '9:00 AM' },
            { date: new Date(), time: '10:00 AM' }
        ]
    },
    {
        name: 'Fitness Training',
        description: 'Personalized fitness training sessions',
        price: 100,
        serviceProvider: businessOwners[1]._id,
        timeslots: [
            { date: new Date(), time: '11:00 AM' },
            { date: new Date(), time: '12:00 PM' }
        ]
    },
    {
        name: 'Catering',
        description: 'Catering services for events',
        price: 500,
        serviceProvider: businessOwners[2]._id,
        timeslots: [
            { date: new Date(), time: '1:00 PM' },
            { date: new Date(), time: '2:00 PM' }
        ]
    },
    {
        name: 'Car Detailing',
        description: 'Comprehensive car detailing services',
        price: 100,
        serviceProvider: businessOwners[0]._id,
        timeslots: [
            { date: new Date(), time: '3:00 PM' },
            { date: new Date(), time: '4:00 PM' }
        ]
    },
    {
        name: 'Gardening',
        description: 'Professional gardening and landscaping services',
        price: 75,
        serviceProvider: businessOwners[1]._id,
        timeslots: [
            { date: new Date(), time: '5:00 PM' },
            { date: new Date(), time: '6:00 PM' }
        ]
    },
    {
        name: 'Graphic Design',
        description: 'Custom graphic design services for businesses',
        price: 350,
        serviceProvider: businessOwners[2]._id,
        timeslots: [
            { date: new Date(), time: '9:00 AM' },
            { date: new Date(), time: '10:00 AM' }
        ]
    }
];

module.exports = services;
