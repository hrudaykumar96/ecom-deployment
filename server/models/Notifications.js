const mongoose = require('mongoose');
const notificationschema = mongoose.Schema({
    notification:{
        type: String,
        required: true
    }, user:{
        type: mongoose.Types.ObjectId,
        ref:'Users'
    },
    readBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }
},{ timestamps: true });

module.exports = mongoose.model('Notifications', notificationschema);