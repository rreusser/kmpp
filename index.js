"use strict";

module.exports = kmeans;

var guessK = require('./src/guess-k');
var initializeKmpp = require('./src/initialize-kmpp');
var initializeNaive = require('./src/initialize-naive');
var iterate = require('./src/iterate');
var l1Distance = require('./src/l1-distance');

function kmeans (points, opts) {
  var i, k, n, dim, iter, converged;

  opts = opts || {};
  var initialize = opts.initialize === undefined ? true : opts.initialize;
  var kmpp = opts.kmpp === undefined ? true : !!opts.kmpp;
  var distance = opts.distance === undefined ? l1Distance : opts.distance;
  var maxIterations = opts.maxIterations === undefined ? 10 : opts.maxIterations;
  var initializer = opts.kmpp ? initializeKmpp : initializeNaive;

  n = points.length;
  dim = points[0].length;

  if (!k) {
    k = guessK(n);
  }

  var centroids = [];
  var counts = [];
  var assignments = [];
  var sums = [];

  if (initialize) {
    initializer(k, points, centroids, counts, assignments, distance);
  }

  for (i = 0; i < k; i++) {
    sums[i] = new Array(dim);
  }

  converged = false;
  iter = 0;

  while (!converged && ++iter <= maxIterations) {
    converged = iterate(k, points, centroids, counts, assignments, distance, sums);
  }

  return {
    centroids: centroids,
    counts: counts,
    assignments: assignments
  };

};
