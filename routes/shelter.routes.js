const Shelter = require("../models/Shelter.model");
const isOwner = require("../middleware/protected.resources.js")
const router = require("express").Router();
const {isAuthenticated} = require("../middleware/jwt.middleware.js");


router.get("/shelters", (req, res, next) => {
  Shelter.find({}).populate("createdBy")
    .then((shelter) => {
      res.json(shelter);
    })
    .catch((err) => {
      res.json(err);
    });
});

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
router.post("/shelters", isAuthenticated, (req, res, next) => {
  const { name, location, contact, description, shelterImage } = req.body;
  const createdBy = req.payload._id;
    Shelter.create({
    name,
    location,
    contact,
    description,
    shelterImage,
    createdBy
  })
    .then((shelter) => {
      res.json(shelter);
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
router.put("/shelters/:shelterId", isAuthenticated, (req, res, next) => {
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
router.delete("/shelters/:shelterId", isAuthenticated, (req, res, next) => {
    Shelter.findByIdAndDelete(req.params.shelterId)
    .then((shelterDetails) => {
      res.json(shelterDetails);
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = router