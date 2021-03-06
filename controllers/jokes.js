const queries = require("../database/jokequeries");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");

exports.postJoke = function(req,res){
    let username = jwt.decode(req.header("Authorization").replace("Bearer ",""))
    let content = req.body.content;
    let category = req.body.category;
    if (username && content && category){
        queries.insertJoke(username,content,category)
        .then((isSuccess) => {
            if (isSuccess){
                res.json({
                    Status: "Ok",
                    Message: "Joke saved"
                })
            } else {
                res.json({
                    Status: "Error",
                    Message: "Could not find Username"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                Status: "Error",
                Message: "An Error Occured"
            })
        })
    }
    else {
        res.json({
            Status: "Error",
            Message: "Missing fields"
        })
    }
}

exports.getJoke = function(req,res){
    let category = req.query.category;
    let limit = req.query.limit;
    if (category){
        if(!limit){
            limit = 20;
        }
        queries.getJokesByCategory(category,limit)
        .then((data) => {
            res.json({
                Status: "Ok",
                data: data
            })
        })
        .catch((err) => {
            res.json({
                Status: "Error",
                Message: "Could fetch jokes"
            })
        })
    } else {
        res.json({
            Status: "Error",
            Message: "Catergory field is missing"
        })
    }
}

exports.voteForJoke = function(req,res){
    let id = req.query.id
    let vote = req.query.vote
    let username = jwt.decode(req.header("Authorization").replace("Bearer ",""))
    if (id && vote && username){
        queries.voteJoke(id,vote,username)
        .then((isSuccess) => {
            if(isSuccess){
                res.json({
                    Status: "Ok",
                    Message: "Vote saved"
                })
            } else {
                res.json({
                    Status: "Error",
                    Message: "Could not save vote"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                Status: "Error",
                Message: "An Error Occured"
            })
        })
    } else {
        res.json({
            Status: "Error",
            Message: "Missing fields"
        })
    }
}