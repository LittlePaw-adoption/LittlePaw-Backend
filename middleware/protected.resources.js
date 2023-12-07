const Pet = require ("../models/Pet.model")
const Shelter = require ("../models/Shelter.model")

const isOwner = async function(req, res, next) {
    try {
      const { petId } = req.params;
      const pet = await Pet.findById(petId);
  
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      console.log('payload', req.payload);
      console.log('pet', pet);
      
      // Check if the current user is the owner of the pet
      if (pet.createdBy.toString() !== req.payload._id) {
        console.log('oie');
        return res.status(403).json({ message: "Permission denied" });
      }
  
      // If the user is the owner, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Error in isOwner middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  module.exports = isOwner;