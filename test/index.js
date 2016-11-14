'use strict';

var assert = require('chai').assert;
var kmpp = require('../index');

describe('kmpp', function () {
  var runs = 10000;

  it('effectively never fails given km++ initilaization (' + runs + ' runs)', function () {
    var i, run, k, n, x, offset;

    k = 3;
    n = 20;
    offset = 1e6;

    for (i = 0, x = []; i < n; i++) {
      x[i] = [Math.floor(i * k / n) * 1e6 + i];
    }

    for (run = 0; run < runs; run++) {
      var out = kmpp(x, {k: k, kmpp: true});

      for (i = 0; i < k; i++) {
        assert(out.centroids[i][0] % offset < n, 'means is within ' + n + ' of ' + offset + ' * n (got means = ' + JSON.stringify(out.centroids) + ')');
      }

      var sum = 0;
      for (i = 0; i < k; i++) {
        sum += out.counts[i];
      }

      assert.equal(sum, n, 'All points are assigned');
    }
  });

  it('accepts repeated application on state i/o', function () {
    runs = 2;
    var i, k, n, x, offset, run;

    k = 3;
    n = 20;
    offset = 1e6;

    for (i = 0, x = []; i < n; i++) {
      x[i] = [Math.floor(i * k / n) * 1e6 + i];
    }

    for (run = 0; run < runs; run++) {
      var out = kmpp(x, {k: k, kmpp: true});

      assert.equal(out, state, 'returns state object');

      for (i = 0; i < k; i++) {
        assert(out.centroids[i][0] % offset < n, 'means is within ' + n + ' of ' + offset + ' * n (got means = ' + JSON.stringify(out.centroids) + ')');
      }

      var sum = 0;
      for (i = 0; i < k; i++) {
        sum += state.counts[i];
      }

      assert.equal(sum, n, 'All points are assigned');
    }
  });

  it('runs successfully without km++ initialization', function () {
    runs = 2;
    var i, k, n, x, run;

    k = 3;
    n = 20;

    for (i = 0, x = []; i < n; i++) {
      x[i] = [Math.floor(i * k / n) * 1e6 + i];
    }

    for (run = 0; run < runs; run++) {
      var out = kmpp(x, {k: k, kmpp: false});

      var sum = 0;
      for (i = 0; i < k; i++) {
        sum += state.counts[i];
      }

      assert.equal(sum, n, 'All points are assigned');
    }
  });
});
