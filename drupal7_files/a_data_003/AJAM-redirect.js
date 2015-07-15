var getUserChoice = false;

//for testing purpose, by default it should be empty
//var browsingLocation = '';
//var parentLocation = '';

var mStates = new Array("Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "DC", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming");


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

function eraseCookie(name) {
    createCookie(name, "", -1);
}


// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri(str) {
    var o = parseUri.options,
              m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
              uri = {},
              i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};


var clientCountryCode = readCookie('AJEUserLocation');
var clientRegionName = readCookie('AJEUserRegion');
var clientCountryName= readCookie('AJEUserCountry');
var clientCityName= readCookie('AJEUserCity');

function geoip(data) {

    clientRegionName = data.geolocation_data.region_name;
    clientCountryCode = data.geolocation_data.country_code_iso3166alpha2;
	clientCountryName = data.geolocation_data.country_name;
  	clientCityName = data.geolocation_data.city;
  
    createCookie('AJEUserLocation', clientCountryCode, 2);
    createCookie('AJEUserRegion', clientRegionName, 2);
  	createCookie('AJEUserCity', clientCityName, 2);
	createCookie('AJEUserCountry', clientCountryName, 2);
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

if (!clientCountryCode) {
    /* var _0x39fa = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x56\x34\x39\x36\x33\x50\x58\x37\x4B\x59\x54\x56\x57\x44\x36\x32\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x31\x30\x58"]; var url = _0x39fa[0]; */
    /* var _0x57e4 = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x36\x58"]; var url = _0x57e4[0]; */
    /* var _0xa3d3 = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x38\x58"];var url=_0xa3d3[0]; */
	var _0x2b35=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x61\x70\x69\x67\x75\x72\x75\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x38\x58"];var url=_0x2b35[0];
   loadJSON(_0x2b35, function (data) { geoip(data); });  
}



if ((clientCountryCode == "US") && (mStates.indexOf(clientRegionName) > -1)) {

    var doRedirect = true;

    var lockRedirect = readCookie('AJERedirectLock');
    var lockNoRedirect = readCookie('AJENoRedirectLock');

    var referrerURL = document.referrer;
    var redirectLocation = "http://america.aljazeera.com?utm_source=aje&utm_medium=redirect";

    parseUri.options.strictMode = true;

    var referrerHostName = parseUri(referrerURL).host.toLowerCase();

    //No Redirection if AJERedirectLock is set to 1
    if (!lockRedirect) {
        //When the referrer value is "america.aljazeera.com" we need to offer user to make www.aljazeera.com as permanent choice of redirect
        if (referrerHostName == "america.aljazeera.com") {
            getUserChoice = true;
            doRedirect = false;
        }

        //If the referrer value is www.aljazeera.com or america.aljazeera.com then user should not be redirected to AJAM
        //america.aljazeera.com is checked in the above condition...
        if (referrerHostName == "aljazeera.com" || referrerHostName == "www.aljazeera.com" || referrerHostName == "prelive.aljazeera.com") {
            doRedirect = false;
        }
    }
    else {
        doRedirect = false;
    }

    //to ignore asking redirect confirmation on subsequent visit after saying No.
    if (getUserChoice) {
        if (lockNoRedirect) {
            getUserChoice = false;
        }
    }

    if (doRedirect) {
        self.location = redirectLocation;
    }
}



$(function () {
    if (getUserChoice) {
        $.confirm = function (params) {

            if ($('#confirmOverlay').length) {
                // A confirm is already shown on the page:
                return false;
            }

            var buttonHTML = '';
            $.each(params.buttons, function (name, obj) {

                // Generating the markup for the buttons:

                buttonHTML += '<a href="#" class="button ' + obj['class'] + '">' + name + '<span></span></a>';

                if (!obj.action) {
                    obj.action = function () { };
                }
            });

            var markup = [
			'<div id="confirmOverlay">',
			'<div id="confirmBox">',
			'<h1>', params.title, '</h1>',
			'<p>', params.message, '</p>',
			'<div id="confirmButtons">',
			buttonHTML,
			'</div></div></div>'
            ].join('');

            $(markup).hide().appendTo('body').fadeIn();

            var buttons = $('#confirmBox .button'),
			i = 0;

            $.each(params.buttons, function (name, obj) {
                buttons.eq(i++).click(function () {

                    // Calling the action attribute when a
                    // click occurs, and hiding the confirm.

                    obj.action();
                    $.confirm.hide();
                    return false;
                });
            });
        }

        $.confirm.hide = function () {
            $('#confirmOverlay').fadeOut(function () {
                $(this).remove();
            });
        }

        $.confirm({
            'title': 'Your Choice',
            'message': 'Click YES to select the Al Jazeera English homepage  <br />as your default.',
            'buttons': {
                'Yes': {
                    'class': 'blue',
                    'action': function () {
                        createCookie('AJERedirectLock', 1, 180);
                    }
                },
                'No': {
                    'class': 'gray',
                    'action': function () {
                        createCookie('AJENoRedirectLock', 1, 90);
                    }
                }
            }
        });
    }
});