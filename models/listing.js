const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  image: {
    filename: { type: String, default: "listingimage" },
    url: { type: String, default: "https://images.unsplash.com/photo-..." }
  },
  description: String,
  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;  
