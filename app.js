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
  if (req.query.nums === undefined || req.query.nums === "") {
    throw new BadRequestError("nums are required");
  }

  const splitQueryNums = req.query.nums.split(",")
  const nums = convertStrNums(splitQueryNums);

  const mean = findMean(nums);

  if (req.headers["content-type"] === 'text/html') {
    return res.send(mean)
  };

  return res.send({
    response: {
      operation: "mean",
      value: mean,
    }
  });
})


/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median", function (req, res) {
  if (req.query.nums === undefined || req.query.nums === "") {
    throw new BadRequestError("nums are required");
  }

  const splitQueryNums = req.query.nums.split(",")
  const nums = convertStrNums(splitQueryNums);

  const median = findMedian(nums);

  if (req.headers["content-type"] === 'text/html') {
    return res.send(mean)
  };

  return res.send({
    response: {
      operation: "median",
      value: median,
    }
  });
})


/** Finds mode of nums in qs: returns {operation: "mean", result } */

app.get("/mode", function (req, res) {
  if (req.query.nums === undefined || req.query.nums === "") {
    throw new BadRequestError("nums are required");
  }

  const splitQueryNums = req.query.nums.split(",")
  const nums = convertStrNums(splitQueryNums);

  const mode = findMode(nums);

  if (req.headers["content-type"] === 'text/html') {
    return res.send(mean)
  };

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