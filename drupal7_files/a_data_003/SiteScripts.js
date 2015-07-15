var jQueryScriptGlobalOutputted = false;

function initiateJQuery() {

    if (typeof (jQuery) === 'undefined') {

        if (!jQueryScriptGlobalOutputted) {
            //only output the script once..
            jQueryScriptGlobalOutputted = true;

            var scriptTag = document.createElement("script");
            scriptTag.type = "text/javascript";
            scriptTag.src = "/mritems/custom/jquery/jquery-1.8.3.min.js";

            var head = document.getElementsByTagName("head").item(0);
            head.appendChild(scriptTag);

        }

        setTimeout("initiateJQuery()", 50);
    } else {
        // Alfresco JS developed by Mark Boulton Design
        $(function () {

            // begin iframe resize
            // browser compatibility: get method for event
            // addEventListener(FF, Webkit, Opera, IE9+) and attachEvent(IE5-8)
            var myEventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            // create event listener
            var myEventListener = window[myEventMethod];
            // browser compatibility: attach event uses onmessage
            var myEventMessage = myEventMethod == "attachEvent" ? "onmessage" : "message";
            // register callback function on incoming message
            myEventListener(myEventMessage, function (e) {
                // we will get a string (better browser support) and validate
                // if it is an int - set the height of the iframe #my-iframe-id
                if (e.data === parseInt(e.data))
                    try {
                        document.getElementById('my-modal-form').height = e.data + "px";
                    } catch (err) { }
            }, false);

            // end iframe resize

            $(".field-search").keyup(function (event) {
                if (event.which == 13) {
                    $(".button-search").click();
                }
                // Make sure the form isn't submitted
                event.preventDefault();
            });

            $(".button-search").click(function () {
                var ctlSearchText = document.getElementById('search');

                if (ctlSearchText != null) {
                    //window.location.href = '/Services/Search/Default.aspx?P=' + escape(ctlSearchText.value);
                    window.location.href = '/Search/?q=' + escape(ctlSearchText.value);
                }
            });

            $('.preview-full').click(function (e) {

                $(this).prevAll('.preview-text').removeClass('preview-text');

                prevent(e);

            });

            $('#nav-mobile-menu').click(function (e) {

                var body = $('html');

                if (body.hasClass('mobile-menu-open')) body.removeClass('mobile-menu-open');
                else body.addClass('mobile-menu-open');

                prevent(e);

            });

            $('.mobile-drop').click(function (e) {

                var par = $(this).closest('li');

                if (par.hasClass('mobile-drop-open')) par.removeClass('mobile-drop-open');
                else par.addClass('mobile-drop-open');

                prevent(e);

            });

            $('.toggle').click(function (e) {

                var par = $('#' + $(this).attr('rel'));

                $('.toggle-area').removeClass('toggle-on').addClass('toggle-off');

                par.removeClass('toggle-off').addClass('toggle-on');

                prevent(e);

            });

            $(window).resize(function () {
                setTopMenuImage();
            });

            setTopMenuImage();

            try {
                setTimeout(function () {
                    if (document.getElementById('div-gpt-ad-809429194207278781-1')) {
                        if (document.getElementById('div-gpt-ad-809429194207278781-1').offsetHeight > 0) {
                            if (document.getElementById('home-ads-style')) {
                                $("#home-ads-style").removeClass("home-ads-style");
                                $("#home-ads-style").addClass("home-ads-style");
                            }

                            if ($("section.divgptad").length) {
                                $("section.divgptad").removeClass("page-section box-section da-all da-pad ta-all ta-pad");
                                $("section.divgptad").addClass("page-section box-section da-all da-pad ta-all ta-pad");
                            }
                        }
                    }
                }, 500);
            }
            catch (ex) {
            }

        });
    }
}

prevent = function (e) {

    if (e.preventDefault) e.preventDefault();
    else event.returnValue = false;

};

initiateJQuery();


function setTopMenuImage() {

    if ($(".VideoLogo-png").css("text-align") == "justify") {
        $(".VideoLogo-png").attr("src", "/mritems/images/site/VideoLogoWhite.png");
    }
    else {
        $(".VideoLogo-png").attr("src", "/mritems/images/site/VideoLogo.png");
    }

}

function toLocaleDateTime(gmtDateTime) {
    var dt = gmtDateTime;
    var tvDate = new Date(dt);
    //tvDate.toLocaleString();

  try {
    var time = tvDate.toLocaleTimeString();
    var hrs = Number(time.match(/^(\d+)/)[1]);
    var mnts = Number(time.match(/:(\d+)/)[1]);
    var format = time.match(/\s(.*)$/)[1];
    if (format == "PM" && hrs < 12) hrs = hrs + 12;
    if (format == "AM" && hrs == 12) hrs = hrs - 12;
    var hours = hrs.toString();
    var minutes = mnts.toString();
    if (hrs < 10) hours = "0" + hours;
    if (mnts < 10) minutes = "0" + minutes;

    return hours + ":" + minutes;
  }
  catch (err) {
    return '';
  }
}



