const DbConnection=require('./connect');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

class CallHelper{
    constructor()
    {
    
    }    

    /////
    async getuser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
            var dbo=dba.db("where");//Establish the DB being used
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where th
	    dbo.collection("user").find(payload).toArray(function(err, result){
		    if (err) throw err;
		    res.json(result);
		});
	}catch(e){
	    var errorstring=null;
	    console.log('Failed to get user');
	    return errorstring;
	}
    }

    /////
    /*
      Function makuser--> 
      Purpose: Makeuser is called in order to create a JSON object that contains all of a user's information. This insertion will result in an ObjectId() of the inserted document which becomes the primary key of that user when inserted. 
      Parameters: payload is the req.body passed to this function which contains the information which resides within the object being inserted to the database... res: res is the response element of the route that calls this function and allows for the return of information from the database to the I.P. requesting the information.
    */
    /////
    async  makeuser(payload,res){
        try{
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
            var fname=payload.first_name;
	    var lname=payload.last_name;
	    var email=payload.email;
	    var address=payload.address;
	    var myobj={"first_name":fname,"last_name":lname,"bottle_id":[""],"last_fill":"","favorites":[""],"friends":[""],"email":email,"address":address};
	    dbo.collection("user").insertOne(myobj, function(err, result) {
		    if (err) throw err;
		    console.log(result.insertedId);
		    res.json(result.insertedId);
		});
        }catch(e){
            console.log('failed to insert user');
	    console.log(e);
            return e;
        }
    }

    /////

    /////
    async  deleteuser(payload,res){
        try{
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
	    var address=payload.address;
	    var myobj={"_id":ObjectId(payload._id)};
	    dbo.collection("user").deleteOne(myobj, function(err, obj) {
		    if (err) throw err;
		    console.log("1 document deleted");
		    res.json('Account Successfully Deleted');
		});
        }catch(e){
            console.log('failed to delete user');
            console.log(e);
            return e;
        }
    }
    /////
    async getuserbyid(payload,res){
        try{
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
            var address=payload.address;
            var myobj={"_id":ObjectId(payload._id)};
	    dbo.collection("user").find(myobj).toArray(function(err, result){
                    if (err) throw err;
                    res.json(result);
                });
        }catch(e){
            console.log('failed to delete user');
            console.log(e);
            return e;
        }
    }
    /////
    async addbottletouser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & returnsingleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where th
	    var searchId=ObjectId(payload._id);
	    var bottle_id = payload.bottle_id;
	    dbo.collection("user").updateOne({"_id":searchId},{"$push":{"bottle":bottle_id}},function(err, result){
		    if (err) throw err;
		    res.json("Your new friend was added. It is: "+bottle_id);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }
    async removebottletouser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & returnsingleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where th  
	    var searchId=ObjectId(payload._id);
	    var bottle_id = payload.bottle_id;
	    dbo.collection("user").updateOne({"_id":searchId},{"$pull":{"bottle":bottle_id}},function(err, result){
		    if (err) throw err;
		    res.json("Your bottle was removed: "+bottle_id);
		});
        }catch(e){
            console.log('Failed to delete bottle');
            return e;
        }
    }
    /////

    async addfriendtouser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from servSer to 
	    var dbo=dba.db("where");//Establish the DB being used
	    //Search user collection for document matching information passed in the payload.If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var friend_id = payload.friend_id;
	    dbo.collection("user").updateOne({"_id":searchId},{"$push":{"friends":friend_id}},function(err, result){
		    if (err) throw err;
		    res.json("Your new friend was added. It is: "+friend_id);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }
    /////
    async removefriendtouser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from servSer to
	    var dbo=dba.db("where");//Establish the DB being used
            //Search user collection for document matching information passed in the payload.If found send the result in json format back to the hert
	    var searchId=ObjectId(payload._id);
	    var friend_id = payload.friend_id;
	    dbo.collection("user").updateOne({"_id":searchId},{"$pull":{"friends":friend_id}},function(err, result){
		    if (err) throw err;
		    res.json("Your new friend was removed. It is: "+friend_id);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }
    /////
    async addfavoritetouser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var fountain_id = payload.fountain_id;
	    dbo.collection("user").updateOne({"_id":searchId},{"$push":{"favorites":fountain_id}},function(err, result){
		    if (err) throw err;
		    res.json("Your new favorite was added. It is: "+fountain_id);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }    
    /////
    async removefavoritetouser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var fountain_id = payload.fountain_id;
	    dbo.collection("user").updateOne({"_id":searchId},{"$pull":{"favorites":fountain_id}},function(err, result){
		    if (err) throw err;
		    res.json("Your new favorite was removed. It is: "+fountain_id);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }    
    /////
    async changeuseraddress(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var address = payload.newaddress;
	    dbo.collection("user").updateOne({"_id":searchId},{$set:{"address":address}},function(err, result){
		    if (err) throw err;
		    res.json("Address updated. New address: "+address);
		});
        }catch(e){
            console.log('Failed to update address');
            return e;
        }
    }    
    /////
    /*    async getpartialuser(payload,res){
	try{
	    let dba=await DbConnection.Get();
	    var dbo=dba.db("where");
	    var searchId=ObjectId(payload._id);
	    ////

	    ////
	}catch(e){
	    console.log('Failed to get users');
	    return e;
	}
    }
    */
    /////
    async makebottle(payload,res){
        try{
            ////
	    let dba=await DbConnection.Get();
            var dbo=dba.db("where");
	    var size=payload.size;
	    var total_refills=0;
	    var day_refills=0;
	    var x_coord="";
	    var y_coord="";
	    var myobj={};
	    dbo.collection("bottle").insertOne(myobj, function(err, result) {
		    if (err) throw err;
		    console.log(result.insertedId);
		    res.json(result.insertedId);
		});
	    ////
        }catch(e){
            console.log('Failed to get users');
            return e;
	}
    }
    /////





};

module.exports=CallHelper;