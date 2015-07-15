var shorturl = '';
var shareBarCounter = 0;

(function ($) {

    $.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
        var found = 'found';
        var $this = $(this.selector);
        var $elements = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

        if (!isChild) {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
                window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
            ;
        }
        else if (shouldRunHandlerOnce && $elements.length) {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }

        return $this;
    }

}(jQuery));

function changePosition(obj) {

    $(document).bind("DOMNodeInserted", function () {
        $('.gig-simpleShareUI').css('visibility', 'hidden');
        $('.gig-simpleShareUI').css('left', $('#' + obj).offset().left.toString() + 'px');
        $('.gig-simpleShareUI').css('top', ($('#' + obj).offset().top + 32).toString() + 'px');
    });


    $('.gig-simpleShareUI').css('visibility', 'hidden');
    $('.gig-simpleShareUI').waitUntilExists(function () {
        $('.gig-simpleShareUI').css('visibility', 'hidden');
        $('.gig-simpleShareUI').css('left', $('#' + obj).offset().left.toString() + 'px');
        $('.gig-simpleShareUI').css('top', ($('#' + obj).offset().top + 32).toString() + 'px');
        $('.gig-simpleShareUI').css('visibility', 'visible');

        $(".gig-simpleShareUI-buttonText").on('mouseover', function () {
            $(this).css('color', 'black');
            $(this).css('opacity', '1');
        });

        $(".gig-simpleShareUI-button-inner").on('mouseover', function () {
            $(this).css('color', 'black');
            $(this).css('opacity', '1');
        });
        $(".gig-simpleShareUI-button").on('mouseover', function () {
            $(this).css('color', 'black');
            $(this).css('opacity', '1');
        });

        $(".gig-simpleShareUI-buttonText").on('mouseout', function () {
            $(this).css('color', 'inherit');
            $(this).css('opacity', '1');
        });

        $(".gig-simpleShareUI-button-inner").on('mouseout', function () {
            $(this).css('color', 'inherit');
            $(this).css('opacity', '1');
        });
        $(".gig-simpleShareUI-button").on('mouseout', function () {
            $(this).css('color', 'inherit');
            $(this).css('opacity', '1');
        });

    });
}

function openFeedbackWindow(guid) {
    console.log(guid);
    return '/Forms/SendFeedback.aspx?guid=' + $("meta[name='guid']").attr('content').toString();
}
function generateBanar(divId, printDivId, feedbackGUID) {
    var div = $('#main-story');
    var width = div.width() - 50;
    var height = div.height() - 50;

    var shortURL = jQuery("meta[name='ShortURL']").attr('content').toString();
    if (shortURL == '')
    {
        shortURL = encodeURIComponent(document.URL);
    }

    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        jQuery('#' + divId).append('<div class="ArticleSocialMediaTopBar"><ul class="SM_Icons"><li><a href="whatsapp://send?text=Al Jazeera : ' + encodeURIComponent(jQuery("meta[property='og:title']").attr('content')) + ' ' + shortURL + '"><img class="Shares" style="cursor:pointer;" onclick="" src="/Assets/images/WhatsApp.png" title="Share via WhatsApp"></img></a></li><li><img class="fbshares" src="/Assets/images/facebook.png" title="Share via Facebook">&nbsp;</li><li  class="Shares fbsharescount"></li><li>&nbsp;<img class="twittershares" src="/Assets/images/twitter.png" title="Share via Twitter">&nbsp;</li><li class="Shares twittersharescount"></li><li><a class="aReddit"><img class="Shares" style="cursor:pointer;" onclick="" src="/Assets/images/Reddit.png" title="Share via Reddit"></img></a></li><li class="Shares redditsharescount"></li><li><img id="ilink' + shareBarCounter.toString() + '" src="/Assets/images/share.png" onclick="gigya.services.socialize.plugins.reactions.instances[\'divShare' + shareBarCounter.toString() + '\'].buttonInstances[\'divShare' + shareBarCounter.toString() + '-reaction0\'].onClick(); changePosition(\'ilink' + shareBarCounter.toString() + '\');" alt="All Social" style="cursor:pointer;"/></span></li></ul></div>');

        $('.aFeedBack' + divId).click(function () {
            $.colorbox({ iframe: true, width: "80%", height: "80%", href: openFeedbackWindow().toString() });
        });
    }
    else {
        jQuery('#' + divId).append('<div class="ArticleSocialMediaTopBar"><ul class="SM_Icons"><li><img class="fbshares" src="/Assets/images/facebook.png" title="Share via Facebook">&nbsp;</li><li  class="Shares fbsharescount"></li><li>&nbsp;<img class="twittershares" src="/Assets/images/twitter.png" title="Share via Twitter">&nbsp;</li><li class="Shares twittersharescount"></li><li><a class="aReddit" ><img class="Shares" style="cursor:pointer;" onclick="" src="/Assets/images/Reddit.png" title="Share via Reddit"></img></a></li><li class="Shares redditsharescount"></li><li><img id="ilink' + shareBarCounter.toString() + '" src="/Assets/images/share.png" onclick="gigya.services.socialize.plugins.reactions.instances[\'divShare' + shareBarCounter.toString() + '\'].buttonInstances[\'divShare' + shareBarCounter.toString() + '-reaction0\'].onClick(); changePosition(\'ilink' + shareBarCounter.toString() + '\');" alt="All Social" style="cursor:pointer;"/></span></li></ul></div>');

        $('.aFeedBack' + divId).click(function () {
            $.colorbox({ iframe: true, width: "800", height: "80%", href: openFeedbackWindow().toString() });
        });
    }


}

