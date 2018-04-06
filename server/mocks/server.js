/* eslint-env node */
'use strict';

module.exports = function (app) {
  const express = require('express');
  let serverRouter = express.Router();
  const bodyParser = require('body-parser');
  var MongoClient = require('mongodb').MongoClient;
  var ObjectID = require('mongodb').ObjectID;
  var url = 'mongodb://user:password@ds127391.mlab.com:27391/items';

  //EXPRESS SESSION
  var session = require('express-session');
  app.use(session({
    secret: 'wololoo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }));
  console.log(session);
  //BCRYPT
  var bcrypt = require('bcrypt');
  const saltRounds = 10;

  //MongoClient.connect('mongodb://user:password@ds127391.mlab.com:27391/items');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());       // to support JSON-encoded bodies

  console.log('Mock Server Booted');

  serverRouter.get('/', function (req, res) {
    res.send({
      'server': []
    });
  });

  serverRouter.get('/', function (req, res) {
    res.send({
      'server': []
    });
  });

  serverRouter.post('/', function (req, res) {
    res.status(201).end();
  });

  serverRouter.get('/:id', function (req, res) {
    res.send({
      'server': {
        id: req.params.id
      }
    });
  });

  serverRouter.put('/:id', function (req, res) {
    res.send({
      'server': {
        id: req.params.id
      }
    });
  });

  app.post('/authentication/session/check', function(req,res){
    console.log("check");
    if(req.session===undefined){
      console.log("undefined session");
      return {status: "undefined"};
      
    } else {
      console.log("checker");
      console.log(req.session);
      console.log(session);
      return req.session;
    }

  });

  app.post('/api/', function (req, res) {
    //get ory for search
    var searchory = req.body.ory
    var dbo;
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      dbo = db.db("items");
      dbo.collection("items").find({ 'ory': searchory }).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        res.send(result);
      });
    });

  });

  app.post('/api/item/', function (req, res) {
    //to be able to find documents in mongo by ID, need to convert to ObjectId
    var o_id = new ObjectID(req.body.id);
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("items");
        //find with id:ObjectId query
        dbo.collection("items").find({ _id: o_id }).toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.send(result);
        });
      });
    } catch (e) {
      console.log(e);
    }

  });

  app.post('/api/showcase/', function (req, res) {
    //return random item from db
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("items");
        //retrieve 3 random entries from db to showcase
        dbo.collection("items").aggregate([{ $sample: { size: 3 } }]).toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.send(result);
        });
      });
    } catch (e) {
      console.log(e);
    }

  });

  app.post('/authentication/register', function (req, res) {
    console.log(req.body);
    /*
    req.body should return

    { firstName: 'asd',
    lastName: 'asd',
    email: 'test@user.com',
    password: 'Asdasd' }
  
    */
    //check if account with this email already exists
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("items");
      dbo.collection("users").find({ email: req.body.email }).toArray(function (err, result) {
        if (err) throw err;
        //if an entry is found, send error response. else create account and send success response
        if (result.length > 0) {
          //account with email exists. Cancel.
          db.close();
          res.send({ state: "error" });
        } else {
          //account ok to make. create document in db
          //hash password
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              //change req.body plaintext password to hashed to enter into db
              req.body.password = hash;
              //insert user data (req.body) into db with hashed pw
              dbo.collection("users").insertOne(req.body, function (err, result) {
                if (err) throw err;
                db.close();
                res.send({ state: "success" });
              });
            });
          });
        }
      });
    });
  });

  app.post('/authentication/logout', function (req, res) {
    if(req.session===undefined){
      return;
    }
    req.session.destroy(function (err) {
      // cannot access session here
      if(err){}
    });
    console.log(session);
  });

  app.post('/authentication/login', function (req, res) {
    console.log("Login authentication request received");
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("items");
      var data = { email: false, password: false };
      //retrieve 3 random entries from db to showcase
      dbo.collection("users").find({ email: req.body.email }).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        if (result.length === 1) {
          //turn plaintext pw into has too compare to db entry
          var userId = result[0]._id;
          console.log(result);
          console.log(req.body.password + "::" + result[0].password);
          bcrypt.compare(req.body.password, result[0].password, function (err, result) {
            //if pswrds match, res is true
            if (result === true) {
              //if match, start session
              req.session.userId = userId;
              console.log(req.session);
              res.send({ email: true, password: true, userId: userId });
            }
          })
        } else {
          console.log("no result");
          res.send({ email: false, password: false })
        }
      });
    });
  });


  app.post('/authentication/sessionate', function (req, res) {
    
  });

  serverRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/server', require('body-parser').json());
  app.use('/api/server', serverRouter);
};
