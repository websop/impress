
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

(function() {
var gads = document.createElement('script');
gads.async = true;
gads.type = 'text/javascript';
var useSSL = 'https:' == document.location.protocol;
gads.src = (useSSL ? 'https:' : 'http:') + 
'//www.googletagservices.com/tag/js/gpt.js';
var node = document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(gads, node);
})();



googletag.cmd.push(function() {
googletag.defineSlot('/5287/aljazeera_EN/allpages', [728, 90], 'div-gpt-ad-1430047331144-0').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
googletag.pubads().enableSingleRequest();
googletag.enableServices();
});



googletag.cmd.push(function() {
googletag.defineSlot('/5287/aljazeera_EN/watch_now', [1900, 596], 'div-gpt-ad-1432640475221-1').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
googletag.pubads().enableSingleRequest();
googletag.pubads().enableVideoAds();
googletag.enableServices();
});

