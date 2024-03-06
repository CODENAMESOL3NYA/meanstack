const express = require('express');
const router =express.Router();
const mainController = require('../controllers/main.controller');

//HTTP VERBS: POST GET PUT DELETE

//POST /api/providers
router.post('/providers', mainController.create);

//GET /api.providers
router.get('/providers',mainController.readAll);

//Get One /api/providers/123
router.get('/providers/:id',mainController.readOne);

//PUT /api/providers/123
router.put('/providers/:id',mainController.update);

//Delete one provider /api/providers/123
router.delete('/providers/:id',mainController.deleteOne);

//Delete All providers
router.delete('/providers',mainController.deleteAll);

//No Matching api endpoint
router.post('/*',notFound);
router.get('/*',notFound);
router.put('/*',notFound);
router.delete('/*',notFound);


function notFound(req,res){
    res.status(400).send({message:"Not Valid Endpoint"})
}

module.exports = router