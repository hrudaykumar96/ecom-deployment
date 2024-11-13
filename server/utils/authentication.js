const jwt = require('jsonwebtoken');
const Users = require('../models/Users');



const verify_token=async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(token){
            const id = jwt.verify(token,process.env.SECRET_KEY);
            if(id){
                const userdata = await Users.findById(id.userId);
                if(userdata){
                    req.user = userdata
                    return next();
                } else{
                    res.json({
                        error: 'unauthorised user'
                    }) 
                }
            } else{
                res.json({
                    error: 'unauthorised user'
                })
            }
        } else{
            res.json({
                error: 'unauthorised user'
            })
        }

    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
}

module.exports = verify_token