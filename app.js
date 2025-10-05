const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); 
const path=require("path");
const methodOverride=require("method-override");
const { redirect } = require("react-router-dom");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hello! welcome to wander land");
});

//index
app.get("/listings", async(req,res)=>{
   const allListings= await Listing.find({});
   res.render("listings/index.ejs", {allListings});
});

//to create a listing
app.get("/listings/new", (req,res)=>{
  res.render("listings/new.ejs");
});

//showing lists
app.get("/listings/:id", async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});

//creating route
app.post("/listings", async(req,res)=>{
  const newListing= new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//edit listing
app.get("/listings/:id/edit",async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
});

//update listing
app.put("/listings/:id", async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});

//delete listing
app.delete("/listings/:id", async (req,res)=>{
  let {id}=req.params;
  let deletedListing=await Listing.findByIdAndDelete(id);
console.log("deletedListing");
  res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//   const sampleListing = new Listing({
//     title: "my new villa",
//     description: "by beach view",
//     price: 1200,
//     location: "goa",
//     country: "India"
//   });
//   await sampleListing.save();
//   console.log("saved successfully");
//   res.send("successful testing");
// });

app.listen(8000, () => {
  console.log("server is listening to 8000!");
});
