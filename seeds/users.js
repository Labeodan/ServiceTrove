const bcrypt = require('bcrypt');
const User = require('../models/users');

// Password hashing utility
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Define user data with password as 'pass'
const users = async () => [
    {
        username: 'businessOwner1',
        password: await hashPassword('pass'),
        role: 'Business Owner'
    },
    {
        username: 'businessOwner2',
        password: await hashPassword('pass'),
        role: 'Business Owner'
    },
    {
        username: 'businessOwner3',
        password: await hashPassword('pass'),
        role: 'Business Owner'
    },
    {
        username: 'customer1',
        password: await hashPassword('pass'),
        role: 'Customer'
    },
    {
        username: 'customer2',
        password: await hashPassword('pass'),
        role: 'Customer'
    }
];

module.exports = users;
