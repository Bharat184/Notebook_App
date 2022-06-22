const express=require('express');
const User=require('../models/User');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const JWT_Secret='BharatChimariya'; //jwt authentication..
const jwt=require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');

//Create a user using: POST '/api/auth'.  doesn't require auth no login required..
// Route 1 to create New User.
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be a minimum of 5 characters.').isLength({min: 5}),

], async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array()}); //If there are errors return bad request..
    }
//Check whether the user with this email exists already
    try{
        let user = await User.findOne({email:req.body.email});
        // console.log(user);
        if(user){
            return res.status(400).json({"error":"Sorry a User already exists."})
        }

        const salt= await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);


        //Create a New User
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
        })
        const data={
            user: {
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_Secret);
        

        // .then(user=>res.json(user))
        // .catch(err=>console.log(err));
        // res.json({"error":'please enter a unique value for email'});
        // res.json(user);
        res.json({"success":"true","authToken":authToken});
    } 
    catch(error) {
            res.status(500).send("Internal Server Error");
    }
})

//authenticate a user using: POST "/api/auth/login". No login required.
//Route 2 to Authenticate.
router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be Blank.').exists(),

], async (req,res)=>{
        //If there is any errors
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array()}); //If there are errors return bad request..
        }
        const {email,password}=req.body;
        try {
            let user=await User.findOne({email});
            if(!user)
            {
                return res.status(400).json({error:"Invalid Credentials"});
                
            }
            const passCompare= await bcrypt.compare(password,user.password);
            if(!passCompare)
            {
                return res.status(400).json({error:"Invalid Credentials"});
            }
            const data={
                user: {
                    id:user.id
                }
            }
            const authToken=jwt.sign(data,JWT_Secret);
            res.json({"Success":"true",
        "authToken":authToken});
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
});

//Route 3: Get loggedin User Details.
router.post('/getuser',fetchUser, async (req,res)=>{
    try {
        const  userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}
);


module.exports=router;