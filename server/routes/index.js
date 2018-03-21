var express = require('express');
var router = express.Router();
const path = require('path');
var City = require('../model/city.model');
var mongoose = require('mongoose');
var multer = require('multer');
var gridfsstorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var conn = mongoose.connection;
var gfs = new Grid(conn, mongoose.mongo);
var storage = gridfsstorage({
  url: 'mongodb://Haske107:Applegate451!@projectx-shard-00-00-y8jpz.mongodb.net:27017,projectx-shard-00-01-y8jpz' +
  '.mongodb.net:27017,projectx-shard-00-02-y8jpz.mongodb.net:27017/projectx?ssl=true&replicaSet=projectx-shard-0&authSource=admin',

  filename: function(req,file,cb) {
    cb(null, req.params.Name);

  },
  metadata: function(req,file,cb) {
    cb(null, req.params.DocType);
  },

  root: 'CityDocs'
});
var DocUpload = multer({ storage: storage }).single('Document');


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



router.get('/uploadStatus/:Name', function(req, res) {
  gfs.findOne({filename: req.params.Name, root: 'CityDocs', metadata: 'Permit'}, function (err, file) {
    var statusObj =   {
      Permit: false,
      COI: false,
      COC: false,
      Notify: false,
      Parking: false
    };
    if(file)  {
      statusObj.Permit = true;
    }
    gfs.findOne({filename: req.params.Name, root: 'CityDocs', metadata: 'COI'}, function (err, file) {
      if(file)  {
        statusObj.COI = true;
      }
      gfs.findOne({filename: req.params.Name, root: 'CityDocs', metadata: 'COC'}, function (err, file) {
        if(file)  {
          statusObj.COC = true;
        }
        gfs.findOne({filename: req.params.Name, root: 'CityDocs', metadata: 'Notify'}, function (err, file) {
          if(file)  {
            statusObj.Notify = true;
          }
          gfs.findOne({filename: req.params.Name, root: 'CityDocs', metadata: 'Parking'}, function (err, file) {
            if(file)  {
              statusObj.Parking = true;
            }
            return res.status(200).json({
              obj: statusObj
            });
          });
        });
      });
    });
  });
});


  router.post('/upload/:Name/:DocType', function (req, res) {
    gfs.findOne({filename: req.params.Name, root: 'CityDocs', metadata: req.params.DocType}, function (err, file) {
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


  module.exports = router;
