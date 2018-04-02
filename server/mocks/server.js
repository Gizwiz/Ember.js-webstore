/* eslint-env node */
'use strict';

module.exports = function (app) {
  const express = require('express');
  let serverRouter = express.Router();
  const bodyParser = require('body-parser');
  var MongoClient = require('mongodb').MongoClient;
  var ObjectID = require('mongodb').ObjectID;
  var url = 'mongodb://user:password@ds127391.mlab.com:27391/items';
  //MongoClient.connect('mongodb://user:password@ds127391.mlab.com:27391/items');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());       // to support JSON-encoded bodies

  console.log('server');

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

  app.post('/api/', function (req, res) {
    //get category for search
    var searchCategory = req.body.category
    var dbo;
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      dbo = db.db("items");
      dbo.collection("items").find({ 'category': searchCategory }).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        res.send(result);
      });
    });

  });

  app.post('/api/item/', function (req, res) {
    //to be able to find documents in mongo by ID, need to convert to ObjectId
    var o_id = new ObjectID(req.body.id);
    try{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("items");
        //find with id:ObjectId query
        dbo.collection("items").find({_id:o_id}).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          res.send(result);
        });
      });
    } catch (e){
      console.log(e);
    }

  });

  serverRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/server', require('body-parser').json());
  app.use('/api/server', serverRouter);
};
