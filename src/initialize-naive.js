"use strict";

module.exports = initializeNaive;

function initializeNaive (k, points, centroids, counts, assignments) {
  var i, j;
  for (i = 0; i < k; i++) {
    j = ~~(Math.random() * points.length);
    centroids[i] = points[j].slice(0);
    assignments[i] = j;
    counts[i] = 1;
  }
}
