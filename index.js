const mongoose = require("mongoose");
const initData = require("./init/data.js");
const Listing = require("./models/listing.js"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/the_wanderland";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("error connecting to DB", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
