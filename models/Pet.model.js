const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    species: {
      type: String,
      enum: ["Dog", "Cat"],
      required: [true, "Species is required."],
    },
    breed: {
      type: String,
      default: "Stray",
    },
    age: {
        type: Number,
        required: [true, "Age is required."],
    },
    description: {
        type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "For adoption"
    },
    petImage: {
      type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;