function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}


function RenderYTPagesVideo(videoId, containerId) {
    if (videoId && containerId) {
        var yt_url = 'http://www.youtube.com/embed/';
        var ifrm = document.createElement('iframe');
        var ifrmName = 'ifrm';
        videoId = videoId.replace(/^\s*([\S\s]*?)\s*$/, '$1');
        ifrm.setAttribute('id', ifrmName.concat(videoId));

        containerId = containerId.replace(/^\s*([\S\s]*?)\s*$/, '$1');
        var el = document.getElementById(containerId);
        el.parentNode.insertBefore(ifrm, el);

        ifrm.setAttribute('src', yt_url.concat(videoId));
        ifrm.setAttribute('frameborder', 0);
        ifrm.setAttribute('width', 560);
        ifrm.setAttribute('height', 315);
    }
}


function RenderJWPostingVideo(movieId, width, height, dvId) {
    if (width == 0) width = 680;
    if (height == 0) height = 410;

    try {
        jwplayer(dvId).setup({
            'flashplayer': '/AJEPlayer/v5_7/player.swf',
            'file': 'http://www.youtube.com/watch?v=' + movieId,
            'provider': 'youtube',
            'controlbar': 'bottom',
            'width': '100%',
            'aspectratio': '4:3',
            'skin': '/AJEPlayer/skins/modieus.zip',
            'stretching': 'fill',
            'autostart': 'false',
            'abouttext': 'Aljazeera',
            'aboutlink': 'http://www.aljazeera.com/aboutus',
            'plugins': {
                'viral-2': {
                    'onpause': 'false',
                    'callout': 'none',
                    'allowmenu': 'false',
                    'functions': 'none'
                }
            }

        });
    } catch (e) { }

}

function appendScript(pathToScript) {
    var headTag = document.getElementsByTagName("head")[0];
    var scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.src = pathToScript;
    headTag.appendChild(scriptTag);
}

function removeScript(pathToScript) {
    var headTag = document.getElementsByTagName("head")[0];
    var scriptTags = head.getElementsByTagName("script");
    for (var i = 0; i < scriptTags.length; i++) {
        var scriptTag = scriptTags[i];
        if (scriptTag.src == pathToScript) {
            headTag.removeChild(scriptTag);
            break;
        }
    }
}

function appendMetaTag(metaProperty, metaContent) {
    var headTag = document.getElementsByTagName("head")[0];
    var metaTag = document.createElement("meta");
    metaTag.property = metaProperty;
    metaTag.content = metaContent;
    headTag.appendChild(metaTag);
}

/*
function submitsearch() {
var ctlSearchText = document.getElementById('search');

if (ctlSearchText != null) {
//window.location.href = '/Services/Search/Default.aspx?P=' + escape(ctlSearchText.value);
window.location.href = '/Search/?q=' + escape(ctlSearchText.value);
}
}
*/

function Sys_ShowAjaxZone(element, commandText) {
  
 
    var oryxContext = $('#oryxcontext').val();
    var cmdText = commandText;
    var pageID = $('#oryxcontext').attr("data-postingguid");  	
  
    var myURL = '/portal/handlers/HTMLParser.ashx?cmd=ajax&cmdtext=' + cmdText;

    $.ajax(
  {
      type: "GET",
      url: myURL,
      data: { oryxcontext: oryxContext },
      async: true,
      cache: true,
      success: function (data) {

          $('#' + element).replaceWith(data)

      },
      error: function (response, textStatus, errorThrown) {

          $('#' + element).replaceWith("Ajax Error : " + response.responseText)

      }
  });

}


function Sys_ShowMore(element) {

    var oryxContext = $('#oryxcontext').val();
    var cmdText = $(element).attr("cmdtext");
    var pageID = $('#oryxcontext').attr("data-postingguid");
    var myURL = '/portal/handlers/HTMLParser.ashx?cmd=ajax&cmdtext=' + cmdText + '&pageid=' + pageID;
	var loader=$("<img src='/assets/images/loading_icon.gif' class='showmorebutton' style='background-color:transparent' />")
 	$(element).hide();
	$(loader).insertAfter(element);
	
    $.ajax({
        type: "POST",
        url: myURL,
        data: { oryxcontext: oryxContext },
        async: true,
        cache: true,
        success: function (data) {
		
		$(loader).remove();
        $(element).replaceWith(data)
		$(element).show();
		
        },
        error: function (response, textStatus, errorThrown) {
			$(loader).remove();
            $(element).replaceWith("<!--Ajax Error : " + response.responseText+" -->")
        }
    });
}



function genclassicview(Top, Caption, Link) {
    $('.classicviewt').append('<div class="ToggleControl"><div class="BetaWord">BETA</div><div class="m-hide ToggleButton"><a href="' + Link + '">' + Caption + '</a></div></div>');
    scrollHandler(Top);
}


function scrollHandler(Top) {
    var $el = $('.ToggleControl');
    var $window = $(window);

    $window.bind("scroll resize", function () {
        $el.css({
            top: Top + 'px',
            bottom: "auto",
            position: "fixed"
        });
    }).scroll();

}



