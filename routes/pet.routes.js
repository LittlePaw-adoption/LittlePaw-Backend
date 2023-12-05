const Pet = require("../models/Pet.model");

const router = require("express").Router();

router.get("/pets", (req, res, next) => {
  Pet.find({})
    .then((pet) => {
      res.json(pet);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/pets", (req, res, next) => {
  const { name, species, breed, age, description } = req.body;

  Pet.create({
    name,
    species,
    breed,
    age,
    description,
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

router.put("/pets/:petId", (req, res, next) => {
  const { petId } = req.params;

  Pet.findByIdAndUpdate(petId, req.body, { new: true })
    .then((updatePet) => {
      res.json(updatePet);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/pets/:petId", (req, res, next) => {
  const { petId } = req.params;

  Pet.findByIdAndDelete(petId)
    .then((deletePet) => {
      res.json(deletePet);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
