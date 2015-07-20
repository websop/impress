/**
 * Polyfill the behavior of window.matchMedia.
 *
 * @see http://dev.w3.org/csswg/cssom-view/#widl-Window-matchMedia-MediaQueryList-DOMString-query
 *
 * Test whether a CSS media type or media query applies. Register listeners
 * to MediaQueryList objects.
 *
 * Adapted from https://github.com/paulirish/matchMedia.js with the addition
 * of addListener and removeListener. The polyfill referenced above uses
 * polling to trigger registered listeners on matchMedia tests.
 * This polyfill triggers tests on window resize and orientationchange.
 */

window.matchMedia = window.matchMedia || (function (doc, window) {

  "use strict";

  var docElem = doc.documentElement;
  var refNode = docElem.firstElementChild || docElem.firstChild;
  // fakeBody required for <FF4 when executed in <head>.
  var fakeBody = doc.createElement("body");
  var div = doc.createElement("div");

  div.id = "mq-test-1";
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none";
  fakeBody.appendChild(div);

  // Global cache to speed up media matching (in IE).
  var _cache = {};

  // Store current dimensions, so we can clear the cache when needed.
  var _currentDimensions = {
    width: window.innerWidth || doc.documentElement.clientWidth,
    height: window.innerHeight || doc.documentElement.clientHeight
  };

  function resetCache() {
    // Store the new dimensions.
    _currentDimensions = {
      width: window.innerWidth || doc.documentElement.clientWidth,
      height: window.innerHeight || doc.documentElement.clientHeight
    };
    // Clear cache.
    _cache = {};
  }

  // Clear cache on resize and orientationchange events.
  if ('addEventListener' in window) {
    window.addEventListener('resize', resetCache);
    window.addEventListener('orientationchange', resetCache);
  }
  else if ('attachEvent' in window) {
    window.attachEvent('onresize', resetCache);
    window.attachEvent('onorientationchange', resetCache);
  }

  /**
   * A replacement for the native MediaQueryList object.
   *
   * @param {String} q
   *   A media query e.g. "screen" or "screen and (min-width: 28em)".
   */
  function MediaQueryList (q) {
    this.media = q;
    this.matches = false;
    if (_cache.hasOwnProperty(q)) {
      this.matches = _cache[q];
    }
    else {
      this.check.call(this);
      _cache[q] = this.matches;
    }
  }

  /**
   * Polyfill the addListener and removeListener methods.
   */
  MediaQueryList.prototype = {
    listeners: [],

    /**
     * Perform the media query application check.
     */
    check: function () {
      var isApplied;
      div.innerHTML = "&shy;<style media=\"" + this.media + "\"> #mq-test-1 {width: 42px;}</style>";
      docElem.insertBefore(fakeBody, refNode);
      isApplied = div.offsetWidth === 42;
      docElem.removeChild(fakeBody);
      this.matches = isApplied;
    },

    /**
     * Polyfill the addListener method of the MediaQueryList object.
     *
     * @param {Function} callback
     *   The callback to be invoked when the media query is applicable.
     *
     * @return {Object MediaQueryList}
     *   A MediaQueryList object that indicates whether the registered media
     *   query applies. The matches property is true when the media query
     *   applies and false when not. The original media query is referenced in
     *   the media property.
     */
    addListener: function (callback) {
      var handler = (function (mql, debounced) {
        return function () {
          // Only execute the callback if the state has changed.
          var oldstate = mql.matches;
          mql.check();
          if (oldstate != mql.matches) {
            debounced.call(mql, mql);
          }
        };
      }(this, debounce(callback, 250)));
      this.listeners.push({
        'callback': callback,
        'handler': handler
      });

      // Associate the handler to the resize and orientationchange events.
      if ('addEventListener' in window) {
        window.addEventListener('resize', handler);
        window.addEventListener('orientationchange', handler);
      }
      else if ('attachEvent' in window) {
        window.attachEvent('onresize', handler);
        window.attachEvent('onorientationchange', handler);
      }
    },

    /**
     * Polyfill the removeListener method of the MediaQueryList object.
     *
     * @param {Function} callback
     *   The callback to be removed from the set of listeners.
     */
    removeListener: function (callback) {
      for (var i = 0, listeners = this.listeners; i < listeners.length; i++) {
        if (listeners[i].callback === callback) {
          // Disassociate the handler to the resize and orientationchange events.
          if ('removeEventListener' in window) {
            window.removeEventListener('resize', listeners[i].handler);
            window.removeEventListener('orientationchange', listeners[i].handler);
          }
          else if ('detachEvent' in window) {
            window.detachEvent('onresize', listeners[i].handler);
            window.detachEvent('onorientationchange', listeners[i].handler);
          }
          listeners.splice(i, 1);
        }
      }
    }
  };

  /**
   * Limits the invocations of a function in a given time frame.
   *
   * @param {Function} callback
   *   The function to be invoked.
   *
   * @param {Number} wait
   *   The time period within which the callback function should only be
   *   invoked once. For example if the wait period is 250ms, then the callback
   *   will only be called at most 4 times per second.
   */
  function debounce (callback, wait) {
    var timeout, result;
    return function () {
      var context = this;
      var args = arguments;
      var later = function () {
        timeout = null;
        result = callback.apply(context, args);
      };
      window.clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
      return result;
    };
  }

  /**
   * Return a MediaQueryList.
   *
   * @param {String} q
   *   A media query e.g. "screen" or "screen and (min-width: 28em)". The media
   *   query is checked for applicability before the object is returned.
   */
  return function (q) {
    // Build a new MediaQueryList object with the result of the check.
    return new MediaQueryList(q);
  };
}(document, window));
;
/*jshint loopfunc: true, browser: true, curly: true, eqeqeq: true, expr: true, forin: true, latedef: true, newcap: true, noarg: true, trailing: true, undef: true, unused: true */
/*! Picturefill - Author: Scott Jehl, 2012 | License: MIT/GPLv2 */
(function(w, parent){

  // Enable strict mode.
  "use strict";

  w.picturefill = function(parent) {
    // Copy attributes from the source to the destination.
    function _copyAttributes(src, tar) {
      if (src.getAttribute('data-width') && src.getAttribute('data-height')) {
        tar.width = src.getAttribute('data-width');
        tar.height = src.getAttribute('data-height');
      }
      else {
        tar.removeAttribute('width');
        tar.removeAttribute('height');
      }
    }

    // Get all picture tags.
    if (!parent || !parent.getElementsByTagName) {
      parent = w.document;
    }
    var ps = parent.getElementsByTagName('span');

    // Loop the pictures.
    for (var i = 0, il = ps.length; i < il; i++ ) {
      if (ps[i].getAttribute('data-picture') !== null) {
        var sources = ps[i].getElementsByTagName('span');
        var picImg = null;
        var matches = [];

        // See which sources match.
        for (var j = 0, jl = sources.length; j < jl; j++ ) {
          var media = sources[j].getAttribute('data-media');

          // If there's no media specified or the media query matches, add it.
          if (!media || (w.matchMedia && w.matchMedia(media).matches)) {
            matches.push(sources[j]);
          }
        }

        if (matches.length) {
          // Grab the most appropriate (last) match.
          var match = matches.pop();

          // Find any existing img element in the picture element.
          picImg = ps[i].getElementsByTagName('img')[0];

          // Add a new img element if one doesn't exists.
          if (!picImg) {
            picImg = w.document.createElement('img');
            picImg.alt = ps[i].getAttribute('data-alt') || '';
            picImg.title = ps[i].getAttribute('data-title') || '';
            ps[i].appendChild(picImg);
          }

          // Set the source if it's different.
          if (picImg.getAttribute('src') !== match.getAttribute('data-src')) {
            picImg.src = match.getAttribute('data-src');
            _copyAttributes(match, picImg);
          }
        }
      }
    }
  };

  // Run on resize and domready (w.load as a fallback)
  if (w.addEventListener) {
    w.addEventListener('resize', w.picturefill, false);
    w.addEventListener('DOMContentLoaded', function() {
      w.picturefill();
      // Run once only.
      w.removeEventListener('load', w.picturefill, false);
    }, false);
    w.addEventListener('load', w.picturefill, false);
  }
  else if (w.attachEvent) {
    w.attachEvent('onload', w.picturefill);
  }
})(this);;
if (typeof Drupal !== 'undefined' && typeof jQuery !== 'undefined') {
  // only load if Drupal and jQuery are defined.
  (function ($) {
    Drupal.behaviors.picture = {
      attach: function (context) {
        window.picturefill(context);
      }
    };
  })(jQuery);
};
