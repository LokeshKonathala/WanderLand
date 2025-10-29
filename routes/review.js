const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");
const review=require("../models/review.js");


// CREATE - Add new review
router.post("/", isLoggedIn, validateReview, WrapAsync(reviewController.createReview));

// DELETE - Delete review
router.delete("/:reviewId", isLoggedIn, WrapAsync(reviewController.deleteReview));

module.exports = router;
