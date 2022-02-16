"use strict";

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  const convertedNums = [];

  for (let num of strNums) {
    if (+num === NaN) {
      throw new BadRequestError(`${num} is not a number`);
    }
    convertedNums.push(+num);
  }

  return convertedNums;
}


module.exports = { convertStrNums };