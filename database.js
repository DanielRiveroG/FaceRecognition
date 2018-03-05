let MongoClient = require('mongodb').MongoClient;
const url = "mongodb://admin:admin@ds233238.mlab.com:33238/recognition";

function getUser(query){
    return new Promise(function(fulfill, reject){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("recognition");
            /* Update one user
                var myquery = { name: "Roberto Diaz" };
            var newvalues = { $set: {job_position: "trainee"}};
            dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });*/
            dbo.collection("users").findOne(query, (err, res) => {
                if (err) reject(err);
                console.log(res);
                db.close();
                fulfill(res);
            })
        });
    })
}

function getMessages(query){
    return new Promise(function(fulfill, reject){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("recognition");
            /* Update one user
                var myquery = { name: "Roberto Diaz" };
            var newvalues = { $set: {job_position: "trainee"}};
            dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });*/
            dbo.collection("messages").findOne(query, (err, res) => {
                if (err) reject(err);
                console.log(res);
                db.close();
                fulfill(res);
            })
        });
    })
}

function updateUser(myquery, newvalues){
    return new Promise(function(fulfill, reject){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("recognition");
            dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
        });
    })
}

function insertManyUsers(obj){
    return new Promise(function(fulfill, reject){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("recognition");
            dbo.collection("users").insertMany(obj, (err, res) => {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            })
        });
    })
}

function insertUser(obj){
    return new Promise(function(fulfill, reject){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("recognition");
            dbo.collection("users").insertOne(obj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    })
}

module.exports.getUser = getUser;
module.exports.insertUser = insertUser;
module.exports.insertManyUsers = insertManyUsers;
module.exports.updateUser = updateUser;
module.exports.getMessages = getMessages;
