'use strict';

var assert = require('chai').assert;
var kmpp2 = require('../index');

describe('kmpp', function () {
  var runs = 100;

  it('effectively never fails given km++ initilaization (' + runs + ' runs)', function () {
    var i, run, k, n, x, offset;

    k = 3;
    n = 20;
    offset = 1e6;

    for (i = 0, x = []; i < n; i++) {
      x[i] = [Math.floor(i * k / n) * 1e6 + i];
    }

    for (run = 0; run < runs; run++) {
      var out = kmpp2(x, {k: k, kmpp: true});

      for (i = 0; i < k; i++) {
        assert(out.centroids[i][0] % offset < n, 'means is within ' + n + ' of ' + offset + ' * n (got means = ' + JSON.stringify(out.centroids) + ')');
      }
    }
  });
});
