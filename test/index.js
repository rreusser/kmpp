'use strict';

var kmpp = require('../kmpp');
var test = require('tape');

test('effectively never fails given km++ initilaization', function (t) {
  var i, run, k, n, x, offset, runs;

  k = 3;
  n = 20;
  offset = 1e6;
  runs = 10000;

  for (i = 0, x = []; i < n; i++) {
    x[i] = [Math.floor(i * k / n) * 1e6 + i];
  }

  for (run = 0; run < runs; run++) {
    var out = kmpp(x, {k: k, kmpp: true});

    for (i = 0; i < k; i++) {
      t.assert(out.centroids[i][0] % offset < n, 'means is within ' + n + ' of ' + offset + ' * n (got means = ' + JSON.stringify(out.centroids) + ')');
    }

    var sum = 0;
    for (i = 0; i < k; i++) {
      sum += out.counts[i];
    }

    t.equal(sum, n, 'All points are assigned');
  }

  t.end();
});

test('accepts repeated application on state i/o', function (t) {
  var runs = 2, run;
  var i, k, n, x, offset;
  var state = {};

  k = 3;
  n = 20;
  offset = 1e6;

  for (i = 0, x = []; i < n; i++) {
    x[i] = [Math.floor(i * k / n) * 1e6 + i];
  }

  for (run = 0; run < runs; run++) {
    var out = kmpp(x, {k: k, kmpp: true}, state);

    t.equal(out, state, 'input === output');

    for (i = 0; i < k; i++) {
      t.assert(out.centroids[i][0] % offset < n, 'means is within ' + n + ' of ' + offset + ' * n (got means = ' + JSON.stringify(out.centroids) + ')');
    }

    var sum = 0;
    for (i = 0; i < k; i++) {
      sum += state.counts[i];
    }

    t.equal(sum, n, 'All points are assigned');
  }

  t.end();
});

test('runs successfully without km++ initialization', function (t) {
  var i, j, k, n, x, offset, run;
  var state = {};
  var runs = 2;

  k = 3;
  n = 20;
  offset = 1e6;

  for (i = 0, x = []; i < n; i++) {
    x[i] = [Math.floor(i * k / n) * 1e6 + i];
  }

  for (run = 0; run < runs; run++) {
    var out = kmpp(x, {k: k, kmpp: false}, state);
    console.log(out);
    t.equal(out, state, 'input === output');

    var sum = 0;
    for (i = 0; i < k; i++) {
      sum += state.counts[i];
    }

    t.equal(sum, n, 'All points are assigned');
  }

  t.end();
});
