const Pet = require("../models/Pet.model");
const isOwner = require("../middleware/protected.resources");
const router = require("express").Router();
const {isAuthenticated} = require("../middleware/jwt.middleware.js");



router.get("/pets", (req, res, next) => {
  Pet.find({})
    .then((pet) => {
      res.json(pet);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/pets", isAuthenticated, (req, res, next) => {
  const { name, species, breed, age, description, status } = req.body;
  console.log(req.payload)
  const createdBy = req.payload._id;
  Pet.create({
    name,
    species,
    breed,
    age,
    description,
    createdBy,
    status,
  })
    .then((pets) => {
      res.json(pets);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/pets/:petId", (req, res, next) => {
  const { petId } = req.params;

  Pet.findById(petId)
    .then((petDetails) => {
      res.json(petDetails);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/pets/:petId", isAuthenticated, isOwner, (req, res, next) => {
  const { petId } = req.params;

  Pet.findByIdAndUpdate(petId, req.body, { new: true })
    .then((updatePet) => {
      res.json(updatePet)
    })
    
    .catch((err) => {
      next(err);
    });
});

router.delete("/pets/:petId", isAuthenticated, isOwner,  async (req, res, next) => {
 
  try {
    const { petId } = req.params;
  await Pet.findByIdAndDelete(petId);
  

    res.status(200).json({msg:"Deleted succesfuly"});
  } catch (error) {
    console.error("Error deleting pet:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
