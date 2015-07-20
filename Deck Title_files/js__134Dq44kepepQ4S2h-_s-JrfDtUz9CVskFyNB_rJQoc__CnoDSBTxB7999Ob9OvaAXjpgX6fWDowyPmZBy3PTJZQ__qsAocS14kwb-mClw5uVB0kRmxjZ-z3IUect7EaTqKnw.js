/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function($){function sc_setScroll(a,b,c){return"transition"==c.transition&&"swing"==b&&(b="ease"),{anims:[],duration:a,orgDuration:a,easing:b,startTime:getTime()}}function sc_startScroll(a,b){for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e&&e[0][b.transition](e[1],a.duration,a.easing,e[2])}}function sc_stopScroll(a,b){is_boolean(b)||(b=!0),is_object(a.pre)&&sc_stopScroll(a.pre,b);for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e[0].stop(!0),b&&(e[0].css(e[1]),is_function(e[2])&&e[2]())}is_object(a.post)&&sc_stopScroll(a.post,b)}function sc_afterScroll(a,b,c){switch(b&&b.remove(),c.fx){case"fade":case"crossfade":case"cover-fade":case"uncover-fade":a.css("opacity",1),a.css("filter","")}}function sc_fireCallbacks(a,b,c,d,e){if(b[c]&&b[c].call(a,d),e[c].length)for(var f=0,g=e[c].length;g>f;f++)e[c][f].call(a,d);return[]}function sc_fireQueue(a,b,c){return b.length&&(a.trigger(cf_e(b[0][0],c),b[0][1]),b.shift()),b}function sc_hideHiddenItems(a){a.each(function(){var a=$(this);a.data("_cfs_isHidden",a.is(":hidden")).hide()})}function sc_showHiddenItems(a){a&&a.each(function(){var a=$(this);a.data("_cfs_isHidden")||a.show()})}function sc_clearTimers(a){return a.auto&&clearTimeout(a.auto),a.progress&&clearInterval(a.progress),a}function sc_mapCallbackArguments(a,b,c,d,e,f,g){return{width:g.width,height:g.height,items:{old:a,skipped:b,visible:c},scroll:{items:d,direction:e,duration:f}}}function sc_getDuration(a,b,c,d){var e=a.duration;return"none"==a.fx?0:("auto"==e?e=b.scroll.duration/b.scroll.items*c:10>e&&(e=d/e),1>e?0:("fade"==a.fx&&(e/=2),Math.round(e)))}function nv_showNavi(a,b,c){var d=is_number(a.items.minimum)?a.items.minimum:a.items.visible+1;if("show"==b||"hide"==b)var e=b;else if(d>b){debug(c,"Not enough items ("+b+" total, "+d+" needed): Hiding navigation.");var e="hide"}else var e="show";var f="show"==e?"removeClass":"addClass",g=cf_c("hidden",c);a.auto.button&&a.auto.button[e]()[f](g),a.prev.button&&a.prev.button[e]()[f](g),a.next.button&&a.next.button[e]()[f](g),a.pagination.container&&a.pagination.container[e]()[f](g)}function nv_enableNavi(a,b,c){if(!a.circular&&!a.infinite){var d="removeClass"==b||"addClass"==b?b:!1,e=cf_c("disabled",c);if(a.auto.button&&d&&a.auto.button[d](e),a.prev.button){var f=d||0==b?"addClass":"removeClass";a.prev.button[f](e)}if(a.next.button){var f=d||b==a.items.visible?"addClass":"removeClass";a.next.button[f](e)}}}function go_getObject(a,b){return is_function(b)?b=b.call(a):is_undefined(b)&&(b={}),b}function go_getItemsObject(a,b){return b=go_getObject(a,b),is_number(b)?b={visible:b}:"variable"==b?b={visible:b,width:b,height:b}:is_object(b)||(b={}),b}function go_getScrollObject(a,b){return b=go_getObject(a,b),is_number(b)?b=50>=b?{items:b}:{duration:b}:is_string(b)?b={easing:b}:is_object(b)||(b={}),b}function go_getNaviObject(a,b){if(b=go_getObject(a,b),is_string(b)){var c=cf_getKeyCode(b);b=-1==c?$(b):c}return b}function go_getAutoObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_boolean(b)?b={play:b}:is_number(b)&&(b={timeoutDuration:b}),b.progress&&(is_string(b.progress)||is_jquery(b.progress))&&(b.progress={bar:b.progress}),b}function go_complementAutoObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_boolean(b.play)||(b.play=!0),is_number(b.delay)||(b.delay=0),is_undefined(b.pauseOnEvent)&&(b.pauseOnEvent=!0),is_boolean(b.pauseOnResize)||(b.pauseOnResize=!0),is_number(b.timeoutDuration)||(b.timeoutDuration=10>b.duration?2500:5*b.duration),b.progress&&(is_function(b.progress.bar)&&(b.progress.bar=b.progress.bar.call(a)),is_string(b.progress.bar)&&(b.progress.bar=$(b.progress.bar)),b.progress.bar?(is_function(b.progress.updater)||(b.progress.updater=$.fn.carouFredSel.progressbarUpdater),is_number(b.progress.interval)||(b.progress.interval=50)):b.progress=!1),b}function go_getPrevNextObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_number(b)&&(b={key:b}),b}function go_complementPrevNextObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_string(b.key)&&(b.key=cf_getKeyCode(b.key)),b}function go_getPaginationObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={container:b}:is_boolean(b)&&(b={keys:b}),b}function go_complementPaginationObject(a,b){return is_function(b.container)&&(b.container=b.container.call(a)),is_string(b.container)&&(b.container=$(b.container)),is_number(b.items)||(b.items=!1),is_boolean(b.keys)||(b.keys=!1),is_function(b.anchorBuilder)||is_false(b.anchorBuilder)||(b.anchorBuilder=$.fn.carouFredSel.pageAnchorBuilder),is_number(b.deviation)||(b.deviation=0),b}function go_getSwipeObject(a,b){return is_function(b)&&(b=b.call(a)),is_undefined(b)&&(b={onTouch:!1}),is_true(b)?b={onTouch:b}:is_number(b)&&(b={items:b}),b}function go_complementSwipeObject(a,b){return is_boolean(b.onTouch)||(b.onTouch=!0),is_boolean(b.onMouse)||(b.onMouse=!1),is_object(b.options)||(b.options={}),is_boolean(b.options.triggerOnTouchEnd)||(b.options.triggerOnTouchEnd=!1),b}function go_getMousewheelObject(a,b){return is_function(b)&&(b=b.call(a)),is_true(b)?b={}:is_number(b)?b={items:b}:is_undefined(b)&&(b=!1),b}function go_complementMousewheelObject(a,b){return b}function gn_getItemIndex(a,b,c,d,e){if(is_string(a)&&(a=$(a,e)),is_object(a)&&(a=$(a,e)),is_jquery(a)?(a=e.children().index(a),is_boolean(c)||(c=!1)):is_boolean(c)||(c=!0),is_number(a)||(a=0),is_number(b)||(b=0),c&&(a+=d.first),a+=b,d.total>0){for(;a>=d.total;)a-=d.total;for(;0>a;)a+=d.total}return a}function gn_getVisibleItemsPrev(a,b,c){for(var d=0,e=0,f=c;f>=0;f--){var g=a.eq(f);if(d+=g.is(":visible")?g[b.d.outerWidth](!0):0,d>b.maxDimension)return e;0==f&&(f=a.length),e++}}function gn_getVisibleItemsPrevFilter(a,b,c){return gn_getItemsPrevFilter(a,b.items.filter,b.items.visibleConf.org,c)}function gn_getScrollItemsPrevFilter(a,b,c,d){return gn_getItemsPrevFilter(a,b.items.filter,d,c)}function gn_getItemsPrevFilter(a,b,c,d){for(var e=0,f=0,g=d,h=a.length;g>=0;g--){if(f++,f==h)return f;var i=a.eq(g);if(i.is(b)&&(e++,e==c))return f;0==g&&(g=h)}}function gn_getVisibleOrg(a,b){return b.items.visibleConf.org||a.children().slice(0,b.items.visible).filter(b.items.filter).length}function gn_getVisibleItemsNext(a,b,c){for(var d=0,e=0,f=c,g=a.length-1;g>=f;f++){var h=a.eq(f);if(d+=h.is(":visible")?h[b.d.outerWidth](!0):0,d>b.maxDimension)return e;if(e++,e==g+1)return e;f==g&&(f=-1)}}function gn_getVisibleItemsNextTestCircular(a,b,c,d){var e=gn_getVisibleItemsNext(a,b,c);return b.circular||c+e>d&&(e=d-c),e}function gn_getVisibleItemsNextFilter(a,b,c){return gn_getItemsNextFilter(a,b.items.filter,b.items.visibleConf.org,c,b.circular)}function gn_getScrollItemsNextFilter(a,b,c,d){return gn_getItemsNextFilter(a,b.items.filter,d+1,c,b.circular)-1}function gn_getItemsNextFilter(a,b,c,d){for(var f=0,g=0,h=d,i=a.length-1;i>=h;h++){if(g++,g>=i)return g;var j=a.eq(h);if(j.is(b)&&(f++,f==c))return g;h==i&&(h=-1)}}function gi_getCurrentItems(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsPrev(a,b,c){return a.slice(c,b.items.visibleConf.old+c)}function gi_getNewItemsPrev(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsNext(a,b){return a.slice(0,b.items.visibleConf.old)}function gi_getNewItemsNext(a,b,c){return a.slice(c,b.items.visible+c)}function sz_storeMargin(a,b,c){b.usePadding&&(is_string(c)||(c="_cfs_origCssMargin"),a.each(function(){var a=$(this),d=parseInt(a.css(b.d.marginRight),10);is_number(d)||(d=0),a.data(c,d)}))}function sz_resetMargin(a,b,c){if(b.usePadding){var d=is_boolean(c)?c:!1;is_number(c)||(c=0),sz_storeMargin(a,b,"_cfs_tempCssMargin"),a.each(function(){var a=$(this);a.css(b.d.marginRight,d?a.data("_cfs_tempCssMargin"):c+a.data("_cfs_origCssMargin"))})}}function sz_storeOrigCss(a){a.each(function(){var a=$(this);a.data("_cfs_origCss",a.attr("style")||"")})}function sz_restoreOrigCss(a){a.each(function(){var a=$(this);a.attr("style",a.data("_cfs_origCss")||"")})}function sz_setResponsiveSizes(a,b){var d=(a.items.visible,a.items[a.d.width]),e=a[a.d.height],f=is_percentage(e);b.each(function(){var b=$(this),c=d-ms_getPaddingBorderMargin(b,a,"Width");b[a.d.width](c),f&&b[a.d.height](ms_getPercentage(c,e))})}function sz_setSizes(a,b){var c=a.parent(),d=a.children(),e=gi_getCurrentItems(d,b),f=cf_mapWrapperSizes(ms_getSizes(e,b,!0),b,!1);if(c.css(f),b.usePadding){var g=b.padding,h=g[b.d[1]];b.align&&0>h&&(h=0);var i=e.last();i.css(b.d.marginRight,i.data("_cfs_origCssMargin")+h),a.css(b.d.top,g[b.d[0]]),a.css(b.d.left,g[b.d[3]])}return a.css(b.d.width,f[b.d.width]+2*ms_getTotalSize(d,b,"width")),a.css(b.d.height,ms_getLargestSize(d,b,"height")),f}function ms_getSizes(a,b,c){return[ms_getTotalSize(a,b,"width",c),ms_getLargestSize(a,b,"height",c)]}function ms_getLargestSize(a,b,c,d){return is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d?b[b.d[c]]:is_number(b.items[b.d[c]])?b.items[b.d[c]]:(c=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",ms_getTrueLargestSize(a,b,c))}function ms_getTrueLargestSize(a,b,c){for(var d=0,e=0,f=a.length;f>e;e++){var g=a.eq(e),h=g.is(":visible")?g[b.d[c]](!0):0;h>d&&(d=h)}return d}function ms_getTotalSize(a,b,c,d){if(is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d)return b[b.d[c]];if(is_number(b.items[b.d[c]]))return b.items[b.d[c]]*a.length;for(var e=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",f=0,g=0,h=a.length;h>g;g++){var i=a.eq(g);f+=i.is(":visible")?i[b.d[e]](!0):0}return f}function ms_getParentSize(a,b,c){var d=a.is(":visible");d&&a.hide();var e=a.parent()[b.d[c]]();return d&&a.show(),e}function ms_getMaxDimension(a,b){return is_number(a[a.d.width])?a[a.d.width]:b}function ms_hasVariableSizes(a,b,c){for(var d=!1,e=!1,f=0,g=a.length;g>f;f++){var h=a.eq(f),i=h.is(":visible")?h[b.d[c]](!0):0;d===!1?d=i:d!=i&&(e=!0),0==d&&(e=!0)}return e}function ms_getPaddingBorderMargin(a,b,c){return a[b.d["outer"+c]](!0)-a[b.d[c.toLowerCase()]]()}function ms_getPercentage(a,b){if(is_percentage(b)){if(b=parseInt(b.slice(0,-1),10),!is_number(b))return a;a*=b/100}return a}function cf_e(a,b,c,d,e){return is_boolean(c)||(c=!0),is_boolean(d)||(d=!0),is_boolean(e)||(e=!1),c&&(a=b.events.prefix+a),d&&(a=a+"."+b.events.namespace),d&&e&&(a+=b.serialNumber),a}function cf_c(a,b){return is_string(b.classnames[a])?b.classnames[a]:a}function cf_mapWrapperSizes(a,b,c){is_boolean(c)||(c=!0);var d=b.usePadding&&c?b.padding:[0,0,0,0],e={};return e[b.d.width]=a[0]+d[1]+d[3],e[b.d.height]=a[1]+d[0]+d[2],e}function cf_sortParams(a,b){for(var c=[],d=0,e=a.length;e>d;d++)for(var f=0,g=b.length;g>f;f++)if(b[f].indexOf(typeof a[d])>-1&&is_undefined(c[f])){c[f]=a[d];break}return c}function cf_getPadding(a){if(is_undefined(a))return[0,0,0,0];if(is_number(a))return[a,a,a,a];if(is_string(a)&&(a=a.split("px").join("").split("em").join("").split(" ")),!is_array(a))return[0,0,0,0];for(var b=0;4>b;b++)a[b]=parseInt(a[b],10);switch(a.length){case 0:return[0,0,0,0];case 1:return[a[0],a[0],a[0],a[0]];case 2:return[a[0],a[1],a[0],a[1]];case 3:return[a[0],a[1],a[2],a[1]];default:return[a[0],a[1],a[2],a[3]]}}function cf_getAlignPadding(a,b){var c=is_number(b[b.d.width])?Math.ceil(b[b.d.width]-ms_getTotalSize(a,b,"width")):0;switch(b.align){case"left":return[0,c];case"right":return[c,0];case"center":default:return[Math.ceil(c/2),Math.floor(c/2)]}}function cf_getDimensions(a){for(var b=[["width","innerWidth","outerWidth","height","innerHeight","outerHeight","left","top","marginRight",0,1,2,3],["height","innerHeight","outerHeight","width","innerWidth","outerWidth","top","left","marginBottom",3,2,1,0]],c=b[0].length,d="right"==a.direction||"left"==a.direction?0:1,e={},f=0;c>f;f++)e[b[0][f]]=b[d][f];return e}function cf_getAdjust(a,b,c,d){var e=a;if(is_function(c))e=c.call(d,e);else if(is_string(c)){var f=c.split("+"),g=c.split("-");if(g.length>f.length)var h=!0,i=g[0],j=g[1];else var h=!1,i=f[0],j=f[1];switch(i){case"even":e=1==a%2?a-1:a;break;case"odd":e=0==a%2?a-1:a;break;default:e=a}j=parseInt(j,10),is_number(j)&&(h&&(j=-j),e+=j)}return(!is_number(e)||1>e)&&(e=1),e}function cf_getItemsAdjust(a,b,c,d){return cf_getItemAdjustMinMax(cf_getAdjust(a,b,c,d),b.items.visibleConf)}function cf_getItemAdjustMinMax(a,b){return is_number(b.min)&&b.min>a&&(a=b.min),is_number(b.max)&&a>b.max&&(a=b.max),1>a&&(a=1),a}function cf_getSynchArr(a){is_array(a)||(a=[[a]]),is_array(a[0])||(a=[a]);for(var b=0,c=a.length;c>b;b++)is_string(a[b][0])&&(a[b][0]=$(a[b][0])),is_boolean(a[b][1])||(a[b][1]=!0),is_boolean(a[b][2])||(a[b][2]=!0),is_number(a[b][3])||(a[b][3]=0);return a}function cf_getKeyCode(a){return"right"==a?39:"left"==a?37:"up"==a?38:"down"==a?40:-1}function cf_setCookie(a,b,c){if(a){var d=b.triggerHandler(cf_e("currentPosition",c));$.fn.carouFredSel.cookie.set(a,d)}}function cf_getCookie(a){var b=$.fn.carouFredSel.cookie.get(a);return""==b?0:b}function in_mapCss(a,b){for(var c={},d=0,e=b.length;e>d;d++)c[b[d]]=a.css(b[d]);return c}function in_complementItems(a,b,c,d){return is_object(a.visibleConf)||(a.visibleConf={}),is_object(a.sizesConf)||(a.sizesConf={}),0==a.start&&is_number(d)&&(a.start=d),is_object(a.visible)?(a.visibleConf.min=a.visible.min,a.visibleConf.max=a.visible.max,a.visible=!1):is_string(a.visible)?("variable"==a.visible?a.visibleConf.variable=!0:a.visibleConf.adjust=a.visible,a.visible=!1):is_function(a.visible)&&(a.visibleConf.adjust=a.visible,a.visible=!1),is_string(a.filter)||(a.filter=c.filter(":hidden").length>0?":visible":"*"),a[b.d.width]||(b.responsive?(debug(!0,"Set a "+b.d.width+" for the items!"),a[b.d.width]=ms_getTrueLargestSize(c,b,"outerWidth")):a[b.d.width]=ms_hasVariableSizes(c,b,"outerWidth")?"variable":c[b.d.outerWidth](!0)),a[b.d.height]||(a[b.d.height]=ms_hasVariableSizes(c,b,"outerHeight")?"variable":c[b.d.outerHeight](!0)),a.sizesConf.width=a.width,a.sizesConf.height=a.height,a}function in_complementVisibleItems(a,b){return"variable"==a.items[a.d.width]&&(a.items.visibleConf.variable=!0),a.items.visibleConf.variable||(is_number(a[a.d.width])?a.items.visible=Math.floor(a[a.d.width]/a.items[a.d.width]):(a.items.visible=Math.floor(b/a.items[a.d.width]),a[a.d.width]=a.items.visible*a.items[a.d.width],a.items.visibleConf.adjust||(a.align=!1)),("Infinity"==a.items.visible||1>a.items.visible)&&(debug(!0,'Not a valid number of visible items: Set to "variable".'),a.items.visibleConf.variable=!0)),a}function in_complementPrimarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerWidth")),a}function in_complementSecondarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerHeight")),a||(a=b.items[b.d.height]),a}function in_getAlignPadding(a,b){var c=cf_getAlignPadding(gi_getCurrentItems(b,a),a);return a.padding[a.d[1]]=c[1],a.padding[a.d[3]]=c[0],a}function in_getResponsiveValues(a,b){var d=cf_getItemAdjustMinMax(Math.ceil(a[a.d.width]/a.items[a.d.width]),a.items.visibleConf);d>b.length&&(d=b.length);var e=Math.floor(a[a.d.width]/d);return a.items.visible=d,a.items[a.d.width]=e,a[a.d.width]=d*e,a}function bt_pauseOnHoverConfig(a){if(is_string(a))var b=a.indexOf("immediate")>-1?!0:!1,c=a.indexOf("resume")>-1?!0:!1;else var b=c=!1;return[b,c]}function bt_mousesheelNumber(a){return is_number(a)?a:null}function is_null(a){return null===a}function is_undefined(a){return is_null(a)||a===void 0||""===a||"undefined"===a}function is_array(a){return a instanceof Array}function is_jquery(a){return a instanceof jQuery}function is_object(a){return(a instanceof Object||"object"==typeof a)&&!is_null(a)&&!is_jquery(a)&&!is_array(a)&&!is_function(a)}function is_number(a){return(a instanceof Number||"number"==typeof a)&&!isNaN(a)}function is_string(a){return(a instanceof String||"string"==typeof a)&&!is_undefined(a)&&!is_true(a)&&!is_false(a)}function is_function(a){return a instanceof Function||"function"==typeof a}function is_boolean(a){return a instanceof Boolean||"boolean"==typeof a||is_true(a)||is_false(a)}function is_true(a){return a===!0||"true"===a}function is_false(a){return a===!1||"false"===a}function is_percentage(a){return is_string(a)&&"%"==a.slice(-1)}function getTime(){return(new Date).getTime()}function deprecated(a,b){debug(!0,a+" is DEPRECATED, support for it will be removed. Use "+b+" instead.")}function debug(a,b){if(!is_undefined(window.console)&&!is_undefined(window.console.log)){if(is_object(a)){var c=" ("+a.selector+")";a=a.debug}else var c="";if(!a)return!1;b=is_string(b)?"carouFredSel"+c+": "+b:["carouFredSel"+c+":",b],window.console.log(b)}return!1}$.fn.carouFredSel||($.fn.caroufredsel=$.fn.carouFredSel=function(options,configs){if(0==this.length)return debug(!0,'No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){$(this).carouFredSel(options,configs)});var $cfs=this,$tt0=this[0],starting_position=!1;$cfs.data("_cfs_isCarousel")&&(starting_position=$cfs.triggerHandler("_cfs_triggerEvent","currentPosition"),$cfs.trigger("_cfs_triggerEvent",["destroy",!0]));var FN={};FN._init=function(a,b,c){a=go_getObject($tt0,a),a.items=go_getItemsObject($tt0,a.items),a.scroll=go_getScrollObject($tt0,a.scroll),a.auto=go_getAutoObject($tt0,a.auto),a.prev=go_getPrevNextObject($tt0,a.prev),a.next=go_getPrevNextObject($tt0,a.next),a.pagination=go_getPaginationObject($tt0,a.pagination),a.swipe=go_getSwipeObject($tt0,a.swipe),a.mousewheel=go_getMousewheelObject($tt0,a.mousewheel),b&&(opts_orig=$.extend(!0,{},$.fn.carouFredSel.defaults,a)),opts=$.extend(!0,{},$.fn.carouFredSel.defaults,a),opts.d=cf_getDimensions(opts),crsl.direction="up"==opts.direction||"left"==opts.direction?"next":"prev";var d=$cfs.children(),e=ms_getParentSize($wrp,opts,"width");if(is_true(opts.cookie)&&(opts.cookie="caroufredsel_cookie_"+conf.serialNumber),opts.maxDimension=ms_getMaxDimension(opts,e),opts.items=in_complementItems(opts.items,opts,d,c),opts[opts.d.width]=in_complementPrimarySize(opts[opts.d.width],opts,d),opts[opts.d.height]=in_complementSecondarySize(opts[opts.d.height],opts,d),opts.responsive&&(is_percentage(opts[opts.d.width])||(opts[opts.d.width]="100%")),is_percentage(opts[opts.d.width])&&(crsl.upDateOnWindowResize=!0,crsl.primarySizePercentage=opts[opts.d.width],opts[opts.d.width]=ms_getPercentage(e,crsl.primarySizePercentage),opts.items.visible||(opts.items.visibleConf.variable=!0)),opts.responsive?(opts.usePadding=!1,opts.padding=[0,0,0,0],opts.align=!1,opts.items.visibleConf.variable=!1):(opts.items.visible||(opts=in_complementVisibleItems(opts,e)),opts[opts.d.width]||(!opts.items.visibleConf.variable&&is_number(opts.items[opts.d.width])&&"*"==opts.items.filter?(opts[opts.d.width]=opts.items.visible*opts.items[opts.d.width],opts.align=!1):opts[opts.d.width]="variable"),is_undefined(opts.align)&&(opts.align=is_number(opts[opts.d.width])?"center":!1),opts.items.visibleConf.variable&&(opts.items.visible=gn_getVisibleItemsNext(d,opts,0))),"*"==opts.items.filter||opts.items.visibleConf.variable||(opts.items.visibleConf.org=opts.items.visible,opts.items.visible=gn_getVisibleItemsNextFilter(d,opts,0)),opts.items.visible=cf_getItemsAdjust(opts.items.visible,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts.responsive)opts.items.visibleConf.min||(opts.items.visibleConf.min=opts.items.visible),opts.items.visibleConf.max||(opts.items.visibleConf.max=opts.items.visible),opts=in_getResponsiveValues(opts,d,e);else switch(opts.padding=cf_getPadding(opts.padding),"top"==opts.align?opts.align="left":"bottom"==opts.align&&(opts.align="right"),opts.align){case"center":case"left":case"right":"variable"!=opts[opts.d.width]&&(opts=in_getAlignPadding(opts,d),opts.usePadding=!0);break;default:opts.align=!1,opts.usePadding=0==opts.padding[0]&&0==opts.padding[1]&&0==opts.padding[2]&&0==opts.padding[3]?!1:!0}is_number(opts.scroll.duration)||(opts.scroll.duration=500),is_undefined(opts.scroll.items)&&(opts.scroll.items=opts.responsive||opts.items.visibleConf.variable||"*"!=opts.items.filter?"visible":opts.items.visible),opts.auto=$.extend(!0,{},opts.scroll,opts.auto),opts.prev=$.extend(!0,{},opts.scroll,opts.prev),opts.next=$.extend(!0,{},opts.scroll,opts.next),opts.pagination=$.extend(!0,{},opts.scroll,opts.pagination),opts.auto=go_complementAutoObject($tt0,opts.auto),opts.prev=go_complementPrevNextObject($tt0,opts.prev),opts.next=go_complementPrevNextObject($tt0,opts.next),opts.pagination=go_complementPaginationObject($tt0,opts.pagination),opts.swipe=go_complementSwipeObject($tt0,opts.swipe),opts.mousewheel=go_complementMousewheelObject($tt0,opts.mousewheel),opts.synchronise&&(opts.synchronise=cf_getSynchArr(opts.synchronise)),opts.auto.onPauseStart&&(opts.auto.onTimeoutStart=opts.auto.onPauseStart,deprecated("auto.onPauseStart","auto.onTimeoutStart")),opts.auto.onPausePause&&(opts.auto.onTimeoutPause=opts.auto.onPausePause,deprecated("auto.onPausePause","auto.onTimeoutPause")),opts.auto.onPauseEnd&&(opts.auto.onTimeoutEnd=opts.auto.onPauseEnd,deprecated("auto.onPauseEnd","auto.onTimeoutEnd")),opts.auto.pauseDuration&&(opts.auto.timeoutDuration=opts.auto.pauseDuration,deprecated("auto.pauseDuration","auto.timeoutDuration"))},FN._build=function(){$cfs.data("_cfs_isCarousel",!0);var a=$cfs.children(),b=in_mapCss($cfs,["textAlign","float","position","top","right","bottom","left","zIndex","width","height","marginTop","marginRight","marginBottom","marginLeft"]),c="relative";switch(b.position){case"absolute":case"fixed":c=b.position}"parent"==conf.wrapper?sz_storeOrigCss($wrp):$wrp.css(b),$wrp.css({overflow:"hidden",position:c}),sz_storeOrigCss($cfs),$cfs.data("_cfs_origCssZindex",b.zIndex),$cfs.css({textAlign:"left","float":"none",position:"absolute",top:0,right:"auto",bottom:"auto",left:0,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0}),sz_storeMargin(a,opts),sz_storeOrigCss(a),opts.responsive&&sz_setResponsiveSizes(opts,a)},FN._bind_events=function(){FN._unbind_events(),$cfs.bind(cf_e("stop",conf),function(a,b){return a.stopPropagation(),crsl.isStopped||opts.auto.button&&opts.auto.button.addClass(cf_c("stopped",conf)),crsl.isStopped=!0,opts.auto.play&&(opts.auto.play=!1,$cfs.trigger(cf_e("pause",conf),b)),!0}),$cfs.bind(cf_e("finish",conf),function(a){return a.stopPropagation(),crsl.isScrolling&&sc_stopScroll(scrl),!0}),$cfs.bind(cf_e("pause",conf),function(a,b,c){if(a.stopPropagation(),tmrs=sc_clearTimers(tmrs),b&&crsl.isScrolling){scrl.isStopped=!0;var d=getTime()-scrl.startTime;scrl.duration-=d,scrl.pre&&(scrl.pre.duration-=d),scrl.post&&(scrl.post.duration-=d),sc_stopScroll(scrl,!1)}if(crsl.isPaused||crsl.isScrolling||c&&(tmrs.timePassed+=getTime()-tmrs.startTime),crsl.isPaused||opts.auto.button&&opts.auto.button.addClass(cf_c("paused",conf)),crsl.isPaused=!0,opts.auto.onTimeoutPause){var e=opts.auto.timeoutDuration-tmrs.timePassed,f=100-Math.ceil(100*e/opts.auto.timeoutDuration);opts.auto.onTimeoutPause.call($tt0,f,e)}return!0}),$cfs.bind(cf_e("play",conf),function(a,b,c,d){a.stopPropagation(),tmrs=sc_clearTimers(tmrs);var e=[b,c,d],f=["string","number","boolean"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],"prev"!=b&&"next"!=b&&(b=crsl.direction),is_number(c)||(c=0),is_boolean(d)||(d=!1),d&&(crsl.isStopped=!1,opts.auto.play=!0),!opts.auto.play)return a.stopImmediatePropagation(),debug(conf,"Carousel stopped: Not scrolling.");crsl.isPaused&&opts.auto.button&&(opts.auto.button.removeClass(cf_c("stopped",conf)),opts.auto.button.removeClass(cf_c("paused",conf))),crsl.isPaused=!1,tmrs.startTime=getTime();var h=opts.auto.timeoutDuration+c;return dur2=h-tmrs.timePassed,perc=100-Math.ceil(100*dur2/h),opts.auto.progress&&(tmrs.progress=setInterval(function(){var a=getTime()-tmrs.startTime+tmrs.timePassed,b=Math.ceil(100*a/h);opts.auto.progress.updater.call(opts.auto.progress.bar[0],b)},opts.auto.progress.interval)),tmrs.auto=setTimeout(function(){opts.auto.progress&&opts.auto.progress.updater.call(opts.auto.progress.bar[0],100),opts.auto.onTimeoutEnd&&opts.auto.onTimeoutEnd.call($tt0,perc,dur2),crsl.isScrolling?$cfs.trigger(cf_e("play",conf),b):$cfs.trigger(cf_e(b,conf),opts.auto)},dur2),opts.auto.onTimeoutStart&&opts.auto.onTimeoutStart.call($tt0,perc,dur2),!0}),$cfs.bind(cf_e("resume",conf),function(a){return a.stopPropagation(),scrl.isStopped?(scrl.isStopped=!1,crsl.isPaused=!1,crsl.isScrolling=!0,scrl.startTime=getTime(),sc_startScroll(scrl,conf)):$cfs.trigger(cf_e("play",conf)),!0}),$cfs.bind(cf_e("prev",conf)+" "+cf_e("next",conf),function(a,b,c,d,e){if(a.stopPropagation(),crsl.isStopped||$cfs.is(":hidden"))return a.stopImmediatePropagation(),debug(conf,"Carousel stopped or hidden: Not scrolling.");var f=is_number(opts.items.minimum)?opts.items.minimum:opts.items.visible+1;if(f>itms.total)return a.stopImmediatePropagation(),debug(conf,"Not enough items ("+itms.total+" total, "+f+" needed): Not scrolling.");var g=[b,c,d,e],h=["object","number/string","function","boolean"],i=cf_sortParams(g,h);b=i[0],c=i[1],d=i[2],e=i[3];var j=a.type.slice(conf.events.prefix.length);if(is_object(b)||(b={}),is_function(d)&&(b.onAfter=d),is_boolean(e)&&(b.queue=e),b=$.extend(!0,{},opts[j],b),b.conditions&&!b.conditions.call($tt0,j))return a.stopImmediatePropagation(),debug(conf,'Callback "conditions" returned false.');if(!is_number(c)){if("*"!=opts.items.filter)c="visible";else for(var k=[c,b.items,opts[j].items],i=0,l=k.length;l>i;i++)if(is_number(k[i])||"page"==k[i]||"visible"==k[i]){c=k[i];break}switch(c){case"page":return a.stopImmediatePropagation(),$cfs.triggerHandler(cf_e(j+"Page",conf),[b,d]);case"visible":opts.items.visibleConf.variable||"*"!=opts.items.filter||(c=opts.items.visible)}}if(scrl.isStopped)return $cfs.trigger(cf_e("resume",conf)),$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]]),a.stopImmediatePropagation(),debug(conf,"Carousel resumed scrolling.");if(b.duration>0&&crsl.isScrolling)return b.queue&&("last"==b.queue&&(queu=[]),("first"!=b.queue||0==queu.length)&&$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]])),a.stopImmediatePropagation(),debug(conf,"Carousel currently scrolling.");if(tmrs.timePassed=0,$cfs.trigger(cf_e("slide_"+j,conf),[b,c]),opts.synchronise)for(var m=opts.synchronise,n=[b,c],o=0,l=m.length;l>o;o++){var p=j;m[o][2]||(p="prev"==p?"next":"prev"),m[o][1]||(n[0]=m[o][0].triggerHandler("_cfs_triggerEvent",["configuration",p])),n[1]=c+m[o][3],m[o][0].trigger("_cfs_triggerEvent",["slide_"+p,n])}return!0}),$cfs.bind(cf_e("slide_prev",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&0==itms.first)return opts.infinite&&$cfs.trigger(cf_e("next",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if(opts.items.visibleConf.variable)c=gn_getVisibleItemsPrev(d,opts,itms.total-1);else if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsPrevFilter(d,opts,itms.total-1,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}if(opts.circular||itms.total-c<itms.first&&(c=itms.total-itms.first),opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){var f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0);f>=opts.items.visible+c&&itms.total>c&&(c++,f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0)),opts.items.visible=f}else if("*"!=opts.items.filter){var f=gn_getVisibleItemsNextFilter(d,opts,itms.total-c);opts.items.visible=cf_getItemsAdjust(f,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items backward."),itms.first+=c;itms.first>=itms.total;)itms.first-=itms.total;opts.circular||(0==itms.first&&b.onEnd&&b.onEnd.call($tt0,"prev"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),$cfs.children().slice(itms.total-c,itms.total).prependTo($cfs),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),g=gi_getOldItemsPrev(d,opts,c),h=gi_getNewItemsPrev(d,opts),i=d.eq(c-1),j=g.last(),k=h.last();sz_resetMargin(d,opts);var l=0,m=0;if(opts.align){var n=cf_getAlignPadding(h,opts);l=n[0],m=n[1]}var o=0>l?opts.padding[opts.d[3]]:0,p=!1,q=$();if(c>opts.items.visible&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,i=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(h,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B={},C={},D=sc_getDuration(b,opts,c,t);switch(b.fx){case"cover":case"cover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visible),opts,"width")}p&&(opts.items[opts.d.width]=r),sz_resetMargin(d,opts,!0),m>=0&&sz_resetMargin(j,opts,opts.padding[opts.d[1]]),l>=0&&sz_resetMargin(i,opts,opts.padding[opts.d[3]]),opts.align&&(opts.padding[opts.d[1]]=m,opts.padding[opts.d[3]]=l),B[opts.d.left]=-(t-o),C[opts.d.left]=-(v-o),x[opts.d.left]=u[opts.d.width];var E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){},L=function(){},M=function(){},N=function(){},O=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp)}switch(b.fx){case"crossfade":case"uncover":case"uncover-fade":s.children().slice(0,c).remove(),s.children().slice(opts.items.visibleConf.old).remove();break;case"cover":case"cover-fade":s.children().slice(opts.items.visible).remove(),s.css(C)}if($cfs.css(B),scrl=sc_setScroll(D,b.easing,conf),w[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0,("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(E=function(){$wrp.css(u)},F=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){switch(k.not(i).length&&(y[opts.d.marginRight]=i.data("_cfs_origCssMargin"),0>l?i.css(y):(K=function(){i.css(y)},L=function(){scrl.anims.push([i,y])})),b.fx){case"cover":case"cover-fade":s.children().eq(c-1).css(y)}k.not(j).length&&(z[opts.d.marginRight]=j.data("_cfs_origCssMargin"),G=function(){j.css(z)},H=function(){scrl.anims.push([j,z])}),m>=0&&(A[opts.d.marginRight]=k.data("_cfs_origCssMargin")+opts.padding[opts.d[1]],I=function(){k.css(A)},J=function(){scrl.anims.push([k,A])})}O=function(){$cfs.css(w)};var P=opts.items.visible+c-itms.total;N=function(){if(P>0&&($cfs.children().slice(itms.total).remove(),g=$($cfs.children().slice(itms.total-(opts.items.visible-P)).get().concat($cfs.children().slice(0,P).get()))),sc_showHiddenItems(p),opts.usePadding){var a=$cfs.children().eq(opts.items.visible+c-1);a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var Q=sc_mapCallbackArguments(g,q,h,c,"prev",D,u);switch(M=function(){sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",Q,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",Q,clbk),b.fx){case"none":$cfs.css(w),E(),G(),I(),K(),O(),N(),M();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){E(),G(),I(),K(),O(),N(),scrl=sc_setScroll(D,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},M]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},M]),F(),G(),I(),K(),O(),N();break;case"cover":scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"cover-fade":scrl.anims.push([$cfs,{opacity:0}]),scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"uncover":scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;default:scrl.anims.push([$cfs,w,function(){N(),M()}]),F(),H(),J(),L()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0
}),$cfs.bind(cf_e("slide_next",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&itms.first==opts.items.visible)return opts.infinite&&$cfs.trigger(cf_e("prev",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsNextFilter(d,opts,0,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}var f=0==itms.first?itms.total:itms.first;if(!opts.circular){if(opts.items.visibleConf.variable)var g=gn_getVisibleItemsNext(d,opts,c),e=gn_getVisibleItemsPrev(d,opts,f-1);else var g=opts.items.visible,e=opts.items.visible;c+g>f&&(c=f-e)}if(opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){for(var g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible-c>=g&&itms.total>c;)c++,g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible=g}else if("*"!=opts.items.filter){var g=gn_getVisibleItemsNextFilter(d,opts,c);opts.items.visible=cf_getItemsAdjust(g,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items forward."),itms.first-=c;0>itms.first;)itms.first+=itms.total;opts.circular||(itms.first==opts.items.visible&&b.onEnd&&b.onEnd.call($tt0,"next"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),h=gi_getOldItemsNext(d,opts),i=gi_getNewItemsNext(d,opts,c),j=d.eq(c-1),k=h.last(),l=i.last();sz_resetMargin(d,opts);var m=0,n=0;if(opts.align){var o=cf_getAlignPadding(i,opts);m=o[0],n=o[1]}var p=!1,q=$();if(c>opts.items.visibleConf.old&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,j=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(i,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B=sc_getDuration(b,opts,c,t);switch(b.fx){case"uncover":case"uncover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visibleConf.old),opts,"width")}p&&(opts.items[opts.d.width]=r),opts.align&&0>opts.padding[opts.d[1]]&&(opts.padding[opts.d[1]]=0),sz_resetMargin(d,opts,!0),sz_resetMargin(k,opts,opts.padding[opts.d[1]]),opts.align&&(opts.padding[opts.d[1]]=n,opts.padding[opts.d[3]]=m),A[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0;var C=function(){},D=function(){},E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp),s.children().slice(opts.items.visibleConf.old).remove()}switch(b.fx){case"crossfade":case"cover":case"cover-fade":$cfs.css("zIndex",1),s.css("zIndex",0)}if(scrl=sc_setScroll(B,b.easing,conf),w[opts.d.left]=-t,x[opts.d.left]=-v,0>m&&(w[opts.d.left]+=m),("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(C=function(){$wrp.css(u)},D=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){var L=l.data("_cfs_origCssMargin");n>=0&&(L+=opts.padding[opts.d[1]]),l.css(opts.d.marginRight,L),j.not(k).length&&(z[opts.d.marginRight]=k.data("_cfs_origCssMargin")),E=function(){k.css(z)},F=function(){scrl.anims.push([k,z])};var M=j.data("_cfs_origCssMargin");m>0&&(M+=opts.padding[opts.d[3]]),y[opts.d.marginRight]=M,G=function(){j.css(y)},H=function(){scrl.anims.push([j,y])}}K=function(){$cfs.css(A)};var N=opts.items.visible+c-itms.total;J=function(){N>0&&$cfs.children().slice(itms.total).remove();var a=$cfs.children().slice(0,c).appendTo($cfs).last();if(N>0&&(i=gi_getCurrentItems(d,opts)),sc_showHiddenItems(p),opts.usePadding){if(itms.total<opts.items.visible+c){var b=$cfs.children().eq(opts.items.visible-1);b.css(opts.d.marginRight,b.data("_cfs_origCssMargin")+opts.padding[opts.d[1]])}a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var O=sc_mapCallbackArguments(h,q,i,c,"next",B,u);switch(I=function(){$cfs.css("zIndex",$cfs.data("_cfs_origCssZindex")),sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",O,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",O,clbk),b.fx){case"none":$cfs.css(w),C(),E(),G(),K(),J(),I();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){C(),E(),G(),K(),J(),scrl=sc_setScroll(B,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},I]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},I]),D(),E(),G(),K(),J();break;case"cover":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"cover-fade":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"uncover":scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;default:scrl.anims.push([$cfs,w,function(){K(),J(),I()}]),D(),F(),H()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0}),$cfs.bind(cf_e("slideTo",conf),function(a,b,c,d,e,f,g){a.stopPropagation();var h=[b,c,d,e,f,g],i=["string/number/object","number","boolean","object","string","function"],j=cf_sortParams(h,i);return e=j[3],f=j[4],g=j[5],b=gn_getItemIndex(j[0],j[1],j[2],itms,$cfs),0==b?!1:(is_object(e)||(e=!1),"prev"!=f&&"next"!=f&&(f=opts.circular?itms.total/2>=b?"next":"prev":0==itms.first||itms.first>b?"next":"prev"),"prev"==f&&(b=itms.total-b),$cfs.trigger(cf_e(f,conf),[e,b,g]),!0)}),$cfs.bind(cf_e("prevPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d-1,b,"prev",c])}),$cfs.bind(cf_e("nextPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d+1,b,"next",c])}),$cfs.bind(cf_e("slideToPage",conf),function(a,b,c,d,e){a.stopPropagation(),is_number(b)||(b=$cfs.triggerHandler(cf_e("currentPage",conf)));var f=opts.pagination.items||opts.items.visible,g=Math.ceil(itms.total/f)-1;return 0>b&&(b=g),b>g&&(b=0),$cfs.triggerHandler(cf_e("slideTo",conf),[b*f,0,!0,c,d,e])}),$cfs.bind(cf_e("jumpToStart",conf),function(a,b){if(a.stopPropagation(),b=b?gn_getItemIndex(b,0,!0,itms,$cfs):0,b+=itms.first,0!=b){if(itms.total>0)for(;b>itms.total;)b-=itms.total;$cfs.prepend($cfs.children().slice(b,itms.total))}return!0}),$cfs.bind(cf_e("synchronise",conf),function(a,b){if(a.stopPropagation(),b)b=cf_getSynchArr(b);else{if(!opts.synchronise)return debug(conf,"No carousel to synchronise.");b=opts.synchronise}for(var c=$cfs.triggerHandler(cf_e("currentPosition",conf)),d=!0,e=0,f=b.length;f>e;e++)b[e][0].triggerHandler(cf_e("slideTo",conf),[c,b[e][3],!0])||(d=!1);return d}),$cfs.bind(cf_e("queue",conf),function(a,b,c){return a.stopPropagation(),is_function(b)?b.call($tt0,queu):is_array(b)?queu=b:is_undefined(b)||queu.push([b,c]),queu}),$cfs.bind(cf_e("insertItem",conf),function(a,b,c,d,e){a.stopPropagation();var f=[b,c,d,e],g=["string/object","string/number/object","boolean","number"],h=cf_sortParams(f,g);if(b=h[0],c=h[1],d=h[2],e=h[3],is_object(b)&&!is_jquery(b)?b=$(b):is_string(b)&&(b=$(b)),!is_jquery(b)||0==b.length)return debug(conf,"Not a valid object.");is_undefined(c)&&(c="end"),sz_storeMargin(b,opts),sz_storeOrigCss(b);var i=c,j="before";"end"==c?d?(0==itms.first?(c=itms.total-1,j="after"):(c=itms.first,itms.first+=b.length),0>c&&(c=0)):(c=itms.total-1,j="after"):c=gn_getItemIndex(c,e,d,itms,$cfs);var k=$cfs.children().eq(c);return k.length?k[j](b):(debug(conf,"Correct insert-position not found! Appending item to the end."),$cfs.append(b)),"end"==i||d||itms.first>c&&(itms.first+=b.length),itms.total=$cfs.children().length,itms.first>=itms.total&&(itms.first-=itms.total),$cfs.trigger(cf_e("updateSizes",conf)),$cfs.trigger(cf_e("linkAnchors",conf)),!0}),$cfs.bind(cf_e("removeItem",conf),function(a,b,c,d){a.stopPropagation();var e=[b,c,d],f=["string/number/object","boolean","number"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],b instanceof $&&b.length>1)return i=$(),b.each(function(){var e=$cfs.trigger(cf_e("removeItem",conf),[$(this),c,d]);e&&(i=i.add(e))}),i;if(is_undefined(b)||"end"==b)i=$cfs.children().last();else{b=gn_getItemIndex(b,d,c,itms,$cfs);var i=$cfs.children().eq(b);i.length&&itms.first>b&&(itms.first-=i.length)}return i&&i.length&&(i.detach(),itms.total=$cfs.children().length,$cfs.trigger(cf_e("updateSizes",conf))),i}),$cfs.bind(cf_e("onBefore",conf)+" "+cf_e("onAfter",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length);return is_array(b)&&(clbk[c]=b),is_function(b)&&clbk[c].push(b),clbk[c]}),$cfs.bind(cf_e("currentPosition",conf),function(a,b){if(a.stopPropagation(),0==itms.first)var c=0;else var c=itms.total-itms.first;return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("currentPage",conf),function(a,b){a.stopPropagation();var e,c=opts.pagination.items||opts.items.visible,d=Math.ceil(itms.total/c-1);return e=0==itms.first?0:itms.first<itms.total%c?0:itms.first!=c||opts.circular?Math.round((itms.total-itms.first)/c):d,0>e&&(e=0),e>d&&(e=d),is_function(b)&&b.call($tt0,e),e}),$cfs.bind(cf_e("currentVisible",conf),function(a,b){a.stopPropagation();var c=gi_getCurrentItems($cfs.children(),opts);return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("slice",conf),function(a,b,c,d){if(a.stopPropagation(),0==itms.total)return!1;var e=[b,c,d],f=["number","number","function"],g=cf_sortParams(e,f);if(b=is_number(g[0])?g[0]:0,c=is_number(g[1])?g[1]:itms.total,d=g[2],b+=itms.first,c+=itms.first,items.total>0){for(;b>itms.total;)b-=itms.total;for(;c>itms.total;)c-=itms.total;for(;0>b;)b+=itms.total;for(;0>c;)c+=itms.total}var i,h=$cfs.children();return i=c>b?h.slice(b,c):$(h.slice(b,itms.total).get().concat(h.slice(0,c).get())),is_function(d)&&d.call($tt0,i),i}),$cfs.bind(cf_e("isPaused",conf)+" "+cf_e("isStopped",conf)+" "+cf_e("isScrolling",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length),d=crsl[c];return is_function(b)&&b.call($tt0,d),d}),$cfs.bind(cf_e("configuration",conf),function(e,a,b,c){e.stopPropagation();var reInit=!1;if(is_function(a))a.call($tt0,opts);else if(is_object(a))opts_orig=$.extend(!0,{},opts_orig,a),b!==!1?reInit=!0:opts=$.extend(!0,{},opts,a);else if(!is_undefined(a))if(is_function(b)){var val=eval("opts."+a);is_undefined(val)&&(val=""),b.call($tt0,val)}else{if(is_undefined(b))return eval("opts."+a);"boolean"!=typeof c&&(c=!0),eval("opts_orig."+a+" = b"),c!==!1?reInit=!0:eval("opts."+a+" = b")}if(reInit){sz_resetMargin($cfs.children(),opts),FN._init(opts_orig),FN._bind_buttons();var sz=sz_setSizes($cfs,opts);$cfs.trigger(cf_e("updatePageStatus",conf),[!0,sz])}return opts}),$cfs.bind(cf_e("linkAnchors",conf),function(a,b,c){return a.stopPropagation(),is_undefined(b)?b=$("body"):is_string(b)&&(b=$(b)),is_jquery(b)&&0!=b.length?(is_string(c)||(c="a.caroufredsel"),b.find(c).each(function(){var a=this.hash||"";a.length>0&&-1!=$cfs.children().index($(a))&&$(this).unbind("click").click(function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),a)})}),!0):debug(conf,"Not a valid object.")}),$cfs.bind(cf_e("updatePageStatus",conf),function(a,b){if(a.stopPropagation(),opts.pagination.container){var d=opts.pagination.items||opts.items.visible,e=Math.ceil(itms.total/d);b&&(opts.pagination.anchorBuilder&&(opts.pagination.container.children().remove(),opts.pagination.container.each(function(){for(var a=0;e>a;a++){var b=$cfs.children().eq(gn_getItemIndex(a*d,0,!0,itms,$cfs));$(this).append(opts.pagination.anchorBuilder.call(b[0],a+1))}})),opts.pagination.container.each(function(){$(this).children().unbind(opts.pagination.event).each(function(a){$(this).bind(opts.pagination.event,function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[a*d,-opts.pagination.deviation,!0,opts.pagination])})})}));var f=$cfs.triggerHandler(cf_e("currentPage",conf))+opts.pagination.deviation;return f>=e&&(f=0),0>f&&(f=e-1),opts.pagination.container.each(function(){$(this).children().removeClass(cf_c("selected",conf)).eq(f).addClass(cf_c("selected",conf))}),!0}}),$cfs.bind(cf_e("updateSizes",conf),function(){var b=opts.items.visible,c=$cfs.children(),d=ms_getParentSize($wrp,opts,"width");if(itms.total=c.length,crsl.primarySizePercentage?(opts.maxDimension=d,opts[opts.d.width]=ms_getPercentage(d,crsl.primarySizePercentage)):opts.maxDimension=ms_getMaxDimension(opts,d),opts.responsive?(opts.items.width=opts.items.sizesConf.width,opts.items.height=opts.items.sizesConf.height,opts=in_getResponsiveValues(opts,c,d),b=opts.items.visible,sz_setResponsiveSizes(opts,c)):opts.items.visibleConf.variable?b=gn_getVisibleItemsNext(c,opts,0):"*"!=opts.items.filter&&(b=gn_getVisibleItemsNextFilter(c,opts,0)),!opts.circular&&0!=itms.first&&b>itms.first){if(opts.items.visibleConf.variable)var e=gn_getVisibleItemsPrev(c,opts,itms.first)-itms.first;else if("*"!=opts.items.filter)var e=gn_getVisibleItemsPrevFilter(c,opts,itms.first)-itms.first;else var e=opts.items.visible-itms.first;debug(conf,"Preventing non-circular: sliding "+e+" items backward."),$cfs.trigger(cf_e("prev",conf),e)}opts.items.visible=cf_getItemsAdjust(b,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts=in_getAlignPadding(opts,c);var f=sz_setSizes($cfs,opts);return $cfs.trigger(cf_e("updatePageStatus",conf),[!0,f]),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),f}),$cfs.bind(cf_e("destroy",conf),function(a,b){return a.stopPropagation(),tmrs=sc_clearTimers(tmrs),$cfs.data("_cfs_isCarousel",!1),$cfs.trigger(cf_e("finish",conf)),b&&$cfs.trigger(cf_e("jumpToStart",conf)),sz_restoreOrigCss($cfs.children()),sz_restoreOrigCss($cfs),FN._unbind_events(),FN._unbind_buttons(),"parent"==conf.wrapper?sz_restoreOrigCss($wrp):$wrp.replaceWith($cfs),!0}),$cfs.bind(cf_e("debug",conf),function(){return debug(conf,"Carousel width: "+opts.width),debug(conf,"Carousel height: "+opts.height),debug(conf,"Item widths: "+opts.items.width),debug(conf,"Item heights: "+opts.items.height),debug(conf,"Number of items visible: "+opts.items.visible),opts.auto.play&&debug(conf,"Number of items scrolled automatically: "+opts.auto.items),opts.prev.button&&debug(conf,"Number of items scrolled backward: "+opts.prev.items),opts.next.button&&debug(conf,"Number of items scrolled forward: "+opts.next.items),conf.debug}),$cfs.bind("_cfs_triggerEvent",function(a,b,c){return a.stopPropagation(),$cfs.triggerHandler(cf_e(b,conf),c)})},FN._unbind_events=function(){$cfs.unbind(cf_e("",conf)),$cfs.unbind(cf_e("",conf,!1)),$cfs.unbind("_cfs_triggerEvent")},FN._bind_buttons=function(){if(FN._unbind_buttons(),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),opts.auto.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.auto.pauseOnHover);$wrp.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.auto.button&&opts.auto.button.bind(cf_e(opts.auto.event,conf,!1),function(a){a.preventDefault();var b=!1,c=null;crsl.isPaused?b="play":opts.auto.pauseOnEvent&&(b="pause",c=bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)),b&&$cfs.trigger(cf_e(b,conf),c)}),opts.prev.button&&(opts.prev.button.bind(cf_e(opts.prev.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("prev",conf))}),opts.prev.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.prev.pauseOnHover);opts.prev.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.next.button&&(opts.next.button.bind(cf_e(opts.next.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("next",conf))}),opts.next.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.next.pauseOnHover);opts.next.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.pagination.container&&opts.pagination.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);opts.pagination.container.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if((opts.prev.key||opts.next.key)&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b==opts.next.key&&(a.preventDefault(),$cfs.trigger(cf_e("next",conf))),b==opts.prev.key&&(a.preventDefault(),$cfs.trigger(cf_e("prev",conf)))}),opts.pagination.keys&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b>=49&&58>b&&(b=(b-49)*opts.items.visible,itms.total>=b&&(a.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[b,0,!0,opts.pagination])))}),$.fn.swipe){var b="ontouchstart"in window;if(b&&opts.swipe.onTouch||!b&&opts.swipe.onMouse){var c=$.extend(!0,{},opts.prev,opts.swipe),d=$.extend(!0,{},opts.next,opts.swipe),e=function(){$cfs.trigger(cf_e("prev",conf),[c])},f=function(){$cfs.trigger(cf_e("next",conf),[d])};switch(opts.direction){case"up":case"down":opts.swipe.options.swipeUp=f,opts.swipe.options.swipeDown=e;break;default:opts.swipe.options.swipeLeft=f,opts.swipe.options.swipeRight=e}crsl.swipe&&$cfs.swipe("destroy"),$wrp.swipe(opts.swipe.options),$wrp.css("cursor","move"),crsl.swipe=!0}}if($.fn.mousewheel&&opts.mousewheel){var g=$.extend(!0,{},opts.prev,opts.mousewheel),h=$.extend(!0,{},opts.next,opts.mousewheel);crsl.mousewheel&&$wrp.unbind(cf_e("mousewheel",conf,!1)),$wrp.bind(cf_e("mousewheel",conf,!1),function(a,b){a.preventDefault(),b>0?$cfs.trigger(cf_e("prev",conf),[g]):$cfs.trigger(cf_e("next",conf),[h])}),crsl.mousewheel=!0}if(opts.auto.play&&$cfs.trigger(cf_e("play",conf),opts.auto.delay),crsl.upDateOnWindowResize){var i=function(){$cfs.trigger(cf_e("finish",conf)),opts.auto.pauseOnResize&&!crsl.isPaused&&$cfs.trigger(cf_e("play",conf)),sz_resetMargin($cfs.children(),opts),$cfs.trigger(cf_e("updateSizes",conf))},j=$(window),k=null;if($.debounce&&"debounce"==conf.onWindowResize)k=$.debounce(200,i);else if($.throttle&&"throttle"==conf.onWindowResize)k=$.throttle(300,i);else{var l=0,m=0;k=function(){var a=j.width(),b=j.height();(a!=l||b!=m)&&(i(),l=a,m=b)}}j.bind(cf_e("resize",conf,!1,!0,!0),k)}},FN._unbind_buttons=function(){var b=(cf_e("",conf),cf_e("",conf,!1));ns3=cf_e("",conf,!1,!0,!0),$(document).unbind(ns3),$(window).unbind(ns3),$wrp.unbind(b),opts.auto.button&&opts.auto.button.unbind(b),opts.prev.button&&opts.prev.button.unbind(b),opts.next.button&&opts.next.button.unbind(b),opts.pagination.container&&(opts.pagination.container.unbind(b),opts.pagination.anchorBuilder&&opts.pagination.container.children().remove()),crsl.swipe&&($cfs.swipe("destroy"),$wrp.css("cursor","default"),crsl.swipe=!1),crsl.mousewheel&&(crsl.mousewheel=!1),nv_showNavi(opts,"hide",conf),nv_enableNavi(opts,"removeClass",conf)},is_boolean(configs)&&(configs={debug:configs});var crsl={direction:"next",isPaused:!0,isScrolling:!1,isStopped:!1,mousewheel:!1,swipe:!1},itms={total:$cfs.children().length,first:0},tmrs={auto:null,progress:null,startTime:getTime(),timePassed:0},scrl={isStopped:!1,duration:0,startTime:0,easing:"",anims:[]},clbk={onBefore:[],onAfter:[]},queu=[],conf=$.extend(!0,{},$.fn.carouFredSel.configs,configs),opts={},opts_orig=$.extend(!0,{},options),$wrp="parent"==conf.wrapper?$cfs.parent():$cfs.wrap("<"+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();if(conf.selector=$cfs.selector,conf.serialNumber=$.fn.carouFredSel.serialNumber++,conf.transition=conf.transition&&$.fn.transition?"transition":"animate",FN._init(opts_orig,!0,starting_position),FN._build(),FN._bind_events(),FN._bind_buttons(),is_array(opts.items.start))var start_arr=opts.items.start;else{var start_arr=[];0!=opts.items.start&&start_arr.push(opts.items.start)}if(opts.cookie&&start_arr.unshift(parseInt(cf_getCookie(opts.cookie),10)),start_arr.length>0)for(var a=0,l=start_arr.length;l>a;a++){var s=start_arr[a];if(0!=s){if(s===!0){if(s=window.location.hash,1>s.length)continue}else"random"===s&&(s=Math.floor(Math.random()*itms.total));if($cfs.triggerHandler(cf_e("slideTo",conf),[s,0,!0,{fx:"none"}]))break}}var siz=sz_setSizes($cfs,opts),itm=gi_getCurrentItems($cfs.children(),opts);return opts.onCreate&&opts.onCreate.call($tt0,{width:siz.width,height:siz.height,items:itm}),$cfs.trigger(cf_e("updatePageStatus",conf),[!0,siz]),$cfs.trigger(cf_e("linkAnchors",conf)),conf.debug&&$cfs.trigger(cf_e("debug",conf)),$cfs},$.fn.carouFredSel.serialNumber=1,$.fn.carouFredSel.defaults={synchronise:!1,infinite:!0,circular:!0,responsive:!1,direction:"left",items:{start:0},scroll:{easing:"swing",duration:500,pauseOnHover:!1,event:"click",queue:!1}},$.fn.carouFredSel.configs={debug:!1,transition:!1,onWindowResize:"throttle",events:{prefix:"",namespace:"cfs"},wrapper:{element:"div",classname:"caroufredsel_wrapper"},classnames:{}},$.fn.carouFredSel.pageAnchorBuilder=function(a){return'<a href="#"><span>'+a+"</span></a>"},$.fn.carouFredSel.progressbarUpdater=function(a){$(this).css("width",a+"%")},$.fn.carouFredSel.cookie={get:function(a){a+="=";for(var b=document.cookie.split(";"),c=0,d=b.length;d>c;c++){for(var e=b[c];" "==e.charAt(0);)e=e.slice(1);if(0==e.indexOf(a))return e.slice(a.length)}return 0},set:function(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),d="; expires="+e.toGMTString()}document.cookie=a+"="+b+d+"; path=/"},remove:function(a){$.fn.carouFredSel.cookie.set(a,"",-1)}},$.extend($.easing,{quadratic:function(a){var b=a*a;return a*(-b*a+4*b-6*a+4)},cubic:function(a){return a*(4*a*a-9*a+6)},elastic:function(a){var b=a*a;return a*(33*b*b-106*b*a+126*b-67*a+15)}}))})(jQuery);;/**/
/*
* touchSwipe - jQuery Plugin
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* http://labs.skinkers.com/touchSwipe/
* http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* version 1.6.5 
*/

(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}return null};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}return null}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false);return null}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){if(J[a7]){return J[a7].distance}return undefined}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}}));
;/**/
/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);;/**/
/*
  Site wide Javascript

  Not dependant on media queries.

  Remember: to add jQuery, don't use
  $(document).ready(). See http://drupal.org/node/756722

(function ($) {

  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      // your code here ...
      // Eg.
      $('.example', context).click(function () {
        $(this).next('ul').toggle('show');
      });
    }
  };

}(jQuery));

*/

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

