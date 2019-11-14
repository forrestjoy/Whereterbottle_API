var express =require("express"),
    app = express(),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    gurl = "mongodb://localhost:27017/",
    mdb;
var DbConnection = function(){
    var db = null;
    var instantiation = 0;
    async function DbConnect(){
	try{
	    let _db=await MongoClient.connect(gurl,{useNewUrlParser:true},{poolSize:10});
	    return _db;
	}catch(e){
	    return e;
	}
    }
    async function Get(){
	try{
	    instantiation++;
	    console.log("Connect called "+instantiation+" times");
	    if(db!=null){
		console.log('Already Connected');
		return db;
	    }else{
		console.log('Geetting new connection');
		db = await DbConnect();
		return db;
	    }
	}catch(e){
	    return e;
	}
    }
    return {
	Get:Get
    }
}
    module.exports = DbConnection();























    /*
app.post("/partialobj", (req, res, next) => {
        console.log('body: ', req.body);
        var query=req.body;//search by all parameters given in
	var dbo = mdb.db("mockdb");
	getpartialobj(query,dbo,res);
    });
//var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.listen(3000,() =>{
	console.log("Server running on port 3000");
	///////////////////////////////
    });

function getpartialobj(query,dbo,res)
{
    dbo.collection("forms").find(query,{projection:{_id:1,description:1,part_type:1,revision:1}}).toArray(function(err, result){
	    if (err) throw err;
	    res.json(result);
	    console.log(result);
	});
}

    */

//look up managing connections with pool in mongodb driver