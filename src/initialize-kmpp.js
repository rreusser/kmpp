"use strict";

module.exports = initializeKmpp;

function initializeKmpp (k, points, centroids, counts, assignments, distance) {
  var i, j, l, m, cmp1, cmp2, Dsum, tmpDsum, D, ntries, bestIdx;

  var p0, bestDsum, rndVal, tmpD, m;

  var n = points.length;

  // K-Means++ initialization

  // determine the amount of tries
  D = [];
  ntries = 2 + Math.round(Math.log(k));

  // 1. Choose one center uniformly at random from the data points.
  p0 = points[ ~~(Math.random() * n) ];

  centroids[0] = p0.slice(0);
  assignments[0] = 0;
  counts[0] = 1;

  // 2. For each data point x, compute D(x), the distance between x and
  //    the nearest center that has already been chosen.
  for (i = 0, Dsum = 0; i < n; ++i) {
    D[i] = distance(p0, points[i]);
    Dsum += D[i];
  }

  // 3. Choose one new data point at random as a new center, using a
  //    weighted probability distribution where a point x is chosen with
  //    probability proportional to D(x)^2. (Repeated until k centers
  //    have been chosen.)
  for (i = 1; i < k; ++i) {
    bestDsum = Infinity
    bestIdx = -1;

    for (j = 0; j < ntries; ++j) {
      rndVal = ~~(Math.random() * Dsum);
      for (l = 0; l < n; ++l) {
        if (rndVal <= D[l]) {
          break;
        } else {
          rndVal -= D[l];
        }
      }

      tmpD = [];
      for (m = 0, tmpDsum = 0; m < n; ++m) {
        cmp1 = D[m];
        cmp2 = distance(points[m], points[l]);
        tmpD[m] = cmp1 > cmp2 ? cmp2 : cmp1;
        tmpDsum += tmpD[m];
      }

      if (tmpDsum < bestDsum) {
        bestDsum = tmpDsum;
        bestIdx = l;
      }
    }

    Dsum = bestDsum;

    centroids[i] = points[bestIdx].slice(0);
    assignments[i] = i;
    counts[i] = 1;

    for (j = 0; j < n; j++) {
      cmp1 = D[j];
      cmp2 = distance(points[bestIdx], points[j]);
      D[j] = cmp1 > cmp2 ? cmp2 : cmp1;
    }
  }

}
