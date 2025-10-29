const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// INDEX + CREATE
router
  .route("/")
  .get(WrapAsync(listingcontroller.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    WrapAsync(listingcontroller.createListing)
  );

// NEW FORM
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

// SHOW + UPDATE + DELETE
router
  .route("/:id")
  .get(isLoggedIn, WrapAsync(listingcontroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    WrapAsync(listingcontroller.updateListing)
  )
  .delete(isLoggedIn, isOwner, WrapAsync(listingcontroller.deleteListing));

// EDIT FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingcontroller.renderEditForm)
);

module.exports = router;
