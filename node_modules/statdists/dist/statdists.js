(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["statdists"] = factory();
	else
		root["statdists"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return Math.random();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSource = __webpack_require__(0);

var _defaultSource2 = _interopRequireDefault(_defaultSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function () {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) y = x, x = null;

      // Otherwise, generate a new x and y.
      else do {
          x = source() * 2 - 1;
          y = source() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  randomNormal.source = sourceRandomNormal;

  return randomNormal;
}(_defaultSource2.default);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSource = __webpack_require__(0);

var _defaultSource2 = _interopRequireDefault(_defaultSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function sourceRandomIrwinHall(source) {
  function randomIrwinHall(n) {
    return function () {
      for (var sum = 0, i = 0; i < n; ++i) {
        sum += source();
      }return sum;
    };
  }

  randomIrwinHall.source = sourceRandomIrwinHall;

  return randomIrwinHall;
}(_defaultSource2.default);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @ts-check

// Calculates the gamma function using the Anscoz approximation
/**
 * @param {number} x - Numeric vector
 * @return {number} - Result of gamma(x)
 */
var gammaFunc = function gammaFunc(x) {
  var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

  var g = 7;
  if (x < 0.5) {
    return Math.PI / (Math.sin(Math.PI * x) * gammaFunc(1 - x));
  }

  x -= 1;
  var a = p[0];
  var t = x + g + 0.5;
  for (var i = 1; i < p.length; i++) {
    a += p[i] / (x + i);
  }

  return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
};

module.exports = gammaFunc;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rnorm = __webpack_require__(5);

var _rnorm2 = _interopRequireDefault(_rnorm);

var _dnorm = __webpack_require__(11);

var _dnorm2 = _interopRequireDefault(_dnorm);

var _dunif = __webpack_require__(13);

var _dunif2 = _interopRequireDefault(_dunif);

var _runif = __webpack_require__(14);

var _runif2 = _interopRequireDefault(_runif);

var _mean = __webpack_require__(15);

var _mean2 = _interopRequireDefault(_mean);

var _max = __webpack_require__(16);

var _max2 = _interopRequireDefault(_max);

var _min = __webpack_require__(17);

var _min2 = _interopRequireDefault(_min);

var _scale = __webpack_require__(18);

var _scale2 = _interopRequireDefault(_scale);

var _vadd = __webpack_require__(19);

var _vadd2 = _interopRequireDefault(_vadd);

var _vsub = __webpack_require__(20);

var _vsub2 = _interopRequireDefault(_vsub);

var _log = __webpack_require__(21);

var _log2 = _interopRequireDefault(_log);

var _sum = __webpack_require__(22);

var _sum2 = _interopRequireDefault(_sum);

var _emptyArr = __webpack_require__(23);

var _emptyArr2 = _interopRequireDefault(_emptyArr);

var _gammaFunc = __webpack_require__(3);

var _gammaFunc2 = _interopRequireDefault(_gammaFunc);

var _betaFunc = __webpack_require__(24);

var _betaFunc2 = _interopRequireDefault(_betaFunc);

var _factorial = __webpack_require__(25);

var _factorial2 = _interopRequireDefault(_factorial);

var _within = __webpack_require__(26);

var _within2 = _interopRequireDefault(_within);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  rnorm: _rnorm2.default,
  dnorm: _dnorm2.default,
  dunif: _dunif2.default,
  runif: _runif2.default,
  mean: _mean2.default,
  max: _max2.default,
  min: _min2.default,
  scale: _scale2.default,
  vadd: _vadd2.default,
  vsub: _vsub2.default,
  log: _log2.default,
  sum: _sum2.default,
  emptyArr: _emptyArr2.default,
  gammaFunc: _gammaFunc2.default,
  betaFunc: _betaFunc2.default,
  factorial: _factorial2.default,
  within: _within2.default
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Random = __webpack_require__(6);

// Generates n normal values
exports.default = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var gen = (0, _d3Random.randomNormal)(mu, sigma);
  return Array.from(new Array(n), function () {
    return gen();
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniform = __webpack_require__(7);

Object.defineProperty(exports, "randomUniform", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_uniform).default;
  }
});

var _normal = __webpack_require__(1);

Object.defineProperty(exports, "randomNormal", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_normal).default;
  }
});

var _logNormal = __webpack_require__(8);

Object.defineProperty(exports, "randomLogNormal", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_logNormal).default;
  }
});

var _bates = __webpack_require__(9);

Object.defineProperty(exports, "randomBates", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bates).default;
  }
});

var _irwinHall = __webpack_require__(2);

Object.defineProperty(exports, "randomIrwinHall", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_irwinHall).default;
  }
});

var _exponential = __webpack_require__(10);

Object.defineProperty(exports, "randomExponential", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_exponential).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSource = __webpack_require__(0);