function createFBShareLink() {

    var url = 'https://www.facebook.com/sharer/sharer.php?app_id=1547040598874845' +
                        '&u=' + encodeURIComponent(jQuery("meta[property='og:internalurl']").attr('content')) +
                        '&display=popup&ref=plugin';

    return url;
}

function PrintThisPage(bodyarea) {
    var sOption = 'toolbar=yes,location=no,directories=yes,menubar=no,resizable=yes,scrollbars=yes,width=900,height=600,left=100,top=25';

    var sWinHTMLb = document.getElementById(bodyarea);

    var winprint = window.open('', '', sOption);
    winprint.document.open();
    winprint.document.write('<html>');
    winprint.document.write('<head><link href="/Assets/Styles/PrintView.css" rel="stylesheet" /></head>');
    winprint.document.write('<body><form><div class="PrintTopLogo"><div class="PrintLogo"><img src="/mritems/images/site/aljazeeralogo.gif"></div><div class="SiteURL">www.aljazeera.com</div></div><div class="PrintView">');
    winprint.document.write(getElementChildrenAndStyles('#' + bodyarea));
    winprint.document.write('</div></form></body></html>');
    winprint.document.write('<script>window.print();');
    winprint.document.write('</script>');
    winprint.document.close();
    winprint.focus();
}

function getElementChildrenAndStyles(selector) {
    var html = $(selector)[0].outerHTML;

    selector = selector.split(",").map(function (subselector) {
        return subselector + "," + subselector + " *";
    }).join(",");
    elts = $(selector);

    var rulesUsed = [];
    // main part: walking through all declared style rules
    // and checking, whether it is applied to some element
    sheets = document.styleSheets;
    try {
        for (var c = 0; c < sheets.length; c++) {
            var rules = sheets[c].rules || sheets[c].cssRules;
            for (var r = 0; r < rules.length; r++) {
                var selectorText = rules[r].selectorText;
                var matchedElts = $(selectorText);
                for (var i = 0; i < elts.length; i++) {
                    if (matchedElts.index(elts[i]) != -1) {
                        rulesUsed.push(rules[r]); break;
                    }
                }
            }
        }
    }
    catch (exception)
    { }

    var style = rulesUsed.map(function (cssRule) {
        if ((/msie|trident/i).test(navigator.userAgent)) {
            var cssText = cssRule.style.cssText.toLowerCase();
        } else {
            var cssText = cssRule.cssText;
        }
        // some beautifying of css
        return cssText.replace(/(\{|;)\s+/g, "\$1\n  ").replace(/\A\s+}/, "}");
        //                 set indent for css here ^ 
    }).join("\n");
    return "<style>\n" + style + "\n</style>\n\n" + html;
}

