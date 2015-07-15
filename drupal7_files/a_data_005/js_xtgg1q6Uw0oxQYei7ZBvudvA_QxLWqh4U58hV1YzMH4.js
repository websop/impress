/*!
 * jQuery meanMenu v2.0.6 (Drupal Responsive Menus version)
 * @Copyright (C) 2012-2013 Chris Wharton (https://github.com/weare2ndfloor/meanMenu)
 *
 */
(function(e){"use strict";e.fn.meanmenu=function(t){var n={meanMenuTarget:jQuery(this),meanMenuContainer:"body",meanMenuClose:"X",meanMenuCloseSize:"18px",meanMenuOpen:"<span /><span /><span />",meanRevealPosition:"right",meanRevealPositionDistance:"0",meanRevealColour:"",meanRevealHoverColour:"",meanScreenWidth:"480",meanNavPush:"",meanShowChildren:true,meanExpandableChildren:true,meanExpand:"+",meanContract:"-",meanRemoveAttrs:false,onePage:false,removeElements:""};var t=e.extend(n,t);var r=document.documentElement.clientWidth||document.body.clientWidth;return this.each(function(){function x(){if(a=="center"){var e=document.documentElement.clientWidth||document.body.clientWidth;var t=e/2-22+"px";C="left:"+t+";right:auto;";if(!S){jQuery(".meanmenu-reveal").css("left",t)}else{jQuery(".meanmenu-reveal").animate({left:t})}}}function A(){if(jQuery(L).is(".meanmenu-reveal.meanclose")){L.html(s)}else{L.html(u)}}function O(){jQuery(".mean-bar,.mean-push").remove();jQuery(i).removeClass("mean-container");jQuery(e).show();T=false;N=false;jQuery(E).removeClass("mean-remove")}function M(){if(r<=h){jQuery(E).addClass("mean-remove");N=true;jQuery(i).addClass("mean-container");jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+k+'">Show Navigation</a><nav class="mean-nav"></nav></div>');var t=jQuery(n).html();jQuery(".mean-nav").html(t);if(b){jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function(){jQuery(this).removeAttr("class");jQuery(this).removeAttr("id")})}jQuery(e).before('<div class="mean-push" />');jQuery(".mean-push").css("margin-top",p);jQuery(e).hide();jQuery(".meanmenu-reveal").show();jQuery(d).html(u);L=jQuery(d);jQuery(".mean-nav ul").hide();if(v){if(m){jQuery(".mean-nav ul ul").each(function(){if(jQuery(this).children().length){jQuery(this,"li:first").parent().append('<a class="mean-expand" href="#" style="font-size: '+o+'">'+g+"</a>")}});jQuery(".mean-expand").on("click",function(e){e.preventDefault();if(jQuery(this).hasClass("mean-clicked")){jQuery(this).text(g);jQuery(this).prev("ul").slideUp(300,function(){})}else{jQuery(this).text(y);jQuery(this).prev("ul").slideDown(300,function(){})}jQuery(this).toggleClass("mean-clicked")})}else{jQuery(".mean-nav ul ul").show()}}else{jQuery(".mean-nav ul ul").hide()}jQuery(".mean-nav ul li").last().addClass("mean-last");L.removeClass("meanclose");jQuery(L).click(function(e){e.preventDefault();if(T==false){L.css("text-align","center");L.css("text-indent","0");L.css("font-size",o);jQuery(".mean-nav ul:first").slideDown(300);T=true}else{jQuery(".mean-nav ul:first").slideUp(300);T=false}L.toggleClass("meanclose");A();jQuery(E).addClass("mean-remove")});if(w){jQuery(".mean-nav ul > li > a:first-child").on("click",function(){jQuery(".mean-nav ul:first").slideUp(300);T=false;jQuery(L).toggleClass("meanclose").html(u)})}}else{O()}}var e=t.meanMenuTarget;var n=t.meanMenuTarget.clone();n.find(".contextual-links-wrapper").remove().find("ul.contextual-links").remove();var i=t.meanMenuContainer;var s=t.meanMenuClose;var o=t.meanMenuCloseSize;var u=t.meanMenuOpen;var a=t.meanRevealPosition;var f=t.meanRevealPositionDistance;var l=t.meanRevealColour;var c=t.meanRevealHoverColour;var h=t.meanScreenWidth;var p=t.meanNavPush;var d=".meanmenu-reveal";var v=t.meanShowChildren;var m=t.meanExpandableChildren;var g=t.meanExpand;var y=t.meanContract;var b=t.meanRemoveAttrs;var w=t.onePage;var E=t.removeElements;if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Blackberry/i)||navigator.userAgent.match(/Windows Phone/i)){var S=true}if(navigator.userAgent.match(/MSIE 8/i)||navigator.userAgent.match(/MSIE 7/i)){jQuery("html").css("overflow-y","scroll")}var T=false;var N=false;if(a=="right"){C="right:"+f+";left:auto;"}if(a=="left"){var C="left:"+f+";right:auto;"}x();var k="background:"+l+";color:"+l+";"+C;var L="";if(!S){jQuery(window).resize(function(){r=document.documentElement.clientWidth||document.body.clientWidth;if(r>h){O()}else{O()}if(r<=h){M();x()}else{O()}})}window.onorientationchange=function(){x();r=document.documentElement.clientWidth||document.body.clientWidth;if(r>=h){O()}if(r<=h){if(N==false){M()}}};M()})}})(jQuery)
;
/**
 * @file
 * Integrate Mean Menu library with Responsive Menus module.
 */
(function ($) {
  Drupal.behaviors.responsive_menus_mean_menu = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      $.each(settings.responsive_menus, function(ind, iteration) {
        if (iteration.responsive_menus_style != 'mean_menu') {
          return true;
        }
        if (!iteration.selectors.length) {
          return;
        }
        // Set 1/0 to true/false respectively.
        $.each(iteration, function(key, value) {
          if (value == 0) {
            iteration[key] = false;
          }
          if (value == 1) {
            iteration[key] = true;
          }
        });
        // Call meanmenu() with our custom settings.
        $(iteration.selectors).once('responsive-menus-mean-menu', function() {
          $(this).meanmenu({
            meanMenuClose: iteration.close_txt || "X",
            meanMenuCloseSize: iteration.close_size || "18px",
            meanMenuOpen: iteration.trigger_txt || "<span /><span /><span />",
            meanRevealPosition: iteration.position || "right",
            meanScreenWidth: iteration.media_size || "480",
            meanExpand: iteration.expand_txt || "+",
            meanContract: iteration.contract_txt || "-",
            meanShowChildren: iteration.show_children,
            meanExpandableChildren: iteration.expand_children,
            meanRemoveAttrs: iteration.remove_attrs
          });
        });
      });

    }
  };
}(jQuery));
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", "event", "Downloads", Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(), Drupal.googleanalytics.getPageUrl(this.href));
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(this.href) });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", "event", "Mails", "Click", this.href.substring(7));
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode != 2 || (Drupal.settings.googleanalytics.trackDomainMode == 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", "event", "Outbound links", "Click", this.href);
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga('send', 'pageview', location.pathname + location.search + location.hash);
    }
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function () {
    var href = $.colorbox.element().attr("href");
    if (href) {
      ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(href) });
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