(function ($) {

  /* FUNCTIONS */
  jQuery.fn.exists = function(){ return this.length > 0; }


  /*  Open and scroll to selected more/less item */
  function openScrollToSelectedMoreLess(selected, context, idSelector) {
    if ($(selected, context).length) {
      $(selected, context).first().trigger("click");

      scrollToSelectedMoreLess(selected, context, idSelector);
    }
  }

  /*
    Scroll to item taking into account static page header
    idSelector is used when the more-less class isn't the scroll to element
  */
  function scrollToSelectedMoreLess(selected, context, idSelector) {
    var toolbarHeight  = $('#toolbar').height();
    var isEligibleForFixed = $('body').hasClass('desktop') && !$('body').hasClass('flyout-open') && !$('body').hasClass('responsive-mode')

    // idSelector is used when the h3 isn't the scroll to element
    if (idSelector) {
      var destinationY = $(idSelector).offset().top;
    } else {
      var destinationY = $(selected).offset().top;
    }

     // if a fixed header could be present, account for it
    if (isEligibleForFixed){
      var headerHeight = $('header.page-header').data('height'); /* changed dynamically by Drupal.behaviors.setHeaderHeight */

      // console.log('topHeaderHeight', topHeaderHeight)
      // console.log('headerHeight', headerHeight)
      // console.log('toolbarHeight', toolbarHeight)

      destinationY = destinationY - headerHeight;
    }
    //console.log(destinationY);

    $("html, body").animate({ scrollTop: destinationY - toolbarHeight}, "100");
  }

  /* Calculate and store height of header areas, for later calculation of scrolling features */
  Drupal.behaviors.setHeadersHeights = {
    attach: function(context, settings){
      function setHeaderHeight(header){
        var height = header.height()
        header.data('height', height);
      }

      var wholeHeader = $('header.page-header');
      var topHeader = $('#site-header-top');

      setHeaderHeight(wholeHeader);
      setHeaderHeight(topHeader);

      $(window).on('resize scroll', debounce(function (event) {
        setHeaderHeight(wholeHeader)
      }, 300));

      /* A bit of the header always gets hidden on scroll, but we needed to know it's initial height
      bearing in mind breakpoints, therefore only check this on resize, not scroll */
      $(window).on('resize', debounce(function (event) {
        setHeaderHeight(topHeader)
      }, 300));
    }
  }

  /*
   * REMOVE NO JS CLASS ON HTML IF THERE JS
   */
  Drupal.behaviors.removeNoJS = {
    attach: function(context, settings) {
      $('html', context).removeClass('no-js');
    }
  };

  /* Fix for removing IE conditional HTML classes from the html.tpl.php */
  Drupal.behaviors.addIEClasses = {
    attach: function(context, settings) {
      if($.browser.msie) {
        var globalHtml = $('html');
        if ($.browser.version == 9) $(globalHtml).addClass('ie9');
        if ($.browser.version < 9) $(globalHtml).addClass('lt-ie9');
        if ($.browser.version == 8) $(globalHtml).addClass('ie8');
        if ($.browser.version < 8) $(globalHtml).addClass('lt-ie8');
      }
    }
  }

  /*
   * ADD Class to body if we have root menu items present
   */
  Drupal.behaviors.rootMenu = {
    attach: function(context, settings) {
      // We need if this to find out if it's an inner menu or not so we check for the root level menu
      if ($(".homepage-oxweb-secondary-menu").exists()) {
        $("body").addClass("root-menus");
      }
    }
  }

  /* Fix problem with TinyMCE marking the invisible Comment body textarea as 'required = ""',
   * which is parsed by HTML5 browsers as 'required', and hence triggering client side validation
   * Hence we fix this by removing the 'required' attribute entirely.
   * This is OK as there will still be serverside validation
   */
  Drupal.behaviors.fixTinyMCEValidation = {
    attach: function(context, settings) {
      $('#comment-form textarea', context).removeAttr('required');
    }
  };

  /*
   * SHOW FLYOUT MENUS IN MAIN MENU
   */
  Drupal.behaviors.flyoutToggle = {
    attach: function(context, settings) {
      // The flyouts only feature on root menu pages
      if($('body').hasClass('root-menus')) {
        // Academic department hover behaviour.
        $('.oxweb-college-websites a.main-menu-item, .oxweb-academic-divisions a.main-menu-item').click(function(e) {
          var flyout = $(this).siblings('.flyout-menu');
          if (!$(this).hasClass('menu-open')) {
            var otherEl = $(this).parent().siblings().children();
            if($(otherEl).hasClass('menu-open')) {
              $(otherEl).removeClass('menu-open');
              $(otherEl).siblings('.flyout-menu').removeClass('menu-open').hide();
            }
          }
          if($(this).hasClass('menu-open')) {
            $(this).removeClass('menu-open');
            $(flyout).removeClass('menu-open').hide();
            $('body').removeClass('flyout-open');
          } else {
            $(this).addClass('menu-open');
             $(flyout).addClass('menu-open').show();
             $('body').addClass('flyout-open');
          }
          e.preventDefault();
        });
        $(document).mouseup(function(e) {
          var container = $('.flyout-menu.menu-open');
          // if the target of the click isn't the container.. nor a descendant of the container
          if ((!container.is(e.target) && container.has(e.target).length === 0 && !$('html').is(e.target)) && !$('.oxweb-college-websites a.main-menu-item, .oxweb-academic-divisions a.main-menu-item').is(e.target)) {
            if (!$('h2').is(e.target)) {
              container.hide();
              container.removeClass('menu-open');
              $('body').removeClass('flyout-open');
              $('.oxweb-college-websites a.main-menu-item, .oxweb-academic-divisions a.main-menu-item').removeClass('menu-open');
            }
          }
        });
      }
    }
  };

  /*
   * SEARCH PLACEHOLDER TEXT: Add the placeholder attr
   */
  Drupal.behaviors.seachPlaceholder = {
    attach: function(context, settings) {
      $('#edit-search-keys').attr('placeholder','Search...');
    }
  };

  /* Wrap form fields of 'file' type with an extra div, to allow for more
   * CSS styling capabilities.
   */
  Drupal.behaviors.formFileFields = {
    attach: function(context, settings) {
      $('form input:file').wrap('<div class="file-field-wrapper"></div>');
    }
  };

  /* Insert icon in to main image field and toggle fade description element on click */
  Drupal.behaviors.showDescription = {
    attach: function (context, settings) {
      $('.group_description_wrapper').each(function() {
        if ($(this).children('.field-name-field-media-description').length) {
          $('<span class="toggle-icon"></span>').insertAfter(this);
        }
      });

      $('.group_description_wrapper').css({opacity: 0});

      $('.toggle-icon').click(function(e) {
        e.preventDefault();

        var $el = $(this), $closestCarousel = $el.closest('.field-name-field-main-carousel, .field-name-section-index-carousel, .field-name-field-section-primary');

        if ($el.hasClass('shown')) {
          $closestCarousel.removeClass('description-toggled');
          $el.siblings('.group_description_wrapper').animate({opacity: 0}, 500);
          $el.removeClass("shown");
        } else {
          $closestCarousel.addClass('description-toggled');
          $el.siblings('.group_description_wrapper').animate({opacity: 1}, 500);
          $el.addClass("shown");
        }
      });
    }
  }

  /* Behaviour to slide additional description in on inline image */
  Drupal.behaviors.showDescriptionInline = {
    attach: function (context, settings) {
      $('.media-image-wrapper').each(function() {
        var $el = $(this);
        if ($el.find('.field-name-field-additional-description').length) {
          $el.find('.field-name-field-media-description').append('<a class="toggle-icon-inline"></a>');
        }
        $el.find('.field').wrapAll('<div class="group_description_inline_wrapper" />');
        descHeight = $el.find('.field-name-field-additional-description').outerHeight();
        $el.find('.group_description_inline_wrapper').css('bottom', '-' + descHeight + 'px');
      });
      $('.toggle-icon-inline').click(function() {
        var $el = $(this);
        var descHeight = $el.parent('.field-name-field-media-description').siblings('.field-name-field-additional-description').outerHeight();
        if ($el.hasClass('shown')) {
          $el.parents('.group_description_inline_wrapper').animate({bottom: '-' + descHeight + 'px'}, 500);
          $el.removeClass('shown');
        } else {
          $el.parents('.group_description_inline_wrapper').animate({bottom: '0px'}, 500);
          $el.addClass('shown');
        }
      });
    }
  }

  /* Tab behaviours */
  Drupal.behaviors.showTabs = {
    attach: function (context, settings) {
      if ($('body').hasClass('node-type-course')
       || $('body').hasClass('node-type-college')
       || $('body').hasClass('node-type-graduate-college')
       || $('body').hasClass('node-type-graduate-course')
       || $('body').hasClass('node-type-page-tabbed')) {
        // Place wrapper around tab fields to target for tabs
        $('.field_tab_title, .field-name-field-body-multiple, .tab-content-extra').wrapAll('<div class="tab-wrapper" />');

        // Move intro field to within first tab
        $('.tab-wrapper #content-tab', context).prepend($('.view-mode-oxweb_full_content .field-name-field-intro'));
        // Add in previous and next buttons
        var tabs = $('.tab-wrapper').tabs();
        $(".ui-tabs-panel", context).each(function(i){
          $(this).append('<div class="tab-nav" />');
          var totalSize = $(".ui-tabs-panel").size() - 1;
          var nextTabID = $(this).parent().next().children('.ui-tabs-panel').attr('id');
          var prevTabID = $(this).parent().prev().children('.ui-tabs-panel').attr('id');
          var nextTabTitle = $(this)
            .parents('.field-name-field-body-multiple')
            .siblings('.field_tab_title')
            .find('a[href="#' + nextTabID + '"]')
            .text();
          var prevTabTitle = $(this)
            .parents('.field-name-field-body-multiple')
            .siblings('.field_tab_title')
            .find('a[href="#' + prevTabID + '"]')
            .text();
          if (i != totalSize) {
            next = i + 2;
            $(this, context).children('.tab-nav').append("<a href='#' class='next-tab mover' rel='" + next + "'>Next<br /><span>" + nextTabTitle + "</span></a>");
          }
          if (i != 0) {
            prev = i;
            $(this, context).children('.tab-nav').append("<a href='#' class='prev-tab mover' rel='" + prev + "'>Previous<br /><span>" + prevTabTitle + "</span></a>");
          }
        });
        $('.mover').click(function(e) {
          $('html, body').finish(); // force animation to finish as sometimes when there is Ajax call on the page, this gets glitchy. See https://torchbox.codebasehq.com/projects/oxford-university/tickets/607#update-23783561
          $('html, body').animate({
            scrollTop: $("#main-content").offset().top
          }, 500);
          if ($(this).attr("rel") == 1) {
            tabs.tabs('option', "active", 0);
          } else {
            tabs.tabs('option', "active", $(this).attr("rel") - 1);
          }
          e.preventDefault();
        });
        // Stop links from jumping to content area
        $('.tab-wrapper .field_tab_title').click(function (e) {
          e.preventDefault();
        });
      }
    }
  }

  /* Fix overlay icons for > IE9 & gradients */
  Drupal.behaviors.overlayFix = {
    attach: function (context, settings) {
      if ($('html').hasClass('lt-ie9')) {
        $('.node-video-highlight img, .discover-link-type-itunes img').after('<div class="icon-holder"></div>');
        $('.node-type-section-index .node-video-highlight .file-video').after('<div class="add-ie8-grad"></div>');
      }
    }
  }

  /* Video wall tab behaviours */
  Drupal.behaviors.videoTabs = {
    attach: function (context, settings) {
      if ($('body').hasClass('node-type-video-wall')) {
        $('.tab-wrapper').tabs();
      }
    }
  }

  /* Video Youtube API calls */
  Drupal.behaviors.videoAPICalls = {
    attach: function (context, settings) {
      // This stops context running the code multiple times.
      if(!$("body").hasClass("playlists-processed") && $("body").hasClass("node-type-video-wall")) {
        /* Video wall API calls */
        /* Youtube API key */
        var APIKey = "AIzaSyDgY7k8-5AJ8c73og7H5bLGMDZA6aMW23A";
        var YTurl = "";
        var maxResults = 50;
        var html;

        // Indicate that the code has been processed
        $("body", context).addClass("playlists-processed");
        // A function that grabs the playlist JSON and renders out the page.
        function getPlaylistItems (url, appendElement, nextPageToken ) {
          // Request the JSON and build the HTML
          $.getJSON( url, {})
            .done(function( data ) {
              //DEBUGGING
                //Gives you playlist data:
                //console.log(data);
                //Gives you the playlist items:
                // console.log(data.items);
              // Create a list item for each video
              $.each( data.items, function( i, item ) {
                //Do a check for thumbnail images because the size available is based on the quality of the vid uploaded
                // console.log(item.status.privacyStatus);
                // privacyStatus values: public, unlisted, private
                if (item.status.privacyStatus == "public" || item.status.privacyStatus == "unlisted") {
                  if ( item.snippet.thumbnails ) {
                    //TODO: Make this a switch statement
                    if ( item.snippet.thumbnails.high.url ) {
                      var img = item.snippet.thumbnails.high.url;
                    } else if ( item.snippet.thumbnails.medium.url ) {
                      var img = item.snippet.thumbnails.medium.url;
                      // Quotes used because the word default causes issues in IE8. Rubbish!
                    } else if ( "item.snippet.thumbnails.default.url" ) {
                      var img = "item.snippet.thumbnails.default.url";
                    } else {
                      var img = "";
                      // console.log('Video wall Error: There should be an thumbnail. Look at data (JSON).');
                    }
                  }
                  html = '<li id="video-'+ item.snippet.position +'" class="video-item" data-vid="'+item.snippet.resourceId.videoId+'"><div id="'+item.snippet.resourceId.videoId+'" class="content-wrapper"><div class="image-wrapper" style="background-image: url('+img+');"><img src="'+img+'" alt="'+item.snippet.title+'" /></div><h2>'+item.snippet.title+'</h2><div class="description">'+item.snippet.description+'</div></div></li>'
                  $(appendElement).children('ul').append(html);
                }
              });
              //Hide the videos
              $('.video-item').hide();
              //Here we check to see if we have a new next page token, indicating
              //more results so we call this function again and pass the new token.
              var time = 500;
              if (nextPageToken != data.nextPageToken && data.nextPageToken) {
                var urlNextPage = YTurl+'&pageToken='+data.nextPageToken+'';
                getPlaylistItems(urlNextPage, appendElement, data.nextPageToken);
              } else {
                // Loading GIF removed on class being added.
                $(appendElement).children('ul').delay(50).addClass("videos-loaded");
                // Animation for showing the vids.
                $('.video-item').delay(50).fadeIn(500);
              }
            });
        }

        function createYTRequest(el) {
          var playlistId = $(el).attr('data-playlist-id');
          var appendEl = "#" + $(el).attr('aria-controls');
          // &callback=? is required for IE8 / 9 to work
          YTurl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults='+maxResults+'&playlistId='+playlistId+'&key='+APIKey+'&callback=?';
          getPlaylistItems(YTurl, appendEl);
          $(el).addClass('visited');
        }

        // Get the playlist for the first open tag. This will run only once.
        createYTRequest('.node-type-video-wall ul.ui-tabs-nav li.ui-state-active');

        // Load a new playlist when a new tab is clicked
        $('.node-type-video-wall ul.ui-tabs-nav li').click(function() {
          if (!$(this).hasClass('visited')) {
            createYTRequest($(this));
          }
        });


        // On click of an item load up the youtube video.
        // Because DOM has been updated we us .on() with parent element
        $(".node-type-video-wall .ui-tabs-panel").on("click", "ul li", function() {
          var el = $(this);
          // We just want the content of the <li> and we want to clone it.
          var elContent = $(el).children(".content-wrapper").clone();
          //Get the video id
          var videoId = $(el).attr('data-vid');
          //Add this if you want the video go on an play the rest of the playlist
          //var playlistParm = "?list='+playlistId+'";
          var playlistParm = "";
          var videoEmbedHtml = '<div class="video-player-wrapper"><a class="close-btn" href="">Back</a><iframe width="1100" height="619" src="//www.youtube.com/embed/'+videoId + playlistParm +'" frameborder="0" allowfullscreen></iframe></div>';
          // Add the video player to the HTML
          $(elContent).prepend(videoEmbedHtml).fitVids();
          if ($("body").hasClass("mobiles")) {
            // Send the HTML to the colorbox
            $.colorbox({
              html:elContent,
              width: "100%",
              height: "auto",
              opacity: 1,
              fixed: false,
              closeButton: false,
              onOpen: function() {
                $("html").toggleClass("page-no-scroll");
              },
              onClosed: function() {
                $("html").toggleClass("page-no-scroll");
              }
            });
            $(".close-btn").click(function(e){
              e.preventDefault();
              $.colorbox.close();
            });

          } else {
            // Send the HTML to the colorbox
            $.colorbox({
              html:elContent,
              width: "70%",
              maxWidth: 1000,
              height: "auto"
            });
          }
        });
      }
    }
  }

  /* Responsive videos */
  Drupal.behaviors.responsiveVideos = {
    attach: function (context, settings) {
      $('#page-content').fitVids();
      // For colorbox video highlight
      $('#cboxLoadedContent .field-name-field-video').fitVids();
    }
  }

  Drupal.behaviors.videoColorbox = {
    attach: function (context, settings) {

      // Skip if this isn't a page (eg, this is colorbox ajax content)
      if (context.nodeName != '#document') { return; }

      // Skip if this page has no cbox
      if ($('a.colorbox-node', context).length == 0) { return; }

      // Timeout
      var cboxResizeTimeout;

      // Size down video highlight colorbox popup height to fit its loaded content
      $(document, context).bind('cbox_complete', function(){
          // Try to just set timeout once, and not repeatedly on cbox complete
          if (!$('#cboxLoadedContent').hasClass('oxweb-initialised')) {
            //console.log('cbox_complete');
            cboxResizeTimeout = setTimeout(function(){ resizeVideoColorbox(context) }, 1000);
            $('#cboxLoadedContent').addClass('oxweb-initialised');
          }
      }); // ends cbox_complete

      $(document, context).bind('cbox_closed', function(){
        //console.log('cbox_closed');
        clearTimeout(cboxResizeTimeout);
        $('#cboxLoadedContent').removeClass('oxweb-initialised');
      });

      function resizeVideoColorbox (context) { // give some time for video to load and be vidfit'ed
        var videoHeight = $('#cboxLoadedContent .view-mode-colorbox .field-name-field-video', context).height();
        var highlightHeight = $('#cboxLoadedContent .view-mode-colorbox', context).height();
        var highlightWidth = $('#cboxLoadedContent .view-mode-colorbox', context).width();
        var cboxHeight = $('#cboxLoadedContent', context).height();
        var cboxWidth = $('#cboxLoadedContent', context).width();

        //console.log('Cbox running resizeVideoColorbox()');

        // Skip if video isn't loaded yet and height is null or 2px
        if (highlightHeight < 10) {
          //console.log('Cbox failed resizeVideoColorbox() - highlight height: ' + highlightHeight + '; video height: ' + videoHeight);
          // re-run this again if video hasn't loaded
          clearTimeout(cboxResizeTimeout);
          cboxResizeTimeout = setTimeout(function(){ resizeVideoColorbox(context) }, 1000);
          return;
        }

        // Adjust size if video height is exceeds cbox height (ie. video is cut-off)
        if (videoHeight > cboxHeight) {
          var ratio = cboxHeight / videoHeight;
          var newCboxWidth = cboxWidth * ratio;
          // Resize to fit highlight content
          //console.log('Cbox resize to refit cutoff video');
          $.colorbox.resize({innerWidth: newCboxWidth, innerHeight: '95%'});
          $('#cboxLoadedContent .field-name-field-video', context).fitVids();
        }

        // Adjust height if highlight height is smaller cbox height (ie. too much space below highlight)
        if (highlightHeight < cboxHeight) {
          // Resize to fit highlight content
          //console.log('Cbox remove extra height');
          $.colorbox.resize();
        }
      } // closes resizeVideoColorbox()
    } // closes attach: function (context, settings) {
  } // closes Drupal.behaviors.videoColorbox

  
  /* Configure expanding areas of content, know as "more/less" with heading:element pairs used to toggle expension */
  Drupal.behaviors.enhanceMoreLess = {
    attach: function(context, settings){
      /*
        Drupal.behaviors.moreLessToggle expects an h3 inside a container ".more-less".
        This "behavior" enhances situations where that structure can't be provided,
        by wrapping an H3 (and any .more-less siblings) with a parent ".more-less".
      */
      $('h3.more-less').each(function(){
        var set = $(this);
        var nxt = this.nextSibling;

        while(nxt) {
          if ((!$(nxt).is('h3.more-less')) && ($(nxt).hasClass('more-less'))) {
            set.push(nxt);
            nxt = nxt.nextSibling;
          } else break;
        }

        set.removeClass('more-less');

        // If simple-style is add then add extra class to parent
        if ($(set).hasClass('simple-style')) {
          set.wrapAll('<div class="more-less simple-style" />');
        } else {
          set.wrapAll('<div class="more-less" />');
        }
      });
    }
  }

  /* Click handler for a previously configured more/less heading:element pair, from Drupal.behaviors.enhanceMoreLess */
  Drupal.behaviors.moreLessToggle = {
    attach: function(context, settings) {
      // Clicking any h3 in a .more-less container, toggles a class on the immediate parent
      $('.more-less h3').click(function(){
        $(this).parent().toggleClass('show');
      });
    }
  }

  /* Automatically scroll pages to hashes mentioned in URL. */
  Drupal.behaviors.urlHashJump = {
    attach: function(context, settings){
      var hash = window.location.hash;
      var targetElem = $(hash);

      if (hash.length && targetElem.length) { // check that the hash and an element using it exist

        /* A timeout allows for more time for the user to orientate themselves, also for async functions to finish,
        yes this is a massive hack, but as we have no way of knowing what other functions exist that are
        expected to finish first, we have little choice.
        */
        var doTimeout = setTimeout(function(){
          clearTimeout(doTimeout);

          // 1. If the hash is on a div within a .news-item-content or .event-item-content that has children */
          if(targetElem.is('div') && targetElem.parents(".news-item-content, .event-item-content").next().children().length){
            moreLessEl = targetElem.parents(".news-item-content, .event-item-content").next().children()
            openScrollToSelectedMoreLess(moreLessEl, context, targetElem);
          }

          // 2. If the hash is an anchor to a tab's contents, ensure the tab is what gets scrolled to the top, not its contents.
          // else  if(){

          // }

          /* all other cases*/
          else {
            openScrollToSelectedMoreLess(hash, context);
          }

          /* Commented out 2014-06-24: Can't find any use of this
          if(targetElem.is('h2')){
            hashElem = $("h2" + hash);

            var moreLessEl = hashElem.parents(".news-item-content, .event-item-content").next().children();
            openScrollToSelectedMoreLess(moreLessEl, context, hashElem);

          } else if (hashElem.is('h3')){

            openScrollToSelectedMoreLess('.more-less h3' + hash, context);

          }
          */

        }, 500);
      }
    }
  }

  /* Alter views exposed filter select to be links instead.
     The view is targetted as it can appear on many content types.
   */
  Drupal.behaviors.gatewaySelectToTabs = {
    attach: function(context, settings) {
      var thisPath = location.pathname;
      $('.view-events-graduate select.form-select option')
      .each(function() {
        var $listItem = $('<li class="ui-state-default" />');
        var $anchor = $('<a />');
        $anchor.attr('href', thisPath + '?tid=' + $(this).attr('value'));
        // Format the link text, removing the hyphens and spaces from around
        // the "- All -" option.
        var $linkText = $(this).text().replace(/-/g, '').trim();
        $anchor.text($linkText);
        $listItem.append($anchor);
        // Remove the surrounding select.
        $(this).unwrap();
        $(this).replaceWith($listItem);
      });
      var $tabsWrapper = $('<div class="ui-tabs" />');
      var $list = $('<ul class="ui-tabs-nav" />');
      $('.view-events-graduate .views-widget-filter-tid li').wrapAll($list);
      $('.ui-tabs-nav').wrapAll($tabsWrapper);
      $('.view-events-graduate .views-submit-button').remove();
      var url = window.location.search;
      if (!url) {
        // Querystring empty, set first item so we have one active.
        url = "?tid=All";
      }
      $('.ui-tabs-nav a[href$="' + url + '"]').parent().addClass('ui-tabs-active ui-state-active');
    }
  }

  /*
    Automatically scroll page where URL contains query strings corresponding to tab links in the page.
    Only supports domain-less, absolute links (e.g "/test?foo=bar") in tabs, within view attachments or within exposed view filters
  */
  Drupal.behaviors.exposedFiltersAnchors = {
    attach: function(context, settings){
      // only do this if the url has a search
      if(location.search.length){
        var thisUrl = location.pathname + location.search;
        var matches = $('.attachment .ui-tabs a[href="' + thisUrl + '"], .views-exposed-widgets .ui-tabs a[href="' + thisUrl + '"]');

        if(matches.length){
          var doTimeout = setTimeout(function(){
            clearTimeout(doTimeout);
            scrollToSelectedMoreLess(matches[0]);
          }, 500);
        }
      }
    }
  },

  /* Automatically scroll page to any anchor target */
  Drupal.behaviors.anchorClick = {
    attach: function(context, settings){
      $('#page-content-main a[href*="#"]', context).each(function(index){

        // necessary to normalise URLs as some get generated with protocol-relative URLs, some as relative, some as absolute-without-domain.
        var protocolRelativeHref = $(this).attr('href').replace(/(https?:)?\/\//,'');
        var hash = protocolRelativeHref.replace(/^.*?(#|$)/,'').replace(/[^A-Za-z0-9\-\_]/g,'')
        var urlWithoutHash = protocolRelativeHref.substr(0, protocolRelativeHref.indexOf('#'))
        var protocolRelativeCurrentUrlWithoutHash = document.location.host + document.location.pathname;

        // double check hash exists in link and as a target anchor in the page
        if (hash.length && $('#' + hash).length) {
          hash = '#' + hash;

          $(this).click(function(e){

            // 1. Links going to other pages handled first.
            //
            // This is necessary because if the current page AND the link target page both have a tab of the same name,
            // the conditions below that expect to find anchors within the current page will fire inappropriately
            // if run first.
            if(urlWithoutHash.length && urlWithoutHash != protocolRelativeCurrentUrlWithoutHash){
              console.log('here')
              return true;
            }

            // Everything else needs to override standard behaviour
            e.preventDefault();

            // 2. Link points to a more-less heading

            if ($('.more-less h3' + hash, context).length) {
              // Hide all open more-less first
              $('div.more-less').removeClass('show');

              // Go to selected more-less
              openScrollToSelectedMoreLess('.more-less h3' + hash, context);
            }

            // 3. Link comes from a tab-set, so the clicked tab ought to remain visible after scroll

            else if ($(this).hasClass('ui-tabs-anchor')){
              scrollToSelectedMoreLess(hash, context, $(this));
            }

            // 4. Link points to a random zone happening to contain a more-less heading

            else if ($(hash + ' .more-less h3', context).length) {
              // Hide all open more-less first
              $('div.more-less').removeClass('show');

              // Go to selected hash, not the .more-less
              // Note that the third param scrolls to the hash, not to opened element
              openScrollToSelectedMoreLess(hash + ' .more-less h3', context, hash);
            }

            // 5. Link is simply a basic anchor

            else if (!urlWithoutHash.length || protocolRelativeCurrentUrlWithoutHash == urlWithoutHash) {
              scrollToSelectedMoreLess(hash, context);
            }
          });
        }
      });

      /* Automatic FAQ listing links need to work without changing hash */
      /* Commented out 2014-06-24: Can't find any use of this not already covered by the rest of this code
      $('.field-name-field-listing-category .field-item a', context).click(function(e) {
        var changedHash = $(this).attr('href');
        // Check if more-less class is on children
        if ($(this).find('.more-less').length != 0) {
          // Hide all open more-less first
          $('div.more-less').removeClass('show');
          // Go to selected more-less
          openScrollToSelectedMoreLess(changedHash +' .more-less h3', context);
        }
        else {
          openScrollToSelectedMoreLess(changedHash);
        }
        e.preventDefault();
      });
      */
    }
  }

  /* Overrides browser's vanilla hash location with version aware of top menu fixey-ness */
  Drupal.behaviors.hashChange = {
    attach: function(context, settings){
      $(window).on('hashchange', function(e){

        var hash = window.location.hash;
        var targetElem = $(hash);

        if (hash.length && targetElem.length){
          openScrollToSelectedMoreLess(hash, context)
        }
      })
    }
  }

  /* Use ul with given class to become select list with jump to url functionality */
  Drupal.behaviors.ulToSelect = {
    attach: function(context, settings) {
      if ($('ul.jump-list')) {
        $('ul.jump-list').each(function() {
          var $select = $('<select class="jump-list" />');
          $select.append($('<option value="">Select from the list:</option>'));
            $(this).children().each(function() {
              var $option = $('<option />');
              var $anchor = $(this).find('a')
              if ($anchor.attr('href') !== undefined) {
                $option.attr('value', $anchor.attr('href')).html($anchor.html());
              } else {
                $option.attr({
                  value: '',
                  disabled: 'disabled'}).html($(this).html());
              }
              $select.append($option);
            });
          $(this).replaceWith($select);
        });
        $('select.jump-list').change(function() {
          window.location = $(this).val();
        });
      }
    }
  }

  /* Wrap headers and their lists in a div on Gateway pages to allow for 50%
     floated elements
  */
  Drupal.behaviors.gatewayWrappers = {
    attach: function(context, settings) {
      $('.node-type-gateway-staff.consultation-page-type-none .field-name-field-body-multiple h2', context)
        .each(function() {
          $(this)
            .next()
            .andSelf()
            .wrapAll('<div class="gateway-wrapper" />');
        });
    }
  }

  /* Alternative layout for PAD pages #412 */
  Drupal.behaviors.padLayout = {
    attach: function(context, settings) {
      if ($('body').hasClass('pad-style')) {
        $('#breadcrumb-wrapper, #main-title').appendTo('#block-ds-extras-oxweb-ds-page-tabbed-top');
        $('#breadcrumb-wrapper, #main-title').wrapAll('<div class="pad-header-wrapper" />');
        $('<div class="pad-gradient" />').appendTo('.field-name-field-image-main');
      }
    }
  }

  /* Alter views exposed filter select to be links instead.
     The view is targetted as it can appear on many content types.
   */
  Drupal.behaviors.gatewaySelectToTabs = {
    attach: function(context, settings) {
      $('.view-events-graduate select.form-select option')
        .each(function() {
          var $listItem = $('<li class="ui-state-default" />');
          var $anchor = $('<a />');

          // Format the link text, replacing '- Any -' with 'All Events'
          $anchor.attr('href', '?tid=' + $(this).attr('value'))
            .text($(this).text().replace('- Any -', 'All Events').trim());

          $listItem.append($anchor);
          // Remove the surrounding select.
          $(this).unwrap().replaceWith($listItem);
        });

      var $tabsWrapper = $('<div class="ui-tabs" />');
      var $list = $('<ul class="ui-tabs-nav" />');
      $('.view-events-graduate .views-widget-filter-tid li').wrapAll($list);
      $('.ui-tabs-nav').wrapAll($tabsWrapper);
      $('.view-events-graduate .views-submit-button').remove();

      var url = window.location.search;
      if (!url) {
        // Querystring empty, set first item so we have one active.
        url = "?tid=All";
      }
      var pattern = url.match(/tid=[^\&]+/);
      $('.view-events-graduate .ui-tabs-nav a[href*="' + pattern + '"]').parent()
        .addClass('ui-tabs-active ui-state-active');
    }
  }

  /**
   * Force equal height columns for annual appointments
   * @type {Object}
   */
  Drupal.behaviors.equalHeight = {
    attach: function(context, settings) {
      if ($.fn.matchHeight == undefined) return;

      $('.appointment-people .col').matchHeight();
      setTimeout(function() {
        $('div[aria-expanded="false"]').hide();
      }, 1000);
    }
  }
}(jQuery));
;/**/
// html5shiv @rem remysharp.com/html5-enabling-script
// iepp v1.6.2 @jon_neal iecss.com/print-protector
// Dual licensed under the MIT or GPL Version 2 licenses
/*@cc_on(function(a,b){function r(a){var b=-1;while(++b<f)a.createElement(e[b])}if(!(!window.attachEvent||!b.createStyleSheet||!function(){var a=document.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}())){a.iepp=a.iepp||{};var c=a.iepp,d=c.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",e=d.split("|"),f=e.length,g=new RegExp("(^|\\s)("+d+")","gi"),h=new RegExp("<(/*)("+d+")","gi"),i=/^\s*[\{\}]\s*$/,j=new RegExp("(^|[^\\n]*?\\s)("+d+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),k=b.createDocumentFragment(),l=b.documentElement,m=l.firstChild,n=b.createElement("body"),o=b.createElement("style"),p=/print|all/,q;c.getCSS=function(a,b){if(a+""===undefined)return"";var d=-1,e=a.length,f,g=[];while(++d<e){f=a[d];if(f.disabled)continue;b=f.media||b,p.test(b)&&g.push(c.getCSS(f.imports,b),f.cssText),b="all"}return g.join("")},c.parseCSS=function(a){var b=[],c;while((c=j.exec(a))!=null)b.push(((i.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(g,"$1.iepp_$2")+c[4]);return b.join("\n")},c.writeHTML=function(){var a=-1;q=q||b.body;while(++a<f){var c=b.getElementsByTagName(e[a]),d=c.length,g=-1;while(++g<d)c[g].className.indexOf("iepp_")<0&&(c[g].className+=" iepp_"+e[a])}k.appendChild(q),l.appendChild(n),n.className=q.className,n.id=q.id,n.innerHTML=q.innerHTML.replace(h,"<$1font")},c._beforePrint=function(){o.styleSheet.cssText=c.parseCSS(c.getCSS(b.styleSheets,"all")),c.writeHTML()},c.restoreHTML=function(){n.innerHTML="",l.removeChild(n),l.appendChild(q)},c._afterPrint=function(){c.restoreHTML(),o.styleSheet.cssText=""},r(b),r(k);if(c.disablePP)return;m.insertBefore(o,m.firstChild),o.media="print",o.className="iepp-printshim",a.attachEvent("onbeforeprint",c._beforePrint),a.attachEvent("onafterprint",c._afterPrint)}})(this,document);@*/
;/**/
// Generated by CoffeeScript 1.3.3

/*

  Harvey, A Second Face for Your Application's JavaScript

  Copyright 2012, Joschka Kintscher
  Released under the MIT License

  https://github.com/harvesthq/harvey/
*/


(function() {
  var State, _mediaQueryList;

  this.Harvey = (function() {

    function Harvey() {}

    Harvey.states = {};

    /*
        Creates a new State object for the given media query using the passed hash
        of callbacks and stores it in @states. The passed hash may contain up to
        three callbacks. See documentation of the State class for more information.
    */


    Harvey.attach = function(mediaQuery, callbacks) {
      var state;
      if (!this.states.hasOwnProperty(mediaQuery)) {
        this.states[mediaQuery] = [];
        this._add_css_for(mediaQuery);
      }
      state = new State(mediaQuery, callbacks != null ? callbacks.setup : void 0, callbacks != null ? callbacks.on : void 0, callbacks != null ? callbacks.off : void 0);
      if (!this.states[mediaQuery].length) {
        this._watch_query(mediaQuery);
      }
      this.states[mediaQuery].push(state);
      if (this._window_matchmedia(mediaQuery).matches) {
        this._update_states([state], true);
      }
      return state;
    };

    /*
        Removes a given State object from the @states hash.
    
        @param  object  state  A valid state object
    */


    Harvey.detach = function(state) {
      var i, s, _i, _len, _ref, _results;
      _ref = this.states[state.condition];
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        s = _ref[i];
        if (state === s) {
          _results.push(this.states[s.condition][i] = void 0);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    /*
        Create a new matchMediaListener for the passed media query.
    
        @param  string  mediaQuery  A valid CSS media query to watch
    */


    Harvey._watch_query = function(mediaQuery) {
      var _this = this;
      return this._window_matchmedia(mediaQuery).addListener(function(mql) {
        return _this._update_states(_this.states[mediaQuery], mql.matches);
      });
    };

    /*
        Activates/Deactivates every State object in the passed list.
    
        @param  array   states  A list of State objects to update
        @param  boolean active Whether to activate or deactivate the given states
    */


    Harvey._update_states = function(states, active) {
      var state, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        state = states[_i];
        if (active) {
          _results.push(state.activate());
        } else {
          _results.push(state.deactivate());
        }
      }
      return _results;
    };

    /*
        BEWARE: You're at the edge of the map, mate. Here there be monsters!
    
        ------------------------------------------------------------------------------------
    
        Private methods to fix and polyfill the matchMedia interface for several engines
    
        * Inspired by Nicholas C. Zakas' article on the different problems with matchMedia
          http://www.nczonline.net/blog/2012/01/19/css-media-queries-in-javascript-part-2/
    
        * Implementing a modified coffeescript version of Scott Jehl's and Paul Irish's matchMedia.js polyfill
          https://github.com/paulirish/matchMedia.js
    */


    /*
        [FIX] for Firefox/Gecko browsers that lose reference to the
              MediaQueryList object unless it's being stored for runtime.
    */


    Harvey._mediaList = {};

    /*
        @param  string  mediaQuery      A valid CSS media query to monitor for updates
        @Return object  MediaQueryList  Depending on the browser and matchMedia support either a native
                                        mediaQueryList object or an instance of _mediaQueryList
    */


    Harvey._window_matchmedia = function(mediaQuery) {
      if (window.matchMedia && 'addListener' in window.matchMedia('all')) {
        if (!(mediaQuery in this._mediaList)) {
          this._mediaList[mediaQuery] = window.matchMedia(mediaQuery);
        }
        return this._mediaList[mediaQuery];
      }
      /*
            [POLYFILL] for all browsers that don't support matchMedia() at all (CSS media query support
                       is still mandatory though).
      */

      if (!this._listening) {
        this._listen();
      }
      if (!(mediaQuery in this._mediaList)) {
        this._mediaList[mediaQuery] = new _mediaQueryList(mediaQuery);
      }
      return this._mediaList[mediaQuery];
    };

    /*
        Add resize and orientationChange event listeners to the window element
        to monitor updates to the viewport
    */


    Harvey._listen = function() {
      var evt,
        _this = this;
      evt = window.addEventListener || window.attachEvent;
      evt('resize', function() {
        var mediaList, mediaQuery, _ref, _results;
        _ref = _this._mediaList;
        _results = [];
        for (mediaQuery in _ref) {
          mediaList = _ref[mediaQuery];
          _results.push(mediaList._process());
        }
        return _results;
      });
      evt('orientationChange', function() {
        var mediaList, mediaQuery, _ref, _results;
        _ref = _this._mediaList;
        _results = [];
        for (mediaQuery in _ref) {
          mediaList = _ref[mediaQuery];
          _results.push(mediaList._process());
        }
        return _results;
      });
      return this._listening = true;
    };

    /*
        [FIX] for Webkit engines that only trigger the MediaQueryListListener
              when there is at least one CSS selector for the respective media query
    
        @param  string  MediaQuery  The media query to inject CSS for
    */


    Harvey._add_css_for = function(mediaQuery) {
      if (!this.style) {
        this.style = document.createElement('style');
        this.style.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(this.style);
      }
      mediaQuery = "@media " + mediaQuery + " {.harvey-test{}}";
      if (!this.style.styleSheet) {
        return this.style.appendChild(document.createTextNode(mediaQuery));
      }
    };

    return Harvey;

  })();

  /*
    A State allows to execute a set of callbacks for the given valid CSS media query.
  
    Callbacks are executed in the context of their state object to allow access to the
    corresponding media query of the State.
  
    States are not exposed to the global namespace. They can be used by calling the
    static Harvey.attach() and Harvey.detach() methods.
  */


  State = (function() {

    State.prototype.active = false;

    State.prototype.is_setup = false;

    /*
        Creates a new State object
    
        @param  string    condition The media query to check for
        @param  function  setup     Called the first time `condition` becomes valid
        @param  function  on        Called every time `condition` becomes valid
        @param  function  off       Called every time `condition` becomes invalid
    */


    function State(condition, setup, on, off) {
      this.condition = condition;
      this.setup = setup;
      this.on = on;
      this.off = off;
    }

    /*
        Activate this State object if it is currently deactivated. Also perform all
        set up tasks if this is the first time the State is activated
    */


    State.prototype.activate = function() {
      if (this.active) {
        return;
      }
      if (!this.is_setup) {
        if (typeof this.setup === "function") {
          this.setup();
        }
        this.is_setup = true;
      }
      if (typeof this.on === "function") {
        this.on();
      }
      return this.active = true;
    };

    /*
        Deactive this State object if it is currently active
    */


    State.prototype.deactivate = function() {
      if (!this.active) {
        return;
      }
      if (typeof this.off === "function") {
        this.off();
      }
      return this.active = false;
    };

    return State;

  })();

  /*
    [FIX] simple implemenation of the matchMedia interface to mimic the native
          matchMedia interface behaviour to work as a polyfill for Harvey
  */


  _mediaQueryList = (function() {
    /*
        Creates a new _mediaQueryList object
    
        @param  string  media  A valid CSS media query
    */

    function _mediaQueryList(media) {
      this.media = media;
      this._listeners = [];
      this.matches = this._matches();
    }

    /*
        Add a new listener to this mediaQueryList that will be called every time
        the media query becomes valid
    */


    _mediaQueryList.prototype.addListener = function(listener) {
      this._listeners.push(listener);
      return void 0;
    };

    /*
        Evaluate the media query of this mediaQueryList object and notify
        all registered listeners if the state has changed
    */


    _mediaQueryList.prototype._process = function() {
      var callback, current, _i, _len, _ref, _results;
      current = this._matches();
      if (this.matches === current) {
        return;
      }
      this.matches = current;
      _ref = this._listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(this));
      }
      return _results;
    };

    /*
        Check whether the media query is currently valid
    */


    _mediaQueryList.prototype._matches = function() {
      if (!this._tester) {
        this._get_tester();
      }
      this._tester.innerHTML = '&shy;<style media="' + this.media + '">#harvey-mq-test{width:42px;}</style>';
      this._tester.removeChild(this._tester.firstChild);
      return this._tester.offsetWidth === 42;
    };

    /*
        Retrieve the element to test the media query on from the DOM or create
        it if it has not been injected into the page yet
    */


    _mediaQueryList.prototype._get_tester = function() {
      this._tester = document.getElementById('harvey-mq-test');
      if (!this._tester) {
        return this._build_tester();
      }
    };

    /*
        Create a new div with a unique id, move it outsite of the viewport and inject it into the DOM.
        This element will be used to check whether the registered media query is currently valid.
    */


    _mediaQueryList.prototype._build_tester = function() {
      this._tester = document.createElement('div');
      this._tester.id = 'harvey-mq-test';
      this._tester.style.cssText = 'position:absolute;top:-100em';
      return document.body.insertBefore(this._tester, document.body.firstChild);
    };

    return _mediaQueryList;

  })();

}).call(this);;/**/
/*
 * Author(s): James Morris
 *
 * HARVEY MEDIA QUERIES
 *
 * All media query based Javascript to go here
 */


/* TODO: Add finalised media queries */

(function ($) {

  Drupal.behaviors.harveyQueries = {
    attach: function(context, settings) {

      // Skip if this isn't a page (eg, this is colorbox content)
      if (context.nodeName != '#document') { return; }

      var qry1, qry2, qry3, qry4, qry5;

      // $('.dimensions').html('Width: ' + $(window).width() + 'px');
      // $(window, context).resize(function() {
      //   return $('.dimensions').html('Width: ' + $(this).width() + 'px');
      // });

      /* Work out the page headers height on scroll. */
      $(window).on('resize', throttle(function (event) {
        $('body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items', context).trigger('updateSizes');
        $('body.node-type-oxweb-homepage .field-name-field-discover-carousel .field-items', context).trigger('updateSizes');
        fixSlideshowPro(context);
      }, 400));

      var topMenuOffset = $('#site-header-top').offset().top;
      // fullMenuHeight = Header not fixed
      var fullMenuHeight = $('header.page-header').height();
      var topMenuTriggerFixed = topMenuOffset + $('#site-header-top').height();

      /* CLONE STUFF - Menu toggles */
      var primaryMenu = $(".oxweb-primary-menu-block").clone();
      var roleBasedMenu = $(".homepage-role-base-menu").clone();
      var secondaryMenu = $(".oxweb-secondary-menu-block").clone();
      var homeSecondaryMenu = $(".homepage-oxweb-secondary-menu").clone();
      var collegesMenu = $(".oxweb-college-websites a.main-menu-item").clone();
      var divisionsMenu = $(".oxweb-academic-divisions a.main-menu-item").clone();

      /* CACHE STUFF -  For responsive menus toggles */
      var hamburgerWrapperEl = null;
      var hamburgerMenuEl = null;

      /* FUNCTIONS */
      jQuery.fn.exists = function(){ return this.length > 0; }

      /* HEADER HEIGHT CALCULATIONS */
      var topMenuOffset, fullMenuHeight, topMenuTriggerFixedheader;

      // Creates the hambuger menu and adds if it's not already present
      function addHamburger() {
        if (!$(".hamburger-wrapper").exists()) {
          hamburgerWrapperEl = null;
          hamburgerMenuEl = null;
          $("#block-google-appliance-ga-block-search-form").after('<div class="hamburger-wrapper"><a href="#" class="hamburger-btn">Menu</a></div>');
          $(".page-header").after('<div class="hamburger-menu"> </div>');
          hamburgerWrapperEl = $(".hamburger-wrapper");
          hamburgerMenuEl = $(".hamburger-menu");
        }
      }

      // Allows menus with children to be toggled once moved from desktop menu to responsive menu
      function addResponsiveToggles() {
        var toggleHTML = null;
        var expandedMenu = null;
        var sectionToggle = null;
        var toggleHTML = '<span class="toggle"></span>';
        var expandedMenu = $('.hamburger-menu ul li.expanded, .in-section-menu ul li.expanded');

        //Reset all the toggles parent function can be run across viewports and toggles add more times than needed
        function resetToggles() {
          $(expandedMenu).removeClass('open'); //Remove any parent menu open flags
          $(expandedMenu).children('ul').hide(); //Close any open menus
          $('.hamburger-menu ul li.expanded span.toggle, .in-section-menu ul li.expanded span.toggle').remove(); //Remove any added toggles
          $('.in-section-menu nav h2 .toggle').removeClass('open').remove();
          $('.in-section-menu nav h2').siblings('ul').hide();
        }
        resetToggles();

        // Append this to items that have the .expanded class, this tells us that have list children
        $(expandedMenu).append(toggleHTML);

        // Append this to the menu but we need check if it had any list children first.
        if ($('.in-section-menu nav ul').exists()) {
          $('.in-section-menu nav h2').append(toggleHTML);
          $('.in-section-menu nav h2 .toggle').click(function() {
            var sectionToggle = $(this);
            if (!$(this).hasClass('open')) {
              $(sectionToggle).parent().siblings('ul').slideDown(350);
              $(sectionToggle).toggleClass('open');
            } else {
              $(sectionToggle).parent().siblings('ul').slideUp(350, function() {
                $(sectionToggle).toggleClass('open');
              });
            }
          });
        }
        //Items inside the hamburger / in section menu
        $('.hamburger-menu ul li.expanded .toggle, .in-section-menu ul li.expanded .toggle').click(function() {
          var hamburger = $(this);
          if (!$(this).hasClass('open')) {
            $(hamburger).siblings('ul').slideDown(350);
            $(hamburger).toggleClass('open');
            $(hamburger).parent().toggleClass('open');
          } else {
            $(hamburger).siblings('ul').slideUp(350, function() {
              $(hamburger).toggleClass('open');
              $(hamburger).parent().toggleClass('open');
            });
          }
        });
      }


      // Allows the Search box to be shortened to an icon and then toggled
      function toggleSearchSize() {
        // Hide the text input
        $('#block-google-appliance-ga-block-search-form .form-item-search-keys .form-text').hide();
        // Add a class
        $('#block-google-appliance-ga-block-search-form', context).addClass('toggle');
        $('#block-google-appliance-ga-block-search-form .form-submit').click(function(e){
          // If the button icon is clicked and the text input is missing add it.
          if($('#block-google-appliance-ga-block-search-form', context).hasClass('toggle')) {
            e.preventDefault();
            $('#block-google-appliance-ga-block-search-form .form-item-search-keys .form-text').fadeIn(100).focus();
            $('#block-google-appliance-ga-block-search-form', context).removeClass('toggle');
          }
          // If the search input is clicked and we're in responsive mode and the search is empty don't search
          if ($('#block-google-appliance-ga-block-search-form .form-item-search-keys .form-text').val() == '' && $('body').hasClass('responsive-mode') ) {
            e.preventDefault();
          }
        });
        // If you focusout of the search item hide the search again.
        $('#block-google-appliance-ga-block-search-form .form-item-search-keys .form-text').focusout(function() {
          if ($('body', context).hasClass('sticky-header-collapsed') || $('body', context).hasClass('responsive-mode')) {
            $(this).fadeOut(300, function(){
              $('#block-google-appliance-ga-block-search-form').addClass('toggle');
            });
          }
        });
      }

      //STICKY HEADER: Reduces the header size depending on scroll position and then animates.
      function stickyHeader() {
        var topMenuOffset = $('#site-header-top').offset().top;
        var fullMenuHeight = $('header.page-header').data('height'); // fullMenuHeight = Header not fixed
        var topMenuTriggerFixed = topMenuOffset + $('#site-header-top').data('height');

        $(window).scroll(throttle(function() {
          var isEligibleForSticky = $('body').hasClass('desktop') && !$('body').hasClass('flyout-open') && !$('body').hasClass('responsive-mode')

          if ($(document).scrollTop() >= topMenuTriggerFixed && isEligibleForSticky) {
            if (!$('body', context).hasClass('sticky-header-collapsed')) {
              // Make search button
              $('.logo').hide();
              $('#site-header-bottom').hide().fadeIn(450);

              // Add classes
              $('body', context).addClass('sticky-header-collapsed').addClass('is-scrolled');
              $('.space-header').css('paddingTop', fullMenuHeight);
            }
            toggleSearchSize();
          } else  {
            // Animate logo exit
            $('body', context).removeClass('sticky-header-collapsed');
            $('body', context).removeClass('is-scrolled');
            $('.logo').show();
            
            if (!$('body').hasClass('sticky-header-collapsed') && $('body').hasClass('desktop')) {
              $('#block-google-appliance-ga-block-search-form .form-item-search-keys .form-text').show();
              $('#block-google-appliance-ga-block-search-form').removeClass('toggle');
            }
            
            $('.space-header').css('paddingTop', 0);
          }
        },100));
      }

      /*
       * carouFredSel: Responsive carousel 6.2.1
       * See http://dev7studios.com/plugins/caroufredsel/
       */

      /**
       * Initiates the homepage main carousel
       */

      function mainCarousel() {
        if (!$("body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items", context).length > 0) { return; }
        var carousel = $("body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items", context);
        carousel.carouFredSel({
          responsive: true,
          width: "100%",
          height: 'variable',
          items: {
            visible: 1,
            width: 1600,
            height: 'variable'
          },
          auto: false,
          prev: "body.node-type-oxweb-homepage .field-name-main-carousel-pagers .carousel-prev-btn",
          next: "body.node-type-oxweb-homepage .field-name-main-carousel-pagers .carousel-next-btn",
          pagination: {
            container: "body.node-type-oxweb-homepage .field-name-main-carousel-pagers .carousel-pager",
            keys: true
          },
          // Make sure the carousel starts with a height. Pos:abs causes height issues.
          onCreate: function () {
            if (!$("html").hasClass("ie8")) {
              carousel.parent().add(carousel).height(550).trigger('resize');
            }
            //Update the size of the carousel items after timeout
            // setTimeout(function(){
            //   carousel.trigger('updateSizes');
            // },250);
          }
        });

        /** Control swipe outside of the carousel call. - because CarFS issue with touch taps on links. **/
        $(carousel).swipe({
          excludedElements: "button, input, select, textarea, .noSwipe, .toggle-icon",
          swipeLeft: function() {
            $(this).trigger('next');
          },
          swipeRight: function() {
            $(this).trigger('prev');
          },
          tap: function(event, target) {
            window.open($(target).closest('a').attr('href'), '_self');
          }
        });
      }

      /**
       * Initiates the homepage discover carousel with passed height
       */

      function discoverCarousel() {
        if (!$("body.node-type-oxweb-homepage .field-name-field-discover-carousel .field-items", context).length > 0) { return; }
        var discoverCarouselEl = $('body.node-type-oxweb-homepage .field-name-field-discover-carousel .field-items', context);
        discoverCarouselEl.carouFredSel({
            responsive  : true,
            width: '100%',
            scroll: {
              items: '-2'
            },
            items   : {
              width   : 305,
              height  : 370,
              visible   : {
                min     : 1,
                max     : 5
              }
            },
            auto: false,
            next: {
              button: "body.node-type-oxweb-homepage .field-name-discover-carousel-pagers .carousel-next-btn",
            },
            prev: {
              button: "body.node-type-oxweb-homepage .field-name-discover-carousel-pagers .carousel-prev-btn",
            }
        });
        /** Control swipe outside of the carousel call. - because CarFS issue with touch taps on links. **/
        $(discoverCarouselEl).swipe({
          excludedElements: "button, input, select, textarea, .noSwipe, .toggle-icon",
          swipeLeft: function() {
            $(this).trigger('next');
          },
          swipeRight: function() {
            $(this).trigger('prev');
          },
          tap: function(event, target) {
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1;
            var isiOS = ua.match(/iPad/i) || ua.match(/iPhone/i);

            //work out iOS version. If it's 8.3 or above need special handling of tap event.
            // see http://stackoverflow.com/questions/7575504/detecting-ios-version-on-a-web-page
            var iOSgte83 = false;
            if (isiOS) {
              uaindex = ua.indexOf( 'os ' );
              iOSVersion = ua.substr( uaindex + 3, 3 ).replace( '_', '.' );
              if (iOSVersion >= 8.3) {
                iOSgte83 = true;
              }
            }

            if(isAndroid || iOSgte83) {
              window.open($(target).closest('a').attr('href'), '_self');
            }
          }
        });
      }

      /**
       * Move Page feedback block to below sidebar on no-sidebar screens
       */

      function movePageFeedback(isMove) {
        var pageFeedback = $('#main-content .page-feedback', context);
        var pageFeedbackMoved = $('#post-content .page-feedback', context);
        var moveFrom = $('#main-content', context);
        var moveTo = $('#post-content', context);

        // move it
        if (pageFeedback.length && isMove && moveTo.length) {
          pageFeedback.appendTo(moveTo);
        }
        // move it back
        else if (pageFeedbackMoved.length && !($('body', context).hasClass('mobiles') ||  $('body', context).hasClass('portrait-tablet'))){
          pageFeedbackMoved.appendTo(moveFrom);
        }
      }

      /**
       * Ensures the main content height is longer than sidebars with position absolute
       */

      var mainContentHeight = function() {
        var sidebarHeight = $('.row.section-index-sidebar-wrapper').height();
        var pageContentMainEl = $('#page-content-main');
        var self = this;

        function adjustMainContentHeight(pageContentHeight) {
          if (pageContentHeight < sidebarHeight) {
            $(pageContentMainEl).height(sidebarHeight);
            //Set state
            $(pageContentMainEl).addClass("height-altered");
          }
        }
        // Runs on page load
        $(window).load(function() {
          var pageContentHeight = $('#page-content-main').height();
          adjustMainContentHeight(pageContentHeight);
        });
        // Runs on resize
        $(window).on('resize', throttle(function (event) {
          sidebarHeight = $('.row.section-index-sidebar-wrapper').height();
          pageContentHeight = $('#page-content-main').height();
          adjustMainContentHeight(pageContentHeight);
        }, 400));

        return self;
      }

      function removeSidebarHeight() {
        $(".height-altered").height("auto");
        $(".height-altered").removeClass("height-altered");
      }

      /**
       * Initiates the Section Index carousel with passed height
       */


      function sectionIndexCarousel() {
        if (!$("body.node-type-section-index .field-name-field-section-primary .field-items", context).length > 0) {
          $('body.node-type-section-index .field-name-section-index-carousel').css('display', 'none');
          return;
        }
        $("body.node-type-section-index .field-name-field-section-primary .field-items", context).carouFredSel({
          responsive: true,
          width: "100%",
          height: 'variable',
          items: {
            visible: 1,
            width: 1600,
            height: 'variable'
          },
          auto: false,
          prev: "body.node-type-section-index .field-name-section-index-carousel .carousel-prev-btn",
          next: "body.node-type-section-index .field-name-section-index-carousel .carousel-next-btn",
          pagination: {
            container: "body.node-type-section-index .field-name-section-index-carousel .carousel-pager",
            keys: true
          },
          swipe: true,
        });
        /** Control swipe outside of the carousel call. - because CarFS issue with touch taps on links. **/
        $("body.node-type-section-index .field-name-field-section-primary .field-items", context).swipe({
          excludedElements: "button, input, select, textarea, .noSwipe, .toggle-icon",
          swipeLeft: function() {
            $(this).trigger('next');
          },
          swipeRight: function() {
            $(this).trigger('prev');
          },
          tap: function(event, target) {
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1;
            if(isAndroid) {
              window.open($(target).closest('a').attr('href'), '_self');
            }
          }
        });
        // Move carousel controls inside primary highlight field to correct height issue
        $('.field-name-section-index-carousel').appendTo('.field-name-field-section-primary');
      }

      /* RUN REGARDLESS OF MEDIA QUERIES */

      // Init the main carousel
      // No longer init the discover carousel here. Because the destroy method
      // doesn't work properly in ios 8.3, we just initiate it in the media query where we need it.
      //$(".field-name-field-main-carousel .field-items .field-item:not(:first-child)").hide(); //Hide for vanity while page loads
      var pagers = $(".field-name-main-carousel-pagers.field-type-ds").clone().hide();
      var mainCarouselEl = $("body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items", context);
      $(mainCarouselEl).before(pagers);
      $("body.node-type-oxweb-homepage .field-name-field-main-carousel + .field-name-main-carousel-pagers.field-type-ds").remove();
      mainCarousel();
      sectionIndexCarousel();
      //$(".field-name-field-main-carousel .field-items .field-item:not(:first-child)").show(); //When page loads show rest of items
      /* Window.load is suuuper important here */
      $(window).load(function(){
        // Update the sizes when the images are loaded
        $("body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items", context).trigger('updateSizes');
        $("body.node-type-section-index .field-name-field-section-primary .field-items", context).trigger('updateSizes');
        $(pagers).delay(200).fadeIn(450);
      });
      $("body.node-type-oxweb-homepage .field-name-field-main-carousel").css("position","relative");


      if ($('body').hasClass('primary-highlight-full-width')) {
        sectionIndexCarousel('34.4%'); // Aspect ratio of 1600 x 550 image
      } else {
        sectionIndexCarousel('45%'); // Aspect ratio of 1200 x 575 image
      }

      // We need if this to find out if it's an inner menu or not so we check for the root level menu
      if ($(".homepage-oxweb-secondary-menu").exists()) {
        $("body").addClass("root-menus");
      }

      //If touch is elsewhere close the main nav drop downs
      function tabletDropdownHoverFix () {
        $('body').bind('touchstart', function (e) {
          // Where you've clicked
          var hoverTrigger = $(e.target);
          var dropdownParent = $(e.target).parents('nav');
          var isDropdown = $(dropdownParent).hasClass('oxweb-secondary-menu-block');
          // Make sure you're touching the correct menu item before we prevent the link working
          if (isDropdown && !$(hoverTrigger).parent().hasClass('hovered') && $(hoverTrigger).parent('li').hasClass('expanded')) {
            $('.oxweb-secondary-menu-block .hovered').removeClass('hovered');
            $(hoverTrigger).parent().addClass('hovered');
            //console.log($(hoverTrigger).parent('li.expanded').hasClass('hovered'));
            e.preventDefault();
          } else if (isDropdown && $(hoverTrigger).parent().hasClass('hovered') || isDropdown && !$(hoverTrigger).parent('li.expanded').hasClass('hovered')) {
            // Trigger a click!
            $(hoverTrigger).trigger('click');
          } else {
            //If you've touched somewhere else on the body remove the hover styles
            //console.log("I added the remove-hover class");
            $('.oxweb-secondary-menu-block .hovered').removeClass('hovered');
          }
        });
      };

      /*
       * VIDEO HIGHLIGHTS
       * Replace video highlights with actual video embeds on mobile versions
       */
      function videoHighlightMobileOn(context) {

        //console.log('videoHighlightMobileOn');
        var vHighlights = $('body.node-type-section-index .node-video-highlight', context);
        if (vHighlights.length > 0) {
          $(vHighlights).each( function(){
            var vLinkBlock = $(this).find('a.link-block');
            var vHighlightLink = $(vLinkBlock).attr('href');

            var videoMobile = $('<div class="js-mobile-video-highlight"></div>').insertBefore(vLinkBlock);

            // Get video via ajax and insert before link block
            $('<div class="video-iframe"></div>').load(vHighlightLink + ' .node-video-highlight iframe', function(){
              // Stop autoplay
              var iframeSrc = $('iframe', this).attr('src');
              $('iframe', this).attr('src', iframeSrc.replace('autoplay=1', 'autoplay=0'));
              // Resize to full width
              $('.node-video-highlight', context).fitVids();
            }).appendTo(videoMobile);

            // Get video meta and insert before link block
            $('<div class="video-group-description"></div>').load(vHighlightLink + ' .node-video-highlight .group-description', function(){
              // Change h1 to h2
              $('h1', this).replaceWith('<h2>'+$('h1', this).text()+'</h2>');
              // Hide the highlight
              $(vLinkBlock).hide();
            }).appendTo(videoMobile);

          });


        }
      }

      /*
       * VIDEO HIGHLIGHTS
       * Undo videoHighlightMobileOn
       */
      function videoHighlightMobileOff(context) {
        //console.log('videoHighlightMobileOff');
        var vHighlights = $('body.node-type-section-index .node-video-highlight', context);
        if (vHighlights.length > 0) {
          $(vHighlights).each( function(){
            var vLinkBlock = $(this).find('a.link-block');
            var videoEmbed = $(this).find('.js-mobile-video-highlight');
            if ($(videoEmbed).length > 0) {
              $(videoEmbed).remove();
              $(vLinkBlock).show();
            }
          });
        }
      }

      /**
       * SlideshoPro fixes
       * SlideshowPro embed inlines width/height which does not play nicely
       * with responsive
       */
      function fixSlideshowPro(context) {
        var $el = $('div.container-slideshowpro', context);
        $el.css('height', $el.width() / 1.5);
      }

      /* MEDIA QUERIES! */
      /* $DESKTOP */
      qry1 = Harvey.attach('only screen and (min-width: 1271px)', {
        setup: function() {

          //return console.log('SETUP - desktop', this.condition);
        },
        on: function() {
          $("body").addClass("desktop");
          $("body").removeClass("responsive-mode pre-tablet tablet portrait-tablet mobiles");
          // Remove the hamburgers
          $(hamburgerWrapperEl).remove();
          $(hamburgerMenuEl).remove();

          // Check height of the sidebar vs the main content
          mainContentHeight();

          if (!$('body').hasClass('sticky-header-collapsed')) {
            // The search only needs to pop open on the desktop and not fixed.
            $('#block-google-appliance-ga-block-search-form .form-item-search-keys .form-text').show();
          }

          // //Update carousel sizes
          // mainCarousel();
          // $('body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items', context).trigger('updateSizes');

          topMenuOffset = $('#site-header-top').offset().top;
          topMenuTriggerFixed = topMenuOffset + $('#site-header-top').height();
          thisMenuHeight = $('.field-name-field-listing-category').height();
          thisMenuHeightFixed = thisMenuHeight + parseInt($('.field-name-field-listing-category').css('padding-top'));

          // Add the sticky header code
          stickyHeader();

          //console.log('DESKTOP');

        },
        off: function() {
          //console.log('OFF - Desktop');
        }
      });

      /* $PRE TABLET SMOOTHING */
      qry2 = Harvey.attach('only screen and (max-width: 1270px)', {
        setup: function() {
          //console.log('SETUP - Pre tablet', this.condition);
        },
        on: function() {
          $("body").addClass("responsive-mode pre-tablet");
          $("body").removeClass("responsive-mode desktop tablet portrait-tablet mobiles");
          // Add the menu containing HTML
          addHamburger();
          // Make the search just the icon
          toggleSearchSize();

          // Check height of the sidebar vs the main content
          mainContentHeight();

          //Add the colleges and divisions links
          $(collegesMenu).appendTo(hamburgerMenuEl);
          $(divisionsMenu).appendTo(hamburgerMenuEl);

          //If the role based menu isn't on the page then use primary menu
          if ($(roleBasedMenu).exists()) {
            // Add the rolebased menu to the hamburger
            $(hamburgerMenuEl).append(roleBasedMenu);
          } else {
            // Add the primary menu to the hamburger
            $(hamburgerMenuEl).append(primaryMenu);
          }

          //Update carousel sizes
          $('body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items', context).trigger('updateSizes');

          //Add an odd class to the odd role based items
          $(".homepage-role-base-menu ul li:nth-child(odd)").addClass("odd");

          //Handle clicks to close the open burger menu if not on the menu it's self or the btn.
          $("body").on('touchend click',function(e) {
            if(!$(e.target).is(hamburgerMenuEl) && !$(e.target).parents(hamburgerMenuEl).is(hamburgerMenuEl) && !$(e.target).is(".hamburger-btn")) {
              $(hamburgerMenuEl).slideUp(350);
              if($(hamburgerWrapperEl).hasClass("menu-open")) {
                e.preventDefault();
                $(hamburgerWrapperEl).removeClass("menu-open");
              }
            }
          });

          //Toggle opening the main menu
          $(".hamburger-btn").click(function(event) {
            var inSectionMenuEl = $(".in-section-menu");
            event.preventDefault();
            $(hamburgerWrapperEl).toggleClass("menu-open");
            if ($(hamburgerWrapperEl).hasClass("menu-open")) {
              $(hamburgerMenuEl).slideDown(350);
            } else {
              $(hamburgerMenuEl).slideUp(350);
            }

          });

          //Add toggles to the hamburger menu items
          addResponsiveToggles();

          //console.log('pre-tablet');

        },
        off: function() {
          //console.log('OFF - Pre tablet');
        }
      });

      

      /* $TABLETS */
      /* We have the min width media query here otherwise iPad Portrait runs both tablet modes */
      qry3 = Harvey.attach('only screen and (min-width:871px) and (max-width: 1024px)', {
        setup: function() {
          //console.log('SETUP - Tablets');
          //Update carousel sizes
        },
        on: function() {
          $("body").removeClass("portrait-tablet desktop pre-tablet mobiles");
          $("body").addClass("responsive-mode tablet");
          addHamburger();

          // Check height of the sidebar vs the main content
          mainContentHeight();

          //Update carousel sizes - TODO: JM - Remove
          // $('body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items', context).trigger('destroy');
          // mainCarousel();

          tabletDropdownHoverFix();

          //console.log('tablet');
        },
        off: function() {
          $('body.tablet').unbind('touchstart');
          //return console.log('OFF - Tablets', this.condition);
        }
      });


      /* $PORTRAIT TABLETS */
      qry4 = Harvey.attach('only screen and (max-width: 870px)', {
        setup: function() {
          //console.log('SETUP - portrait-tablet');
        },
        on: function() {
          $("body").removeClass("pre-tablet desktop tablet mobiles");
          $("body").addClass("responsive-mode portrait-tablet");
          addHamburger();

          // Move Rate this page to below sidebar
          movePageFeedback(true);

          // Check turn off function mainContentHeight()
          removeSidebarHeight();

          //Add the rest of the menus to the hamburger
          $(hamburgerMenuEl).prepend(homeSecondaryMenu);
          //Add the secondary menu after the menu wrapper
          $(hamburgerMenuEl).after(secondaryMenu);
          $(secondaryMenu).wrap('<div class="in-section-menu" />');
          //Add toggles again now we have the in section menu
          addResponsiveToggles();

          //Recreate the carousel with more height
          sectionIndexCarousel();
          //console.log('portrait tablet');

          //Update carousel sizes - Keep at bottom of code block - TODO: JM - Remove
          //$('body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items', context).trigger('destroy');
          //mainCarousel();

          // Reorder page elements so that main-content comes before left sidebar
          $('.main-content').after($('.content-meta'));
        },
        off: function() {
          // Remove the menus now they're visible.
          $(".in-section-menu").remove();
          $(".hamburger-menu .homepage-oxweb-secondary-menu").remove();
          //console.log('portrait tablet - OFF');

          // Move Rate this page back
          movePageFeedback(false);

          // Reorder page elements to reverse above
          $('.content-meta').after($('.main-content'));
        }
      });




      /* $MOBILES */
      qry5 = Harvey.attach('only screen and (max-width: 500px)', {
        setup: function() {
          //console.log('SETUP - Mobiles');
          //Update the size of the carousel items after timeout
          setTimeout(function(){
            $('body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items', context).trigger('updateSizes');
          },250);
        },
        on: function() {
          $('body').removeClass("portrait-tablet pre-tablet tablet");
          $('body').addClass("responsive-mode mobiles");
          addHamburger();

          // Move Rate this page to below sidebar
          movePageFeedback(true);

          //Update carousel sizes - TODO: JM - Remove
          //$('body.node-type-oxweb-homepage .field-name-field-main-carousel .field-items', context).trigger('destroy');
          // mainCarousel();

          // Video highlights (on section index). Insert video embeds on highlights directly.
          videoHighlightMobileOn(context);

          fixSlideshowPro(context);
          //console.log('mobile');
        },
        off: function() {
          // Reverse video highlights changes
          videoHighlightMobileOff(context);
          //return console.log('OFF - Mobiles', this.condition);

          // Move Rate this page back
          movePageFeedback(false);
        }
      });
      
      /* ANYTHING NOT A MOBILE */
      // extra media query required to make sure the discover carousel is not initiated then destroyed
      // for mobiles, because the destroy method does not work in ios 8.3 - see ticket 630
      qry6 = Harvey.attach('only screen and (min-width: 501px)', {
        setup: function() {
        },
        on: function() {
          discoverCarousel();
        },
        off: function() {
          $('body.node-type-oxweb-homepage .field-name-field-discover-carousel .field-items').trigger('destroy');
        }
      });
    }
  };
}(jQuery));
;/**/
/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null,
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );;/**/
