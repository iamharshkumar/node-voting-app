var express = require("express");
var router  = express();
var Pusher  = require("pusher");

var Vote = require("../models/Vote")

var mongoose = require("mongoose");

var pusher = new Pusher({
  appId: '481908',
  key: 'd19ba6f5456c6da6d5bd',
  secret: '51cc878282d5cf75ef8a',
  cluster: 'ap2',
  encrypted: true
});

router.get("/", function(req , res){
    Vote.find().then(votes => res.json({success:true,
    votes: votes}))
});

router.post("/", function(req, res){
    
    var newVote = {
        os:req.body.os,
        points: 1
    }
    new Vote(newVote).save().then(vote =>{
           
    pusher.trigger('os-vote', 'os-vote', {
  points: parseInt(vote.points),
  os: vote.os
});
    return res.json({success: true, message:"thank you for vote"});
    });
    
 
});

module.exports = router;


