'use strict';

var Plotly = require('plotly.js');
var Lorenz = require('./lorenz');
var kmeans = require('../');
var rgb = require('color-space/rgb');
var hsl = require('color-space/hsl');

var top = 80;
var margin = {b: 30, l: 30, r: 30, t: 35};

var plot = {
  lorenz: Lorenz(500),
  K: 5,
  x: [],
  y: [],
  cx: [],
  cy: [],
  top: top,
  margin: margin,
  xrange: [-20, 20],
  yrange: [0, 50],
  clusters: {},
  pointColors: [],

  unpack: function () {
    var i, j;
    var n = this.lorenz.x.length;
    this.x = [];

    for (i = 0; i < this.K; i++) {
      this.cx[i] = this.clusters.centroids[i][0];
      this.cy[i] = this.clusters.centroids[i][2];
    }

    for (i = 0; i < n; i++) {
      this.x[i] = this.lorenz.x[i][0];
      this.y[i] = this.lorenz.x[i][2];
      this.pointColors[i] = this.colorTable[this.clusters.assignments[i]];
    }
  },

  iterate: function () {
    this.lorenz.iterate();
    this.cluster(false);
    this.unpack();

    Plotly.animate('plot', [
      {
        x: this.x,
        y: this.y,
        'marker.color': this.pointColors,
      }, {
        x: this.cx,
        y: this.cy
      }
    ], {duration: 0}, [0, 1]);
  },

  cluster: function (initialize) {
    kmeans(this.lorenz.x, {k: this.K, initialize: initialize}, this.clusters);
  },

  _onRAF: function () {
    this.iterate();

    this._raf = requestAnimationFrame(this.onRAF);
  },

  stop: function () {
    cancelAnimationFrame(this._raf);
  },

  start: function () {
    this.onRAF = this._onRAF.bind(this);

    this._raf = requestAnimationFrame(this.onRAF);
  },

  createColors: function () {
    this.colorTable = [];
    for (var i = 0; i < this.K; i++) {
      this.colorTable.push('rgb(' + hsl.rgb([i / this.K * 360, 60, 50]).map(Math.round).join(',') + ')');
    }

    this.meanColors = [];
    for (var i = 0; i < this.K; i++) {
      this.meanColors.push('rgb(' + hsl.rgb([i / this.K * 360, 60, 40]).map(Math.round).join(',') + ')');
    }
  },

  create: function () {
    this.createColors();
    this.lorenz.initialize();
    this.cluster(true);
    this.unpack();

    var plot = document.getElementById('plot');
    window.addEventListener('resize', function () {
      Plotly.relayout('plot', {
        width: plot.offsetWidth,
        height: plot.offsetHeight
      });
    });

    Plotly.plot('plot', [
      {
        x: this.x,
        y: this.y,
        mode: 'markers',
        name: 'Data',
        marker: {
          color: this.pointColors,
          size: 5
        }
      },
      {
        x: this.cx,
        y: this.cy,
        mode: 'markers',
        name: 'Means',
        marker: {
          color: this.meanColors,
          size: 15
        }
      },
    ], {
      xaxis: {
        range: this.xrange,
      },
      yaxis: {
        range: this.yrange,
      },
      font: {
        family: '"Computer Modern Serif", sans-serif',
        size: 16,
      },
      margin: this.margin,
      dragmode: 'pan',
      hovermode: 'closest',
      showlegend: false,
    }, {
      scrollZoom: true
    });

    this.start();
  }
};

plot.create();

window.plot = plot;

