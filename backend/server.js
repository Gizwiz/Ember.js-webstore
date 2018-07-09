const express = require('express');
const app = express()
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://user:password@ds127391.mlab.com:27391/items';

var bcrypt = require('bcrypt');
const saltRounds = 10;

/* CROSS-ORIGIN */
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
 
app.use(allowCrossDomain);

/* BODY_PARSER */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send('Generic Bike Store REST API')
});

app.post('/api/bikes', function (req, res) {
    //get query for search
    var searchCategory = req.body.category
    console.log(searchCategory)
    var dbo;
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      dbo = db.db("items");
      if(searchCategory === ""){
        dbo.collection("items").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.send(result);
          });
      } else {
        dbo.collection("items").find({ 'category': searchCategory }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.send(result);
          });
      }

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


  app.post('/token', function (req, res) {
    console.log("Login authentication");

    //find user by email in db
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("items");
      var data = { email: false, password: false };
      console.log(data);
      dbo.collection("users").find({ email: req.body.username }).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        //if one found
        if (result.length === 1) {
          var user = result[0];
          bcrypt.compare(req.body.password, result[0].password, function (err, result) {
            //if pswrds match, res is true
            if (result === true) {
              console.log("Correct login information");
              //if match, start session
              //set session user id as user id found in db.
              //pass user info to front for localstorage to server info
              delete user.password;
              return res.status(200).json({"access_token":user._id,"user":user, "token_type":"example", "expires_in":150000});;
              //res.send({"access_token":user._id, "token_type":"example", "expires_in":150000});
            } else {
              res.status(401);
              return res.send('Invalid password');
            }
          })
        } else //none or more than 1 found 
        {
          console.log("Found none");
          res.status(401);
          return res.send('No account with this email was found');
          //return res.send({ access_token: "invalid", email: false, password: false });
        }
      });
    });

  });

  app.post('/authentication/logout', function (req, res) {
    console.log(req.session);
    if (req.session === undefined) {
      return;
    }
    req.session.destroy(function (err) {
      // cannot access session here
      res.send({ status: "success" })
      if (err) { res.send({ status: "error" }) }
    });
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
          var user = result[0];
          bcrypt.compare(req.body.password, result[0].password, function (err, result) {
            //if pswrds match, res is true
            if (result === true) {
              console.log(result);
              //if match, start session
              //set session user id as user id found in db.
              req.session.userId = user._id;
              //pass user info to front for localstorage to server info
              return res.send({ email: true, password: true, user: user });
            } else {
              return res.send({ email: true, password: false });
            }
          })
        } else {
          console.log("no result");
          return res.send({ email: false, password: false })
        }
      });
    });
  });

app.listen(30002, () => console.log('Example app listening on port 30002!'))