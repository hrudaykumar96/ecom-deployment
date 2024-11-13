const express = require('express');
const router = express.Router();
const verify_token = require('../utils/authentication');
const Notifications = require('../models/Notifications');

router.post('/post/notifications', verify_token, async(req, res)=>{
    try {
        const content = req.body.content;
        const notifications = await new Notifications({
            notification: content
        })
        await notifications.save();
        res.json({
            success:'notification posted successfully'
        })
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});

router.get('/get/notifications', verify_token, async(req,res)=>{
    try {
        const notification = await Notifications.find().sort({createdAt:-1});
        res.json({
            success: notification
        })
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});

router.patch('/get/notification/:id', verify_token, async(req, res)=>{
    try {
        const user = req.user;
        const id = req.params.id;
        const notification = await Notifications.findById(id);
        if (!notification.readBy.includes(user._id)) {
            notification.readBy.push(user._id);
            await notification.save();
          }
            res.json({
                success: notification
            })
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
})

module.exports = router;