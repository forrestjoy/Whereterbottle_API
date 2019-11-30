const CallHelper=require('./helper');
const express =require("express");
const app = express();
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const connectionHelper = new CallHelper();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/////******************
/*
User routes for accessing user collection helper fuctions which will query based on user criteria verified upon login search for specific user.
*/
/////******************

app.post("/getuserbyid", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
        console.log('body: ',req.body);
	console.log('IP: '+clientIp);
        payload=req.body;//search by all parameters given in
	connectionHelper.getuserbyid(payload,res);
    });//??//

app.post("/getuser", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
        console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.getuser(payload,res);
    });//Done//

app.post("/makeuser", (req, res, next) => {
        clientIp = requestIp.getClientIp(req);
        console.log('body: ',req.body);
        console.log('IP: '+clientIp);
        payload=req.body;
        connectionHelper.makeuser(payload,res);
    });//Done//

app.post("/removebottletouser", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.removebottletouser(payload,res);
    });//Done//

app.post("/deleteuser", (req, res, next) => {
        clientIp = requestIp.getClientIp(req);
        console.log('body: ',req.body);
        console.log('IP: '+clientIp);
        payload=req.body;
        connectionHelper.deleteuser(payload,res);
    });//DONE

app.post("/updatefilltouser", (req, res, next) => {
        clientIp = requestIp.getClientIp(req);
        console.log('body: ',req.body);
        console.log('IP: '+clientIp);
        payload=req.body;
        connectionHelper.updatefilltouser(payload,res);
    });//NOT DONE

app.post("/addfavoritetouser", (req, res, next) => {
        clientIp = requestIp.getClientIp(req);
        console.log('body: ',req.body);
        console.log('IP: '+clientIp);
        payload=req.body;
        connectionHelper.addfavoritetouser(payload,res);
    });//DONE

app.post("/removefavoritetouser", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.removefavoritetouser(payload,res);
    });//DONE

app.post("/addfriendtouser", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.addfriendtouser(payload,res);
    });//DONE

app.post("/removefriendtouser", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.removefriendtouser(payload,res);
    });//DONE

app.post("/changeuseremail", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.changeuseremail(payload,res);
    });//DONE

app.post("/changeuseraddress", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.changeuseraddress(payload,res);
    });//DONE
/////******************
/*
Bottle routes for accessing bottle collection helper fuctions which will query based on user defined criteria which will interact with individual bottles which belong to individual user
*/
/////******************

app.post("/getbottle", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.getbottle(payload,res);
    });//Done//

app.post("/makebottle", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.makebottle(payload,res);
    });//Done//

app.post("/deletebottle", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.deletebottle(payload,res);
    });//Done//

app.post("/updaterefill", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.updaterefill(payload,res);
    });//NOT DONE

app.post("/updatecoord", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.updatecoord(payload,res);
    });//DONE

/////******************
/*
Fountain routes which will hit the fountain helper(query) functions which allows users to interact with fountain objects such as: change rating, coldness, establish a fountain(with potential later verificcation by other users), find fountains, and mark a fountain as a favorite.)
*/
/////******************

app.post("/makefountain", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.makefountain(payload,res);
    });

app.post("/updatefilter", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.updatefilter(payload,res);
    });

app.post("/updaterating", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.updaterating(payload,res);
    });

app.post("/updatecoldness", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.updatecoldness(payload,res);
    });

app.post("/getfountains", (req, res, next) => {
	clientIp = requestIp.getClientIp(req);
	console.log('body: ',req.body);
	console.log('IP: '+clientIp);
	payload=req.body;
	connectionHelper.getfountains(payload,res);
    });

app.post("/deletefountain", (req, res, next) => {
        clientIp = requestIp.getClientIp(req);
        console.log('body: ',req.body);
        console.log('IP: '+clientIp);
        payload=req.body;
        connectionHelper.deletefountain(payload,res);
    });//DONE
/////******************
/*
Server which listens for http requests on port 3000. The routes defined above are run with specific request bodies in order to fulfill what is needed for the query run by helper functions in the helper.js file.
*/
/////******************

const url = "mongodb://localhost:27017/";

app.listen(3000,() =>{
        console.log("Server running on port 3000");
        ///////////////////////////////
    });