var _defaultSource2 = _interopRequireDefault(_defaultSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function sourceRandomUniform(source) {
  function randomUniform(min, max) {
    min = min == null ? 0 : +min;
    max = max == null ? 1 : +max;
    if (arguments.length === 1) max = min, min = 0;else max -= min;
    return function () {
      return source() * max + min;
    };
  }

  randomUniform.source = sourceRandomUniform;

  return randomUniform;
}(_defaultSource2.default);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSource = __webpack_require__(0);

var _defaultSource2 = _interopRequireDefault(_defaultSource);

var _normal = __webpack_require__(1);

var _normal2 = _interopRequireDefault(_normal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function sourceRandomLogNormal(source) {
  function randomLogNormal() {
    var randomNormal = _normal2.default.source(source).apply(this, arguments);
    return function () {
      return Math.exp(randomNormal());
    };
  }

  randomLogNormal.source = sourceRandomLogNormal;

  return randomLogNormal;
}(_defaultSource2.default);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSource = __webpack_require__(0);

var _defaultSource2 = _interopRequireDefault(_defaultSource);

var _irwinHall = __webpack_require__(2);

var _irwinHall2 = _interopRequireDefault(_irwinHall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function sourceRandomBates(source) {
  function randomBates(n) {
    var randomIrwinHall = _irwinHall2.default.source(source)(n);
    return function () {
      return randomIrwinHall() / n;
    };
  }

  randomBates.source = sourceRandomBates;

  return randomBates;
}(_defaultSource2.default);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSource = __webpack_require__(0);

var _defaultSource2 = _interopRequireDefault(_defaultSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function sourceRandomExponential(source) {
  function randomExponential(lambda) {
    return function () {
      return -Math.log(1 - source()) / lambda;
    };
  }

  randomExponential.source = sourceRandomExponential;

  return randomExponential;
}(_defaultSource2.default);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normPdf = __webpack_require__(12);

var _normPdf2 = _interopRequireDefault(_normPdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// computes pdf for a given x  given
// normal dist w/ given params
exports.default = function (x) {
  var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.isArray(x) ? x.map(function (d) {
    return (0, _normPdf2.default)(d, mu, sigma);
  }) : (0, _normPdf2.default)(x, mu, sigma);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sqrt = Math.sqrt,
    exp = Math.exp,
    pow = Math.pow,
    pi = Math.PI;

exports.default = function (x, mu, sigma) {
  var variance = pow(sigma, 2);
  return 1 / sqrt(2 * pi * variance) * exp(-pow(x - mu, 2) / (2 * variance));
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vals) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (Array.isArray(vals)) {
    return vals.map(function (d) {
      return d < max && d > min ? 1 / (max - min) : 0;
    });
  } else {
    return vals < max && vals > min ? 1 / (max - min) : 0;
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var range = end - start;
  var gen = function gen() {
    return Math.random() * range + start;
  };
  return Array.from(new Array(n), function () {
    return gen();
  });
};

; // @ts-check
// import {randomNormal} from 'd3-random';

// Generates n random uniform values
/**
 * @param {number} n - number of samples you want.
 * @param {number} [start = 0] - low end of range
 * @param {number} [end = 1] - high end of range
 * @return {number[]} - array of random uniforms
 */

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vals) {
  var N = vals.length;
  return vals.reduce(function (total, current) {
    return total + current / N;
  }, 0);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vals) {
  return Math.max.apply(Math, _toConsumableArray(vals));
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // @ts-check

// Finds the max of an array of numbers
/**
 * @param {number[]} vals - array of numbers
 * @return {number} - largest value of the array
 */

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vals) {
  return Math.min.apply(Math, _toConsumableArray(vals));
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // @ts-check

// Finds the minimum of an array of numbers
/**
 * @param {number[]} vals - array of numbers
 * @return {number} - smallest value of the array
 */

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vec, scaler) {
  return vec.map(function (d) {
    return d * scaler;
  });
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vec1, vec2) {
  return vec1.map(function (d, i) {
    return d + vec2[i];
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vec1, vec2) {
  return vec1.map(function (d, i) {
    return d - vec2[i];
  });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vals) {
  return isArray(vals) ? vals.map(function (d) {
    return Math.log(d);
  }) : Math.log(vals);
};

var isArray = Array.isArray;

// @ts-check

// takes a vector or scaler and and returns logged values.
/**
 * @param {number[] | number} vals - vector of numbers or single number
 * @return {number[]| number} - Input log transformed
 */

;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vec) {
  return vec.reduce(function (s, d) {
    return s + d;
  }, 0);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (n) {
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return Array.from(new Array(n), function () {
    return fill;
  });
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (alpha, beta) {
  return (0, _gammaFunc2.default)(alpha) * (0, _gammaFunc2.default)(beta) / (0, _gammaFunc2.default)(alpha + beta);
};

var _gammaFunc = __webpack_require__(3);

var _gammaFunc2 = _interopRequireDefault(_gammaFunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (x) {
  return x == 0 ? 1 : Array.from(new Array(x - 1), function (d, i) {
    return i + 1;
  }).reduce(function (prod, j) {
    return prod * (x - j);
  }, x);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// @ts-check

// Logical check for if a value is within (a, b). Inclusive so 2 not between 2 and 3.
/**
 * @param {number} x - Number
 * @param {number} a - Lower bounds
 * @param {number} b - Upper bounds
 * @return {boolean} - If x is between a and b.
 */
exports.default = function (x, a, b) {
  return x > a && x < b;
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=statdists.js.map