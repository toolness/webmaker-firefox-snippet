(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var setVendorPrefix = require('./set-vendor-prefix');

module.exports = function ribbonate(el, position) {
  position = position.split(' ');
  setVendorPrefix(el, 'box-sizing', 'border-box');

  var elRect = el.getBoundingClientRect();
  var style = window.getComputedStyle(el);
  var square = document.createElement('div');
  var squareSide = elRect.width;
  var ribbonWidth = 2 * squareSide;
  var rotation = 45;
  var translation = elRect.height/2;

  square.style.position = "absolute";
  square.style.overflow = "hidden";

  if (position[0] == "top") {
    square.style.top = "0";
    rotation *= position[1] == "left" ? -1 : 1;
    translation *= -1;
  } else {
    square.style.bottom = "0";
    rotation *= position[1] == "left" ? 1 : -1;
    translation *= 1;
  }

  if (position[1] == "left") {
    square.style.left = "0";
  } else {
    square.style.right = "0";
  }

  square.style.width = square.style.height = squareSide + "px";

  el.parentNode.replaceChild(square, el);
  square.appendChild(el);

  el.style.position = "absolute";
  el.style.top = (squareSide/2 - elRect.height/2) + "px";
  el.style.left = (-(ribbonWidth-squareSide)/2) + "px";
  el.style.textAlign = "center";
  el.style.width = ribbonWidth + "px";
  setVendorPrefix(el, "transform", "rotate(" + rotation + "deg) " +
                                   "translateY(" + translation + "px)");
  return square;
};

},{"./set-vendor-prefix":2}],2:[function(require,module,exports){
// https://gist.github.com/vjt/827679
function camelize(str) {
  return str.replace(/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  });
}

module.exports = function setVendorPrefix(el, prop, value) {
  ['-o-', '-moz-', '-webkit-', ''].forEach(function(prefix) {
    var prefixedProp = prefix + prop;
    var camelizedProp = camelize(prefixedProp);
    if (prefixedProp in el.style)
      el.style[prefixedProp] = value;
    else if (camelizedProp in el.style)
      el.style[camelizedProp] = value;
  });
};

},{}],3:[function(require,module,exports){
var $ = exports.$ = function $(sel) {
  return array(document.querySelectorAll(sel));
};

var array = exports.array = function array(arrayLike) {
  return [].slice.call(arrayLike);
};

},{}],4:[function(require,module,exports){
var ribbonate = require('../lib/ribbonate');
var $ = require('../lib/util').$;

window.addEventListener('DOMContentLoaded', function() {
  $('[data-ribbonate]').forEach(function(el) {
    ribbonate(el, el.getAttribute('data-ribbonate'));
  });
}, false);

window.ribbonate = ribbonate;

},{"../lib/ribbonate":1,"../lib/util":3}]},{},[4])