/* eslint-env node */
'use strict';

module.exports = function (app) {
  const express = require('express');
  let serverRouter = express.Router();
  const bodyParser = require('body-parser');
  var MongoClient = require('mongodb').MongoClient;
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
        dbo = result;
        console.log(result);
        res.send(result);
      });
    });

  });

  app.post('/api/item/', function (req, res) {
    console.log(req);
  });

  serverRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/server', require('body-parser').json());
  app.use('/api/server', serverRouter);
};