//Begin  Showing Now and Next
var getJSON = function (url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
        var status;
        var data;
        // http://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};

function ShowingNowAndNext() {
    var url = '/addons/getData.ashx?command=epgnow';
    getJSON(url, function (response) {
        if (response) {
            showing = response.EPG.Now.Program;
            var showingNow = document.getElementById('showing-on-now');
            showingNow.href = response.EPG.Now.URL;
            showingNow.innerHTML = (showing.indexOf(':') > 0) ? showing.substr(0, showing.indexOf(':')).toLowerCase() : showing.toLowerCase();

            showing = response.EPG.Next.Program;
            var showingNext = document.getElementById('showing-on-next');
            showingNext.href = response.EPG.Next.URL;
            showingNext.innerHTML = (showing.indexOf(':') > 0) ? showing.substr(0, showing.indexOf(':')).toLowerCase() : showing.toLowerCase();
            showingNext.innerHTML += '<span class="heading-section remaining">[In ' + ((response.EPG.Next.Timeleft != 0) ? response.EPG.Next.Timeleft + " min." : "next min.") + ']</span>';

            var tLeft = document.getElementById('time-left');
            //tLeft.innerHTML = '<a style=\"color: #793b01;\" href=\"' + response.EPG.EPGUrl + '\">In ' + ((response.EPG.Next.Timeleft != 0) ? response.EPG.Next.Timeleft + " minutes" : "next minute") + '</a>';
            tLeft.innerHTML = '<a style=\"color: #793b01;\" href=\"' + response.EPG.EPGUrl + '\">TV Schedule</a>';
        }
    });

    setTimeout(function () {
        ShowingNowAndNext();
    }, 60000);
}

//End Showing Now and Next



function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


/////////////////////////////////////////
var ccc = readCookie('AJEUserLocation'); //Client Country Code
var crn = readCookie('AJEUserRegion');  //Client Region Name
var ccn = readCookie('AJEUserCity');  //Client City Name
var ccl = readCookie('AJEUserCountry');  //Client Country Name

function geoip(data) {

    crn = data.geolocation_data.region_name;
    ccc = data.geolocation_data.country_code_iso3166alpha2;
    ccn = data.geolocation_data.city;
    ccl = data.geolocation_data.country_name;
  
    createCookie('AJEUserLocation', ccc, 2);
    createCookie('AJEUserRegion', crn, 2);
    createCookie('AJEUserCity', ccn, 2);
	createCookie('AJEUserCountry', ccl, 2);
}


function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            clearTimeout(xmlHttpTimeout);
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            }
            else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, false);
    xhr.send();
    // Timeout to abort in 5 seconds
    var xmlHttpTimeout = setTimeout(ajaxTimeout, 5000);
    function ajaxTimeout() {
        xhr.abort();
        console.log("Request timed out");
    }
}

if (!ccc) {
    /* var _0x39fa = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x56\x34\x39\x36\x33\x50\x58\x37\x4B\x59\x54\x56\x57\x44\x36\x32\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x31\x30\x58"]; var url = _0x39fa[0]; */
    /* var _0x57e4 = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x36\x58"]; var url = _0x57e4[0]; */
    /* var _0xa3d3 = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x38\x58"];var url=_0xa3d3[0]; */
	var _0x2b35=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x61\x70\x69\x67\x75\x72\x75\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x38\x58"];var url=_0x2b35[0];
    loadJSON(_0x2b35, function (data) { geoip(data); });  
}
////////////////////////////////////////

function getMetaContent(mn) {
    var metainfo;
    var metas = document.getElementsByTagName('meta');
    for (var x = 0, y = metas.length; x < y; x++) {
        if (metas[x].name.toLowerCase() == mn) {
            metainfo = metas[x];
        }
    }
    return metainfo.content;
}

//To get meta tag content value by name
function getMetaContentByName(mName) {
    var metaTags = document.getElementsByTagName("meta");

    var mNameContent;
    for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute("name") == mName) {
            mNameContent = metaTags[i].getAttribute("content");
            break;
        }
    }

    return mNameContent;
}

//To get meta tag content value by property
function getMetaContentByProperty(mProperty) {
    var metaTags = document.getElementsByTagName("meta");

    var mPropertyContent;
    for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute("property") == mProperty) {
            mPropertyContent = metaTags[i].getAttribute("content");
            break;
        }
    }

    return mPropertyContent;
}


// called from to chartbeat section get topics from article.
function getArticleTopics() {
    var pageTopics = '';

    try {
        var tCount = $('span#article-topics a').length;
        $('span#article-topics a').each(function (index, element) {
            pageTopics += $(this).data("topicName");

            if (index < tCount - 1) {
                pageTopics += ', ';
            }
        });
    }
    catch (err) {

    }

    return pageTopics;
}

function sendGAEvent(gCat, gAction, gLabel){
try{
   ga('send', 'event', gCat, gAction, gLabel);
   }
catch(ex){
   }
}
