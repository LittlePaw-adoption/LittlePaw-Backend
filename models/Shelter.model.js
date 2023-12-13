const { Schema, model } = require("mongoose");

const shelterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
    },
    contact: {
      type: Number,
    },
    description: {
        type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shelterImage: {
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Shelter = model("Shelter", shelterSchema);

module.exports = Shelter;
