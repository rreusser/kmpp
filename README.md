# kmpp

> The k-means algorithm with k-means++ initialization

## Introduction

This module implements k-means clustering with k-means++ initialization.

# Credits

* [Jared Harkins](https://github.com/hDeraj) improved the performance by
  reducing the amount of function calls, reverting to Manhattan distance
  for measurements and improved the random initialization by choosing from
  points

# Further reading

* [Wikipedia: k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering)
* [Wikipedia: Determining the number of clusters in a data set](https://en.wikipedia.org/wiki/Determining_the_number_of_clusters_in_a_data_set)
* [k-means++: The advantages of careful seeding, Arthur Vassilvitskii](http://ilpubs.stanford.edu:8090/778/1/2006-13.pdf)
* [k-means++: The advantages of careful seeding, Presentation by Arthur Vassilvitskii (Presentation)](http://theory.stanford.edu/~sergei/slides/BATS-Means.pdf)

## License

&copy; 2016 Ricky Reusser. MIT License.
&copy; [cmtt](https://github.com/cmtt). MIT License.

[npm-image]: https://badge.fury.io/js/kmpp.svg
[npm-url]: https://npmjs.org/package/kmpp
[travis-image]: https://travis-ci.org/rreusser/kmpp.svg?branch=master
[travis-url]: https://travis-ci.org//kmpp
[daviddm-image]: https://david-dm.org/rreusser/kmpp.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//kmpp
