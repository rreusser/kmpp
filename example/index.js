var kmpp = require('../');

var pts = [];
for (var i = 0; i < 100; i++) {
  pts.push([Math.random(), Math.random()]);
}

console.log(kmpp(pts, {k: 4}));

