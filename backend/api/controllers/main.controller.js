var providers = require("../models/providers.model");
const Provider = require("../db/db");
const mongoose = require("mongoose");

//Utility functions
function isEmptyList(obj) {
  return !obj || obj.length === 0 || Object.keys(obj).length == 0;
}
//Handle error
function handleError(res, error) {
  
  return res.status(400).json({ error: `Something went wrong \n${error}` });
}

//POST
// uri: /api/providers
module.exports.create = function (req, res) {
  //Create a random ID
  try {
    if (!req.body || req.body == null || req.body.length == 0) {
      return res.status(400).send({ message: "No Form Data Found" });
    }
    let provider = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      position: req.body.position,
      company: {
        company_name: req.body.company.company_name,
        address: req.body.company.address,
        address2: req.body.company.address2.length==0?" ":req.body.company.address2,
        city: req.body.company.city,
        state: req.body.company.state,
        postal_code: req.body.company.postal_code,
        phone: req.body.company.phone,
        email: req.body.company.email,
        description: req.body.company.description,
        tagline: req.body.company.tagline,
      },
    };
    console.log(provider)
    Provider.create(provider)
      .then((results) => {
        if (isEmptyList(results)) {
          return res
            .status(400)
            .send({
              message: `Something went wrong couldn't create the provider`,
            });
        }
        //Create new Provider object
        res.status(201);
        res.send(provider);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//GET
//uri: /api/providers
module.exports.readAll = function (req, res) {
  try {
    Provider.find({})
      .then((providers) => {
        if (isEmptyList(providers)) {
          return res
            .status(404)
            .json({ message: "No Providers Found. Can not read" });
        }
        res.status(200);
        res.send(providers);
      })
      .catch((error) => {
        console.log(error);
        handleError(res, error);
      });
  } catch (error) {
    handleError(res, error);
  }
};

//GET
//uri: /api/providers/123
module.exports.readOne = function (req, res) {
  try {
    let { id } = req.params;
    Provider.find({ _id: new mongoose.Types.ObjectId(id) })
      .then((results) => {
        if (isEmptyList(results)) {
          return res
            .status(404)
            .json({ message: "No Providers Found. Can not read" });
        }
        res.status(200);
        res.send(results);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//PUT
//uri: /api/providers/123
module.exports.update = function (req, res) {
  try {
    let { id } = req.params;
    if (!req.body) {
      res.status(400).send({ message: "No Data Found" });
    }
    
    let filter = { _id: new mongoose.Types.ObjectId(id) };
    const update = req.body;
    const options = {
      new: true,
    };

    Provider.findOneAndUpdate(filter, update, options)
      .then((result) => {
        if (isEmptyList(result)||result==null) {
          res.status(404).json({ message: "No Providers Found. Can not update" });
        }
        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//DELETE
//uri: /api/providers/123
module.exports.deleteOne = function (req, res) {
  try {
    let id = req.params.id;
    let filter = {_id: new mongoose.Types.ObjectId(id)};
    Provider.findOneAndDelete(filter)
      .then(result =>{
        if (isEmptyList(result)||result==null) {
          res.status(404).json({ message: "No Providers Found. Can not delete" });
        }
        res.status(200);
        res.send({ message: "User Deleted", data: result });

      }).catch(error => handleError(res,error))
    
    
  } catch (error) {
    handleError(res,error)
  }
};

//DELETE
//uri: /api/providers
module.exports.deleteAll = function (req, res) {
  try {
    let ids;
    let filter;
    if(req.body&&req.body.ids){
      ids= req.body.ids;
      filter={_id:{$in:[...ids]}}
    }else{
      filter={};
    }
    Provider.deleteMany(filter)
      .then(results => {
        if (isEmptyList(results)||results == null) {
          res.status(400).json({ message: "No Providers Found. Can not delete" });
        }
        res.status(200);
        res.send({message:`Delete Sucessfuly`,data:results});
      })
      .catch(error=>handleError(res,error))
    
  } catch (error) {
    handleError(res,error)
  }
 
};
