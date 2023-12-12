const User = require("../models/User.model");

const router = require("express").Router();

router.get("/user/:userId", (req, res, next) => {
    User.find({ _id: req.params.userId })
      .then((userDetails) => {
        res.json(userDetails);
      })
      .catch((error) => {
        next(error);
      });
  });

router.put("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
    User.findByIdAndUpdate(userId, req.body, {new:true})
      .then((userDetails) => {
        res.json(userDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  
  module.exports = router