"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();

const { findMean, findMode, findMedian } = require("./stats.js");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils.js");
// const { BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get("/mean", function (req, res) {

  console.log("This is our plain req.query:", req.query);
  console.log("This is the req.query.nums:", req.query.nums);


  if(req.query.nums === undefined){
    throw new BadRequestError("nums are required");
  }
  // const nums = req.query.nums.split(",").map((num) => +num);
  const splitQueryNums = req.query.nums.split(",")
  const nums = convertStrNums(splitQueryNums);


  const mean = findMean(nums);
  return res.send({
    response: {
      operation: "mean",
      value: mean,
    }
  });
})


/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median", function (req, res) {
  const nums = req.query.nums.split(",").map((num) => +num);
  const median = findMedian(nums);
  return res.send({
    response: {
      operation: "median",
      value: median,
    }
  });
})

/** Finds mode of nums in qs: returns {operation: "mean", result } */
// TODO: Update to reflect mode
app.get("/mode", function (req, res) {
  const nums = req.query.nums.split(",").map((num) => +num);
  const mode = findMode(nums);
  return res.send({
    response: {
      operation: "mode",
      value: mode,
    }
  });
})

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;