const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {User} = require('../models/user')

router.get('/', (req,res) => {
    User.find((err,docs)=> {
        if(!err) {
            res.send(docs);
        }
        else
        {
            console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
        }
        });
})

router.get('/:id', (req,res)=> {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No records with given id: ${req.params.id}`)
    }

    User.findById(req.params.id,(err,docs) => {
        if(!err) {
            res.send(docs);
        }
        else
        {
            console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req,res) => {
    var user = new User({
        name: req.body.name,
        dob: req.body.dob
    });

    user.save((err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in user save: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No records with given id: ${req.params.id}`)
    }

    var user = {
        name: req.body.name,
        dob: req.body.dob,
    }

    User.findByIdAndUpdate(req.params.id, user, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in user save: ' + JSON.stringify(err, undefined, 2));
        }
    })

})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No records with given id: ${req.params.id}`)
    }

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in user save: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = router;