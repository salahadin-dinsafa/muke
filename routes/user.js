// third party package
const express = require('express');
const bcrypt = require('bcrypt');

// local package
const User = require('../model/user');
const routers = express.Router();

// featch all user's
routers.get('/',async (req,res)=>{
    try {
         const users = await User.find();
         res.json(users);
    } catch (error) {
       res.json({message:error}); 
    }
});

// user sign-up
routers.post('/signup', async (req,res)=>{
    try {
        const password = await bcrypt.hash(req.body.password,9);
        const user = new User({
        name:req.body.name,
        password:password
        });
         await user.save();
        res.json({message:'successfull'});
    } catch (error) {
        res.status(500).send();
    }
});

// user login
routers.post('/login',async(req,res)=>{

    const users = await User.find();
     const user = users.find(user => user.name === req.body.name);

    if(user==null){
        return res.status(400).send('connot find user');
    }
    try {
        if(await bcrypt.compare(req.body.password,user.password)){
            res.json({message:'successful'});
        }else{
            res.json({message:"In corretct passworod"});
        }
    } catch (error) {
        res.status(500).send();
    }
});

// fetch a user
routers.get('/:userId', async (req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(500).send();
    }
});

// delete a user
routers.delete('/:userId',async(req,res)=>{
  try {
   
    await User.findByIdAndRemove(req.params.userId);
    res.json({message:"successful"});
  } catch (error) {
    res.status(500).send();
  }
});

// delete All user user
routers.delete('/',async(req,res)=>{
  try {  
     await User.deleteMany();
     res.json({message:"successful"});
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = routers;