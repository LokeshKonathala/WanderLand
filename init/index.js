const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); 
const { object } = require("joi");

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
  initData.data=initData.data.map((obj)=>({...obj, owner:"68f8ab622c488b28c4d18d1d",}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
