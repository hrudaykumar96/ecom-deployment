const Users = require('../models/Users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify_token = require('../utils/authentication');
const Products = require('../models/Products');

/* user signup */
router.post('/signup/user',async(req,res)=>{
    try {
        const { name, email, mobile, password } = req.body;
        const is_emailexist = await Users.findOne({email});
        if(!is_emailexist){
            const is_mobile_numberexist = await Users.findOne({mobile});
            if(is_mobile_numberexist){
                res.json({
                    mobile:'mobile number already exist'
                })
            }
            else {
                const hashpassword = await bcrypt.hash(password,10);
                const newuser = new Users({
                    name, email, mobile, password: hashpassword
                });
                await newuser.save();
                res.json({
                    success: 'user created successfully'
                })
            }
        }
        else{
            res.json({
                email:'email already exist'
            })
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});


/* login user */
router.post('/login/user',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const existemail = await Users.findOne({email});
        if(existemail){
            const passwordmatch  = await bcrypt.compare(password,existemail.password);
            if(passwordmatch){
                const token = await jwt.sign({userId:existemail._id}, process.env.SECRET_KEY);
                res.json({
                    success: token
                })
            } else{
                res.json({
                    password:'incorrect password'
                })
            }
        } else{
            res.json({
                email:'email not registered'
            })
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
})

/* current user data */
router.get('/user/data',verify_token, async(req,res)=>{
    try {
        const user = req.user;
        res.json({
            success: user
        })
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
})

/* change user password */
router.post('/update/password',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const existemail = await Users.findOne({email});
        if(existemail){
            const hashpassword = await bcrypt.hash(password,10);
            existemail.password = hashpassword;
            existemail.save();
            res.json({
                success:'password updated successfully'
            })
        } else{
            res.json({
                email: 'email not registered'
            })
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
})

/* user update */
router.post('/update/user', verify_token, async(req,res)=>{
    try {
        const user = req.user;
        const { name, email, mobile, address } = req.body;
        const emailexist = await Users.findOne({email});
        if(emailexist && emailexist.id !== user.id){
            res.json({
                email: 'email already registered'
            })
        } else{
            const existmobile = await Users.findOne({mobile});
            if(existmobile && existmobile.id !== user.id){
                res.json({
                    mobile: 'mobile number already registered'
                })
            } else{
                user.name = name || user.name;
                user.email = email || user.email;
                user.mobile = mobile || user.mobile;
                user.address = address || user.address;
                user.save();
                res.json({
                    success:'updated successfully'
                })
            }
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});


/* get users data */
router.get('/get/users',verify_token,async(req,res)=>{
    try {
        const user = req.user;
        if(user.role === 'admin'){
            const allusers = await Users.find().sort({name:1});
            res.json({
                success: allusers
            })
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
})

/* get user by id */
router.get('/get/user/data/:id', verify_token, async(req,res)=>{
    try {
        const user = req.user;
        const { id } = req.params;
        if(user.role === 'admin'){
            const usersdata = await Users.findById(id);
            if(usersdata){
                res.json({
                    success: usersdata
                })
            } else{
                res.json({
                    error:'user not found'
                })
            }
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
})


/* updateuser */
router.post('/update/userbyid/:id', verify_token, async(req,res)=>{
    try {
       const user = req.user;
       const { name, email, mobile, address, role } = req.body;
       const { id } = req.params;
       if(user.role==='admin'){
        const usertoupdate = await Users.findById(id);
        if(usertoupdate){
            const emailexist = await Users.findOne({email});
            if(emailexist && emailexist.id!==usertoupdate.id){
                res.json({
                    email: 'email already registered'
                })
            } else {
                const mobileexist = await Users.findOne({mobile});
                if(mobileexist && mobileexist.id!==usertoupdate.id){
                    res.json({
                        mobile:'mobile number already exists'
                    })
                } else{
            usertoupdate.name = name || usertoupdate.name;
            usertoupdate.email = email || usertoupdate.email;
            usertoupdate.mobile = mobile || usertoupdate.mobile;
            usertoupdate.address = address || usertoupdate.address;
            usertoupdate.role = role || usertoupdate.role;
            usertoupdate.save();
            res.json({
                success:'updated successfully'
            })
        }
        }
        } else {
            res.json({
                error:'user not found'
            })
        }
       } 
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
})


/* delete user by id */
router.delete('/delete/user/:id', verify_token, async(req,res)=>{
    try {
        const { id } = req.params;
        const user = req.user;
        if(user.id === id){
            res.json({
                error:'cannot delete own account'
            })
        } 
        if(user.role === 'admin'){
            const usertodelete = await Users.findByIdAndDelete(id);
            if(!usertodelete){
                res.json({
                    error:'user not found'
                })
            } else{
                res.json({
                    success:'deleted successfully'
                })
            }
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});


/* seller management */
router.get('/seller/management', verify_token, async(req,res)=>{
    try {
        const user = req.user;
        if(user.role==='admin'){
            const sellers = await Users.find({role:'seller'}).sort({name:1});
            res.json({
                success: sellers
            })
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});


/* get sellerdata by id */
router.get('/get/seller/data/:id', verify_token, async(req,res)=>{
    try {
        const user = req.user;
        const id = req.params.id;
        if(user.role==='admin'){
            const userdata = await Users.findById(id);
            if(userdata){
                res.json({
                    success: userdata
                })
            } else{
                res.json({
                    error:'user not found'
                })
            }
        }

    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});

/* update sellers data */
router.post('/update/seller/management/:id', verify_token, async(req,res)=>{
    try {
        const user = req.user;
        const id = req.params.id;
        const { name, email, mobile, address, status } = req.body;
        const usertoupdate = await Users.findById(id);
        const emailavailable = await Users.findOne({email});
        if(emailavailable && emailavailable.id!==usertoupdate.id){
            res.json({
                email:'email already registered'
            })
        } 
        else{
            const mobileavailable = await Users.findOne({mobile});
            if(mobileavailable && mobileavailable.id!==usertoupdate.id){
                res.json({
                    mobile:'mobile number already registered'
                })
            } else{
                usertoupdate.name = name || usertoupdate.name;
                usertoupdate.email = email || usertoupdate.email;
                usertoupdate.mobile = mobile || usertoupdate.mobile;
                usertoupdate.address = address || usertoupdate.address;
                usertoupdate.status = status || usertoupdate.status;
                await usertoupdate.save();
                res.json({
                    success:'updated successfully'
                })
            }
        }
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});

/* delete sellers data */
router.delete('/delete/seller/management/:id', verify_token, async(req,res)=>{
    try {
        const id = req.params.id;
        const userProducts = await Products.find({ user: id });
        for (let product of userProducts) {
            if (product.images && product.images.length > 0) {
              for (let imagePath of product.images) {
                const fullImagePath = path.join(__dirname, '..', imagePath);
      
                if (fs.existsSync(fullImagePath)) {
                  fs.unlinkSync(fullImagePath);
                }
              }
            }
        }
        await Users.findByIdAndDelete(id);
        await Products.deleteMany({user:id});
        res.json({
            success:'user deleted successfully'
        })
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});

module.exports = router;