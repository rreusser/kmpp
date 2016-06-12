"use strict";

module.exports = guessK;

function guessK (n) {
  return ~~(Math.sqrt(n * 0.5));
}
