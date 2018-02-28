var express = require('express');
var router = express.Router();
const path = require('path');
var City = require('../model/city.model');


router.get('/', function (req, res, next) {
  res.render('index');
});

//Upload new City
router.post('/save', function (req, res) {
  City.findOne({name : req.body.name}, function (err, city) {
      if(!city) {
        var Newcity = new City(req.body);
        Newcity.owner = req.body.name;
        Newcity.save(function (err, result) {
          if (err) {
            return res.status(500).json({
              title: 'An error occured',
              error: err
            });
          }
          res.status(201).json({
            message: 'Saved City',
            obj: result
          });
        });
      } else {
        City.findByIdAndUpdate(city._id, req.body, {new: true}, function(err, city) {
          if(err) {
            return res.status(500).json({
              title: 'An error occured',
              error: err
            });
          }
          if(city)  {
            res.status(201).json({
              message: 'Saved ' + city.name,
              obj: city
            });
          }
        });
      }
  });
});


router.get('/getAll', function(req, res)  {
  City.find()
    .exec(function(err, Cities)  {
      res.status(200).json({
        message: 'returning cities',
        obj: Cities
      });
    });
});


router.get('/getOne/:Name', function(req, res)  {
  console.log(req.params);
  City.findOne({name: req.params.Name}, function (err, City)  {
    if(!City) {
      res.status(404).json({
        message: 'Did not find ' + req.params.Name,
        obj: err
      });
    }
    if (City) {
      res.status(200).json({
        message: 'Returning ' + req.params.Name,
        obj: City
      });
    }
    });
});

module.exports = router;
