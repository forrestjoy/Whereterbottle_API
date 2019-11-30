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
	    var searchId=ObjectId(payload._id);
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
    async getuserbyid(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
            var dbo=dba.db("where");//Establish the DB being used
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where th
	    var searchId={"_id":ObjectId(payload._id)};
	    dbo.collection("user").findOne(searchId).toArray(function(err, result){
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
	    var myobj={"first_name":fname,"last_name":lname,"bottle_id":"","last_fill":"","favorites":[],"friends":[],"email":email,"address":address};
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
            var dbo=dba.db("where"),
		address=payload.address,
		myobj={"_id":ObjectId(payload._id)},
		tempuser;
		dbo.collection("user").findOne(myobj,function(err, result){
			if (err) throw err;
			//res.json(result);
			tempuser=result;
			tempuser.bottle_id.forEach(bottle_id => {
				var tempobj={"_id":ObjectId(bottle_id)};
				dbo.collection("bottle").deleteOne(tempobj, function(err, obj) {
					if (err) throw err;
					console.log("1 Bottle deleted");
				    });
				//console.log("BOTTLE ID TYPE : ",typeof(String(bottle_id)));
			    });
			dbo.collection("user").deleteOne(myobj, function(err, obj){
				if (err) throw err;
				console.log("1 document deleted");
				res.json('Account Successfully Deleted');
			    });
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
     /////+++++++++++++++++++++++++++++++++++++++++
    /////
    /*
    async removebottletouser(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from servSer to
	    var dbo=dba.db("where");//Establish the DB being used
            //Search user collection for document matching information passed in the payload.If found send the result in json format back to the hert
	    var searchId=ObjectId(payload._id);
	    var b_id = payload.bottle_id;
	    console.log(typeof(b_id));
	    dbo.collection("user").updateOne({"_id":searchId},{"$pull":{"bottle_id":b_id},function(err, result){
			if (err) throw err;
			res.json("Your bottle was removed. It is: "+bottle_id);
		    });
		}catch(e){
		console.log('Failed to get user');
		return e;
	    }
	}
    */
    /////
	/////+++++++++++++++++++++++++++++++++++++++++
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
		    //res.json("Your new friend was removed. It is: "+friend_id);
		    res.json(result);
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
    ////
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
    async changeuseremail(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var email = payload.email;
	    dbo.collection("user").updateOne({"_id":searchId},{$set:{"email":email}},function(err, result){
		    if (err) throw err;
		    res.json("Email updated. New email: "+email);
		});
        }catch(e){
            console.log('Failed to update email');
            return e;
        }
    }    
    /////

    ////////*************************
    /*
      BOTTLE HELPER FUNCTIONS: QUERY THE BOTTLE COLLECTION WITHIN THE MONGODB
    */
    ////////*************************


    /////

    async makebottle(payload,res){
	var bottle_id;
        try{
            ////
	    let dba=await DbConnection.Get();
            var dbo=dba.db("where");
	    ////
	    var tempbottle;
	    var dat=new Date();
	    var date = dat.getFullYear()+'-'+(dat.getMonth()+1)+'-'+dat.getDate();
	    ////
	    var size=payload.size;
	    var total_refills=0;
	    var last_refill_day=date;
	    var day_refills=0;
	    var x_coord="";
	    var y_coord="";
	    var myobj={"size":size,"total_refills":total_refills,"last_refill_day":date,"day_refills":day_refills,"x_coord":x_coord,"y_coord":y_coord};
	    var searchId=ObjectId(payload._id);
	    var temp=await dbo.collection("bottle").insertOne(myobj, function(err, result) {
		    if (err) throw err;
		    console.log("BOTTLE'S ID: " + result.insertedId);
		    console.log(typeof(result.insertedId));
		    bottle_id=result.insertedId;
		    dbo.collection("user").updateOne({"_id":searchId},{"$set":{"bottle_id":bottle_id}},function(err, result){
			    if (err) throw err;
			    res.json("Your new bottle was added. It is: "+bottle_id);
			});
		});
	    ////
        }catch(e){
            console.log('Failed to get users');
            return e;
	}
    }
    /////
    /////
    async  deletebottle(payload,res){
        try{
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
	    var address=payload.address;
	    var myobj={"_id":ObjectId(payload._id)};
	    var searchId=ObjectId(payload._uid);
	    dbo.collection("bottle").deleteOne(myobj, function(err, obj) {
		    if (err) throw err;
		    console.log("1 document deleted from bottle collection");
		    //res.json('Account Successfully Deleted');
		    dbo.collection("user").updateOne({"_id":searchId},{"$set":{"bottle_id":""}},function(err, result){
			    if (err) throw err;
			    res.json("Bottle removed from user account");
			});
		});
        }catch(e){
            console.log('failed to delete bottle');
            console.log(e);
            return e;
        }
    }
    /////
    async  updaterefill(payload,res){
        try{
	    console.log("FUCK");
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
	    var tempbottle;
	    ////
	    var tempbottle;
	    var dat=new Date();
	    var date = dat.getFullYear()+'-'+(dat.getMonth()+1)+'-'+dat.getDate();
	    ///
	    var myobj={"_id":ObjectId(payload._id)};
	    ////
	    
	    dbo.collection("bottle").find(payload).toArray(function(err, result){
		    if (err) throw err;
		    //tempbottle=result;
		    //});
		    //console.log(result.last_refill_day);
		    //		    res.json(result[0].last_refill_day);
		    tempbottle=result;
		    tempbottle.forEach(last_refill_day => {
			    console.log(typeof(last_refill_day));
			    if(tempbottle.last_refill_day!=date)
				{
				    dbo.collection("bottle").updateOne({"_id":myobj},{$set:{"last_refill_day":date,"day_refills":1,"total_refills":(tempbottle.total_refills+1)}},function(err, result){
					    if (err) throw err;
					    console.log("Day refills: "+ 1 +"Last day refill: "+ date);
					});
				}
			    else
				{
				    dbo.collection("bottle").updateOne({"_id":myobj},{$set:{"day_refills":(tempbottle.day_refills+1),"total_refills":(tempbottle.total_refills+1)}},function(err, result){
					    if (err) throw err;
					    console.log("Day refills: "+ 1+"Last day refill: "+ date);
					});
				}
			    res.json("Refills updated");
			});
		});
	}catch(e){
	    console.log('failed to delete bottle');
	    console.log(e);
	    return e;
	}
    }
    
    /////
    async getbottle(payload,res){
        try{
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
            var address=payload.address;
            var myobj={"_id":ObjectId(payload._id)};
	    dbo.collection("bottle").find(myobj).toArray(function(err, result){
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
    async updatecoord(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var x=payload.x_coord;
	    var y=payload.y_coord;
	    dbo.collection("bottle").updateOne({"_id":searchId},{"$set":{"x_coord":x,"y_coord":y}},function(err, result){
		    if (err) throw err;
		    res.json("your new x_coord: "+payload.x_coord+"your new y_coord: "+payload.y_coord);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }    

//////////////////////////////////////////////////////
    
/////
    async  makefountain(payload,res){
        try{
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
	    var x_coord=payload.x_coord;
	    var y_coord=payload.y_coord;
	    var filter_status=payload.filter_status;
	    var num_ratings=0;
	    var coldness=payload.coldness;
	    var myobj={"x_coord":x_coord,"y_coord":y_coord,"filter_staus":filter_status,"rating":"","num_ratings":num_ratings,"coldness":coldness};
	    dbo.collection("fountain").insertOne(myobj, function(err, result) {
		    if (err) throw err;
		    console.log(result.insertedId);
		    res.json(result.insertedId);
		});
        }catch(e){
            console.log('failed to insert fountain');
	    console.log(e);
            return e;
        }
    }
/////
    async updatefilter(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var filter_status=payload.filter_status;
	    dbo.collection("fountain").updateOne({"_id":searchId},{"$set":{"filter_status":filter_status}},function(err, result){
		    if (err) throw err;
		    res.json("your new filter status:"+filter_status);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }    

    async updatecoldness(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used               
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where t
	    var searchId=ObjectId(payload._id);
	    var coldness=payload.coldness;
	    dbo.collection("fountain").updateOne({"_id":searchId},{"$set":{"coldness":coldness}},function(err, result){
		    if (err) throw err;
		    res.json("your new coldness:"+coldness);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }    

    async updaterating(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
	    var dbo=dba.db("where");//Establish the DB being used
	    var user_rating=payload.rating;
	    var num_ratings=payload.num_ratings;
            var myobj=ObjectId(payload._id);
	    dbo.collection("fountain").updateOne({"_id":myobj},{"$set":{"rating":user_rating,"num_ratings":num_ratings}},function(err, result){
		    if (err) throw err;
		    res.json("Updated rating: "+user_rating);
		    //console.log(result);
		    //res.json(result[0]);
		});
        }catch(e){
            console.log('Failed to get user');
            return e;
        }
    }
    /////
    async getfountain(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
            var dbo=dba.db("where");//Establish the DB being used
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where th
	    var searchId=ObjectId(payload._id);
	    dbo.collection("fountain").find(searchId).toArray(function(err, result){
		    if (err) throw err;
		    res.json(result);
		});
	}catch(e){
	    var errorstring=null;
	    console.log('Failed to get fountains');
	    return errorstring;
	}
    }
    /////
    async getfountains(payload,res){
        try{
            let dba=await DbConnection.Get();//Check connection status & return singleton connection instance from server to D
            var dbo=dba.db("where");//Establish the DB being used
	    //Search user collection for document matching information passed in the payload. If found send the result in json format back to the IP where th
	    var searchId=ObjectId(payload._id);
	    dbo.collection("fountain").find(payload).toArray(function(err, result){
		    if (err) throw err;
		    res.json(result);
		});
	}catch(e){
	    var errorstring=null;
	    console.log('Failed to get fountains');
	    return errorstring;
	}
    }
    /////
    async  deletefountain(payload,res){
        try{
            let dba=await DbConnection.Get();
            var dbo=dba.db("where");
	    var myobj={"_id":ObjectId(payload._id)};
	    dbo.collection("fountain").deleteOne(myobj, function(err, obj) {
		    if (err) throw err;
		    console.log("1 document deleted from fountain collection");
		    res.json('Fountain Successfully Deleted');
		});
        }catch(e){
            console.log('failed to delete fountain');
            console.log(e);
            return e;
        }
    }
};
/*
updaterating
getpartial
*/
//////////////////
module.exports=CallHelper;
