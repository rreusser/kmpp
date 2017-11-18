"use strict";

module.exports = kmeans;

var initializeKmpp = require('./src/initialize-kmpp');
var initializeNaive = require('./src/initialize-naive');
var iterate = require('./src/iterate');
var distanceMetric = require('./src/l-distance');

function kmeans (points, opts, state) {
  var i, k, n, dim, iter, converged, c, initializer;

  opts = opts || {};
  var initialize = opts.initialize === undefined ? (!state.centroids) : opts.initialize;
  var kmpp = opts.kmpp === undefined ? true : !!opts.kmpp;
  var norm = opts.norm === undefined ? 2 : opts.norm;
  var distance = opts.distance === undefined ? distanceMetric(norm) : opts.distance;
  var maxIterations = opts.maxIterations === undefined ? 100 : opts.maxIterations;

  n = points.length;
  dim = points[0].length;

  if (opts.k === undefined) {
    k = ~~(Math.sqrt(n * 0.5));
  } else {
    k = opts.k;
  }

  state = state || {};
  state.centroids = state.centroids || new Array(k);
  state.counts = state.counts || new Array(k);
  state.assignments = state.assignments || new Array(n);

  // Initialize the components of the centroids if they don't look right:
  for (i = 0; i < k; i++) {
    c = state.centroids[i];
    if (!Array.isArray(c) || state.centroids[i].length !== dim) {
      state.centroids[i] = [];
    }
  }

  if (initialize) {
    initializer = kmpp ? initializeKmpp : initializeNaive;

    initializer(k, points, state, distance);
  }

  state.converged = state.converged || false;
  iter = 0;

  while (!state.converged && ++iter <= maxIterations) {
    state.converged = iterate(k, points, state, distance);
  }

  return state;
};
