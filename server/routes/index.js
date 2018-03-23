var express = require('express');
var router = express.Router();
const path = require('path');
var City = require('../model/city.model');
var Document = require('../model/Document');
var mongoose = require('mongoose');
var multer = require('multer');
var gridfsstorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var conn = mongoose.connection;
var gfs = new Grid(conn, mongoose.mongo);
var storage = gridfsstorage({
  url: 'mongodb://Haske107:Applegate451!@projectx-shard-00-00-y8jpz.mongodb.net:27017,projectx-shard-00-01-y8jpz.mongodb.net:27017,projectx-shard-00-02-y8jpz.mongodb.net:27017/projectx?ssl=true&replicaSet=projectx-shard-0&authSource=admin',

  filename: function(req,file,cb) {
    cb(null, req.params.Name);

  },
  metadata: function(req,file,cb) {
    cb(null, {type: req.params.DocType, name: file.originalname});
  },


  root: 'CityDocs'
});
var DocUpload = multer({ storage: storage }).array('Document', 10);


router.get('/', function (req, res, next) {
  res.render('index');
});
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
router.get('/completed/:Name', function(req, res)  {
  City.findOne({name: req.params.Name}, function (err, City)  {
    if(!City) {
      res.status(404).json({
        message: 'Did not find ' + req.params.Name,
        obj: err
      });
    }

    if (City) {
      City.completed = true;
      City.save();
      res.status(200).json({
        message: 'Completed ' + req.params.Name
      });
    }
  });
});
router.post('/upload/:Name/:DocType', function (req, res) {
    gfs.findOne({filename: req.params.Name, root: 'CityDocs', "metadata.type": req.params.DocType}, function (err, file) {
      if (err) {
        return res.status(401).json({
          message: 'Error with GridFs  ' + req.params.Name + '!',
          obj: req.file
        });
      }
      if (!file) {
        DocUpload(req, res, function (_err) {
          if (_err) {
            return res.status(401).json({
              error: 'Error with Multer save'
            });
          }
          return res.status(201).json({
            message: 'Successfully saved ' + req.params.Name + '!'
          });
        })
      }
      if (file) {
        gfs.remove({_id: file._id}, function (__err, file) {
          if (__err) {
            if (__err) {
              return res.status(401).json({
                error: 'Error with Gridfs Remove'
              });
            }
          }
        });
        DocUpload(req, res, function (___err) {
          if (___err) {
            return res.status(401).json({
              error: 'Error with Multer update'
            });
          }
          return res.status(201).json({
            message: 'Successfully updated ' + req.params.Name + '!'
          });
        });
      }
    });
  });
router.get('/uploads/:Name/:DocType', function(req, res)  {
  var Files = gfs.collection('CityDocs').find({filename: req.params.Name, "metadata.type": req.params.DocType});
  var Names = [];
  Files.toArray(function(err, result) {
   result.forEach( function(item) {
     Names.push(item.metadata.name);
   });
   return res.status(200).json({
     names: Names
   });
  });
});
router.get('/removeDoc/:Name/:FileName/:DocType', function(req, res) {
  gfs.collection('CityDocs').remove({filename: req.params.Name, metadata: {type: req.params.DocType, name: req.params.FileName}}, function(err, file)  {
    if(!err)  {
      res.status(200).json({
        message: "succesfully removed " + req.params.FileName
      });
    } else {
      console.log(err);
    }
  })
});


  module.exports = router;