function openReddit() {

    var shortURL = jQuery("meta[name='ShortURL']").attr('content').toString();

    if (shortURL == '') {
        shortURL = encodeURIComponent(document.URL);
    }

    $('.aReddit').click(function (event) {
        var width = 600,
    height = 600,
    left = ($(window).width() - width) / 2,
    top = ($(window).height() - height) / 2,
    url = "http://www.reddit.com/submit?url=" + shortURL + '&title=' + encodeURIComponent(jQuery("meta[property='og:title']").attr('content')),
    opts = 'status=1' +
     ',width=' + width +
     ',height=' + height +
     ',top=' + top +
     ',left=' + left;

        window.open(url, 'reddit', opts);

        return false;
    });
}

function get_short_url(long_url) {
    //var rtu = "";
    //jQuery.getJSON(
    //            "http://api.bitly.com/v3/shorten?callback=?",
    //            {
    //                "format": "json",
    //                "apiKey": "R_7086366164334933977c49a6f4e7edaa",
    //                "login": "hossam81",
    //                "longUrl": long_url
    //            },
    //            function (response) {
    //                rtu = response.data.url;
    //                console.log(rtu);
    var shortURL = jQuery("meta[name='ShortURL']").attr('content').toString();
    if (shortURL == '') {
        shortURL = encodeURIComponent(document.URL);
    }
    //shorturl = $("meta[name='ShortURL']").attr('content').toString();
 
 	var twitterAccount = jQuery("meta[property='od:twitter']").attr('content'); 
 	if(twitterAccount == undefined) 
 	{ 
 	twitterAccount = jQuery("meta[property='og:twitter']").attr('content'); 
 	} 
    $('.twittershares').click(function (event) {
        var width = 575,
height = 400,
        left = ($(window).width() - width) / 2,
        top = ($(window).height() - height) / 2,
        url = 'http://www.twitter.com/share?text=' + jQuery("meta[property='og:title']").attr('content') + ' ' + twitterAccount + ' ' + '&url=' + shortURL,
        opts = 'status=1' +
         ',width=' + width +
         ',height=' + height +
         ',top=' + top +
         ',left=' + left;

        window.open(url, 'twitter', opts);

        return false;
    });
    //    }
    //);

    return shorturl;
}


function printResponse(response) {
    if (response.errorCode == 0) {


        $('.fbsharescount').html(response.shareCounts.facebook);
        $('.twittersharescount').html(response.shareCounts.twitter);

        //var params = {
        //    nolog: true,
        //    id: jQuery("meta[property='og:internalurl']").attr('content'),
        //    source: "widget",
        //    userId: "@viewer",
        //    groupId: "@self"
        //};

        //gapi.client.setApiKey('AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ');
        //gapi.client.rpcRequest('pos.plusones.get', 'v1', params).execute(function (resp) {

        //    $('.gplusesharescount').html(resp.result.metadata.globalCounts.count);
        //});

        redditCounter(jQuery("meta[property='og:internalurl']").attr('content'));

    }
}



function postToFeed() {

    // calling the API ...
    var obj = {
        method: 'feed',
        link: jQuery("meta[property='og:internalurl']").attr('content'),
        picture: '',
        name: jQuery("meta[property='og:title']").attr('content'),
        caption: jQuery("meta[property='og:description']").attr('content'),
        redirect_uri: jQuery("meta[property='og:internalurl']").attr('content')
    };

    function callback(response) {
        window.close();
    }


    FB.ui(obj, callback);
}

function generateCommonDivs() {
    $('body').append('<div style="display:none;"><div id="btnEmail2" style="display:none;"></div><div id="btnEmail1" style="display:none;"></div><div id="divShare1" style="display:none;"></div><div id="divShare2" style="display:none;"></div></div>');
}

