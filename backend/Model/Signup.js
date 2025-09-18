const express = require('express');
const mongoose = require ('mongoose');
const user = new mongoose.Schema({
        name:{ type: String, required: true },
        email:{ type: String, required: true },
        password:{ type: String, required: true },
        dob:{ type: Date, required: true },
        mobile:{ type: String, required: true },
        gender:{ type: String, required: true },
        photo:{ type: String }
});
module.exports = mongoose.model('User', user);