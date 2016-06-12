
'use strict';

module.exports = Lorenz;

function Lorenz (n) {
  if (!(this instanceof Lorenz)) return new Lorenz(n);

  return {
    x: [],

    initialize: function (opts) {
      var opts = opts || {};
      this.t = 0;
      this.dt = 0.005;

      for (var i = 0; i < n; i++) {
        var t = i / (n - 1)
        this.x[i] = [
          10 + Math.random() * 10,
          0 + 10 * Math.random(),
          10 + 20 * Math.random()
        ];
      }

      return this;
    },

    iterate: function () {
      var s = 10, b = 8/3, r = 28;
      var p, dx, dy, dz;
      this.t += this.dt;
      var xh, yh, zh;
      for (var i = 0; i < n; i++) {
        p = this.x[i];
        dx = s * (p[1] - p[0]);
        dy = p[0] * (r - p[2]) - p[1];
        dz = p[0] * p[1] - b * p[2];

        xh = p[0] + dx * this.dt * 0.5;
        yh = p[1] + dy * this.dt * 0.5;
        zh = p[2] + dz * this.dt * 0.5;

        dx = s * (yh - xh);
        dy = xh * (r - zh) - yh;
        dz = xh * yh - b * zh;

        p[0] += dx * this.dt;
        p[1] += dy * this.dt;
        p[2] += dz * this.dt;
      }
    },
  };
}