function genShareBar(divId, feedbackGUID) {

    var printDivId = "main-story";

    shareBarCounter++;

    generateCommonDivs();
    generateBanar(divId, printDivId, feedbackGUID);


    // Define an image media item:
    var image = {
        type: 'image',
        src: jQuery("meta[property='og:image']").attr('content'),
	href: jQuery("meta[property='og:internalurl']").attr('content')
    }

    // Define a UserAction onject
    var ua = new gigya.socialize.UserAction();
    ua.setLinkBack(encodeURIComponent(jQuery("meta[property='og:internalurl']").attr('content')));
    ua.setTitle(jQuery("meta[property='og:title']").attr('content'));
    ua.addMediaItem(image);

    var mDetect = 'auto';
    var layout = 'vertical';

    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mDetect = 'mobile';
        layout = 'horizontal';
    }

    // Define Share Bar plugin's Parameters	
    var shareBarParams = {
        userAction: ua,
        shareButtons:
        [
            { // General Share Button
                provider: 'share',
                tooltip: 'General Share Button',
                userMessage: 'default user message'
            }
        ],
        //        layout : layout,
        //        deviceType: mDetect,
        showEmailButton: false,
        containerID: 'divShare' + shareBarCounter.toString(),
        moreEnabledProviders: 'googleplus, tumblr, Pinterest, linkedin, googlebookmarks,stumbleupon, facebook, twitter, reddit, gmail, baidu, delicious, digg, friendfeed,  messenger,  skyrock, qq, sina, kaixin, renren, vznet, vkontakte, spiceworks, viadeo, nkpl, xing, tuenti, technorati, plaxo, formspring, faves, newsvine, fark, mixx, bit.ly, hatena, misterwong, ask, amazon, box.net, whatsapp, netlog, evernote, aolmail, currenttv, yardbarker, blinklist, diigo, dropjack, segnalo, linkagogo, kaboodle, skimbit, mixi, odnoklassniki, douban',
    }

    // Load Share Bar plugin
    gigya.socialize.showShareBarUI(shareBarParams);

    // Define Share Bar plugin's Parameters	
    var shareBarParamsEmail = {
        userAction: ua,
        shareButtons:
        [
            { // General Share Button
                provider: 'email',
                tooltip: 'Email This',
                deviceType: 'auto'
            }
        ],
        containerID: 'btnEmail' + shareBarCounter.toString() // location of the Share Bar plugin
    }

    // Load Share Bar plugin
    gigya.socialize.showShareBarUI(shareBarParamsEmail);

    gigya.socialize.getProviderShareCounts({ callback: printResponse });


    shorturl = get_short_url($("meta[property='og:internalurl']").attr('content').toString());

    $('.gpluseshares').click(function (event) {
        var width = 575,
            height = 600,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = 'https://plus.google.com/share?url=' + encodeURIComponent(jQuery("meta[property='og:internalurl']").attr('content')),
            opts = 'status=1' +
                     ',width=' + width +
                     ',height=' + height +
                     ',top=' + top +
                     ',left=' + left;

        window.open(url, 'google', opts);

        return false;
    });

    openReddit();

    $('.fbshares').click(function (event) {
        //createFBShareLink();
        var width = 575,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = createFBShareLink().toString(),
            opts = 'status=1' +
                     ',width=' + width +
                     ',height=' + height +
                     ',top=' + top +
                     ',left=' + left;

        window.open(url, 'facebook', opts);

    });
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function redditCounter(url) {
    // Get number of counts from reddit JSON api

    $.get('http://www.reddit.com/api/info.json?count=1&json=?&url=' + encodeURIComponent(url) + '&callback=?',
      function (data) {
          console.log(data);
          count = 0;
          //if (data.children[0] != undefined) {

          var first_child = data.data.children[0];
          console.log(first_child);
	  if (first_child != undefined) {
              $('.redditsharescount').html(first_child.data.score);
          }  
          // }
      });
}

$(document).ready(function () {
    if (getParameterByName('close') == 'true') {
        window.close();
    }

    $(window).resize(function () {

        if ($('#cboxOverlay').is(':visible')) {
            $.colorbox({ iframe: true, width: "80%", height: "80%", href: openFeedbackWindow().toString(), maxWidth: '800px' });
        }

    });

});



