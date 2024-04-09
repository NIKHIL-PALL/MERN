
const express = require("express");
const router = express.Router();
const User = require('../model/UserModel');


router.get('/', async(req, res) => {
    try{

        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error : err.message});
    }

})
router.post('/', async(req, res) => {
    const {name, email, age} = req.body;
    try{

        const createdUser =await User.create({
            name,
            email, 
            age,
        });
        res.status(200).json(createdUser);
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error : err.message});
    }

})
router.get("/:uid", async(req, res) => {
    const {uid} = req.params;
    console.log(uid);
    try{

        const singleUser = await User.findById( {_id : uid});
        res.status(200).json(singleUser);
    }
    catch(err) {
        res.status(500).json({error : err.message});
    }

}) 

router.delete('/:uid', async(req, res) => {
    const {uid} = req.params;
    try{

        const user = await User.findByIdAndDelete(uid);
        res.status(200).json({message : "Deleted Successfully"});
    }
    catch(err) {
        res.status(500).json({err : err.message});
    }

} )

router.patch('/:uid',async (req, res) => {
    const {uid} = req.params;
    console.log(uid);
    const {name, email, age} = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(uid, req.body, {new : true});
        console.log(updatedUser)
        res.status(200).json(updatedUser);

    }
    catch(err) {
        res.status(500).json({error : err.message});
    }
})

module.exports = router;
