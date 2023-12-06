const Shelter = require("../models/Shelter.model");

const router = require("express").Router();

const mongoose = require("mongoose");

router.get("/shelters", (req, res, next) => {
    Shelter.find({})
    .then((shelter) => {
      res.json(shelter);
    })
    .catch((error) => {
      next(error);
    });
});

//Creates a new shelter
router.post("/shelters", (req, res, next) => {
    Shelter.create({
    name: req.body.name,
    location: req.body.location,
    contact: req.body.contact,
    phone: req.body.phone,
    description: req.body.description,
  })
    .then(() => {
      res.send("A shelter was created!");
    })
    .catch((error) => {
      next(error);
    });
});

//Retrieves a specific Shelter by id
router.get("/shelters/:shelterId", (req, res, next) => {
  console.log(req.params.shelterId);
  Shelter.find({ _id: req.params.shelterId })
    .then((shelterDetails) => {
      res.json(shelterDetails);
    })
    .catch((error) => {
      next(error);
    });
});

//Updates a specific shelter by id
router.put("/shelters/:shelterId", (req, res, next) => {
const { shelterId } = req.params;
    Shelter.findByIdAndUpdate(shelterId, req.body, {new:true})
    .then((shelterDetails) => {
      res.json(shelterDetails);
    })
    .catch((error) => {
      next(error);
    });
});

//Deletes a specific shelter by id
router.delete("/shelters/:shelterId", (req, res, next) => {
    Shelter.findByIdAndDelete(req.params.shelterId)
    .then((shelterDetails) => {
      res.json(shelterDetails);
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = router