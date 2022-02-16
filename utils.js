"use strict";

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  const convertedNums = [];

  for (let num of strNums) {
    const convertedNum = +num;
    if (Number.isNaN(convertedNum)) {
      throw new BadRequestError(`${num} is not a number`);
    }
    convertedNums.push(convertedNum);
  }
  return convertedNums;
}


module.exports = { convertStrNums };