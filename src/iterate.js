"use strict";

module.exports = iterate;

function iterate (k, points, centroids, counts, assignments, distance, sums) {
  var i, j;
  var converged = true;

  var n = points.length;
  var dim = points[0].length;

  /** Zero the arrays of sums and counts for this iteration */
  for (i = 0; i < k; i++) {
    for (j = dim - 1; j >= 0; j--) {
      sums[i][j] = 0;
    }
    counts[i] = 0;
  }

  /** Find the closest centroid for each point */
  for (i = 0; i < n; i++) {
    /** Finds the centroid with the closest distance to the current point */
    var centroid = 0;
    var minDist = distance(centroids[0], points[i]);

    for(j = 1; j < centroids.length; j++){
      var dist = distance(centroids[j], points[i]);
      if(dist < minDist){
        minDist = dist;
        centroid = j;
      }
    }

    /**
     * When the point is not attached to a centroid or the point was
     * attached to some other centroid before, the result differs from the
     * previous iteration.
     */
    if (assignments[i] === undefined || assignments[i] !== centroid) {
      converged = false;
    }

    /** Attach the point to the centroid */
    assignments[i] = centroid;

    /** Add the points' coordinates to the sum of its centroid */
    for (j = dim - 1; j >= 0; j--) {
      sums[centroid][j] += points[i][j];
    }

    counts[centroid]++;
  }

  /** Re-calculate the center of the centroid. */
  for (i = 0; i < k; i++) {
    if (counts[i] > 0) {
      for (j = dim - 1; j >= 0; j--) {
        centroids[i][j] = sums[i][j] / counts[i];
      }
    }
  }

  return converged;
}
