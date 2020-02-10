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
