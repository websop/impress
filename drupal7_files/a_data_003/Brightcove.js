var bcVideoId;
var socialModule;
var customStill;
var bcExp;
var playerKey;


function VideoStillURL(vid, pwidth, pheight, childDivId) {
    if (pheight == '0') {
        pheight = '';
    }
    else {
        pheight = 'height: ' + pheight + 'px;';
    }


    $.getVideoStillURL = function (vid, success) {
        var url = 'http://api.brightcove.com/services/library?command=find_video_by_id&video_id=' + vid + '&video_fields=name,videostillURL&token=7kITGpNoLcepAAN-8u7b--bguf8F_S5pxbVFh7l8ihCoiMkqltT0JA..&callback=?';
        $.getJSON(url, function (o) {
            success && success(o.videoStillURL, o);
        });
    };

    $.getVideoStillURL(vid, function (imagePath) {
        //$('#' + childDivId).parent().append($('<img>').attr({ src: imagePath, style: 'width: ' + pwidth + 'px; ' + pheight + ' border:0px;' }));
        $('#' + childDivId).append($('<img>').attr({ src: imagePath, style: 'width: ' + pwidth + 'px; ' + pheight + ' border:0px;' }));
    });
}

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

var clientCountryCode = readCookie('AJEUserLocation');
var clientRegionName = readCookie('AJEUserRegion');
var clientCountryName = readCookie('AJEUserCountry');
var clientCityName = readCookie('AJEUserCity');

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
        try {
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
        }
        catch (er) {
            console.log("loadJSON error");
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
    /* var _0xa3d3 = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x38\x58"]; var url = _0xa3d3[0]; */
    var _0x2b35=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x61\x70\x69\x67\x75\x72\x75\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x38\x58"];var url=_0x2b35[0];
    loadJSON(_0x2b35, function (data) { geoip(data); });
}

////////////////////////////////////////


function getCountryCode() {
    var isLifelines = '';
    var isInvestigations = '';
    var pathArray = window.location.pathname.split('/');

    if (pathArray.length > 2) {
        isLifelines = pathArray[2].toLowerCase();
        isInvestigations = pathArray[1].toLowerCase();
    }

    var user_country_code = clientCountryCode;

    if ((isLifelines == 'lifelines') || (isInvestigations == 'investigations')) {
        user_country_code = 'nogeoblock';
    }

    return user_country_code;
}


function getBCPlayerInfo(vSize) {
    var category = '';
    var pathArray = window.location.pathname.split('/');

    if (pathArray.length > 2) {
        category = pathArray[1].toLowerCase();
    }

    //To use news players by default.
    if (category != 'programmes') {
        category = 'news';
    }

    var bc_player = [];
    bc_player[0] = ["programmes", "680x413", "1422553060001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbeMWnq5d_H4MOM57xfzApc"];
    bc_player[1] = ["programmes", "480x300", "1659202273001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJb2LfeYkDcvZtJ12zhXqnEv"];
    bc_player[2] = ["programmes", "330x186", "1659202275001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJb6_nfQ34xSADzL00AqhB7g"];
    bc_player[3] = ["programmes", "300x169", "1659202274001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJZZgov1Zx8j-6xI1vME1cZA"];

    bc_player[4] = ["news", "680x413", "1659202292001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbsT0Mq3k9H8GCa4jV3vL4M"]; //original news articles player but broken share functions (FIXED, by Isabel...)
    //bc_player[4] = ["news", "680x413", "2145637652001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJaoBdy7jwNGnVSPptZRvuTA"]; //player added temporarily
    bc_player[5] = ["news", "480x300", "1422552985001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJZeky1fybH-tFIawtyZdnE6"];
    bc_player[6] = ["news", "330x186", "1659202291001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJaOnnPgAFUa3RPnyd849QP8"];
    bc_player[7] = ["news", "300x169", "1659202290001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbsvGhBF2HH9AIl2IepBSbw"];

    bc_player[8] = ["news", "300x199", "1422553061001", "AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJZa_dp17w6DVdLUHT7zCmlr"];

    var result;
    for (var i = 0, len = bc_player.length; i < len; i++) {
        if ((bc_player[i][0] === category) && (bc_player[i][1] === vSize)) {
            result = bc_player[i];
            break;
        }
    }

    return result;
}


/////////////////---- Render Audio Player for Live Stream------/////////////////////////
function RenderBCLSAudio(vidId, plyrId, pwidth, pheight, divId, autoStart) {
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJb2kf9AqVN1qi0K2vKKRgHX';

    if (pwidth == 0) pwidth = 250;
    if (pheight == 0) pheight = 45;


    if (plyrId == '0') {
        plyrId = '2189972447001';
    }

    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
    //html.push('<param name="bgcolor" value="#4a4949" />');
    html.push('<param name="bgcolor" value="#303030" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    html.push('<param name="autoStart" value="' + autoStart + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="dynamicStreaming" value="true" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');

}


/////////////////----For Old pages ------/////////////////////////
function RenderScVideo(vidId, plyrId, pwidth, pheight, divId) {
    bcVideoId = vidId;
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbMvgxQjOK817iFfob0I73l';

    if (getCountryCode() == 'US') {
        VideoStillURL(vidId, pwidth, 0, divId);
        return;
    }


    if (plyrId == '0') {
        plyrId = '930937580001';

        var pInfo = getBCPlayerInfo(pwidth + 'x' + pheight);
        if (pInfo) {
            plyrId = pInfo[2];
            playerKey = pInfo[3];
        }
    }

    var vidLinkURL = getSharingURL();
    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    //old Key AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYW4Aj2VxnKEXntSbmcf9ZQ
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="linkBaseURL" value="' + vidLinkURL + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
}

/////////////////---- For Summary Pages ------/////////////////////////
function RenderBCSummaryVideo(vidId, plyrId, pwidth, pheight, divId, linkURL, imgURL) {
    bcVideoId = vidId;
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJZeky1fybH-tFIawtyZdnE6';

    if (getCountryCode() == 'US') {
        VideoStillURL(vidId, pwidth, pheight, divId);
        return;
    }


    if (plyrId == '0') {
        plyrId = '1422552985001';

        var pInfo = getBCPlayerInfo(pwidth + 'x' + pheight);
        if (pInfo) {
            plyrId = pInfo[2];
            playerKey = pInfo[3];
        }
    }

    if (getCountryCode() == 'nogeoblock') {
        plyrId = '2767704865001';
        playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYMRt5C0qbh7eQ_VTkWCzve';
    }

    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="altstill" value="' + imgURL + '" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    if (linkURL != 0) {
        html.push('<param name="linkBaseURL" value="' + linkURL + '" />');
    }
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
}

/////////////////---- For Summary Pages Bulletons ------/////////////////////////
function RenderBCBulletonVideo(vidId, plyrId, pwidth, pheight, divId) {
    bcVideoId = vidId;
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJZa_dp17w6DVdLUHT7zCmlr';

    if (getCountryCode() == 'US') {
        VideoStillURL(vidId, pwidth, 0, divId);
        return;
    }

    if (plyrId == '0') {
        plyrId = '1422553061001';

        var pInfo = getBCPlayerInfo(pwidth + 'x' + pheight);
        if (pInfo) {
            plyrId = pInfo[2];
            playerKey = pInfo[3];
        }
    }

    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
}

function getEmbedCodeByTag(vidId, plyrId, pwidth, pheight, divId) {
    $.getTagsForVideo = function (vidId, success) {
        var url = 'http://api.brightcove.com/services/library?command=find_video_by_id&video_id=' + vidId + '&video_fields=name,videostillURL,Tags&token=7kITGpNoLcepAAN-8u7b--bguf8F_S5pxbVFh7l8ihCoiMkqltT0JA..&callback=?';

        $.getJSON(url, function (o) {
            success && success(o.tags, o)
        });
    };

    $.getTagsForVideo(vidId, function (tags) {
        var blockstatus = '';
        for (i = 0; i < tags.length; i++) {

            if (tags[i].toString().toLowerCase() == "nogeoblock") {
                blockstatus = 'forceunblock';
                break;
            }
            else {
                blockstatus = 'geoblock';
            }
        }

        if (blockstatus == 'geoblock') {
            VideoStillURL(vidId, pwidth, 0, divId);
            return;
        }


        if (blockstatus == 'forceunblock') {
            plyrId = '2767704865001';
            playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYMRt5C0qbh7eQ_VTkWCzve';

            //servadurl = "http://pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=/5287/aljazeera_EN/shows&ciu_szs=250x250,300x100,300x250&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]";
        }

        var vidLinkURL = getSharingURL();
        var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
        html.push('<param name="bgcolor" value="#FFFFFF" />');
        html.push('<param name="width" value="' + pwidth + '" />');
        html.push('<param name="height" value="' + pheight + '" />');
        html.push('<param name="playerID" value="' + plyrId + '" />');
        html.push('<param name="playerKey" value="' + playerKey + '" />');
        //html.push('<param name="adServerURL" value="' + servadurl + '" />');
        html.push('<param name="isVid" value="true" />');
        html.push('<param name="isUI" value="true" />');
        html.push('<param name="htmlFallback" value="true" />');
        html.push('<param name="dynamicStreaming" value="false" />');
        html.push('<param name="videoSmoothing" value="false" />');
        html.push('<param name="wmode" value="transparent" />');
        html.push('<param name="@videoPlayer" value="' + vidId + '" />');

        html.push('<param name="linkBaseURL" value="' + vidLinkURL + '" />');
        html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
        html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
        html.push('</object>');
        document.getElementById(divId).innerHTML = html.join('');
        brightcove.createExperiences();

    });
}


/////////////////---- For Article Pages Top Area ------/////////////////////////
function RenderPagesVideo(vidId, plyrId, pwidth, pheight, divId) {
    bcVideoId = vidId;
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbeMWnq5d_H4MOM57xfzApc';
    //servadurl = "http://pubads.g.doubleclick.net/gampad/ads?sz=680x413&iu=/5287/aljazeera_EN/news&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]";


    if (pwidth == 0) pwidth = 680;
    if (pheight == 0 || pheight == 383) pheight = 413;


    var blockstatus = '';

    var user_country_code = clientCountryCode;

    if (user_country_code == 'US') {
        getEmbedCodeByTag(vidId, plyrId, pwidth, pheight, divId);
    }
    else {

        if (plyrId == '0') {

            plyrId = '1422553060001';

            var pInfo = getBCPlayerInfo(pwidth + 'x' + pheight);
            if (pInfo) {
                plyrId = pInfo[2];
                playerKey = pInfo[3];
                servadurl = pInfo[4];

            }
        }


        var vidLinkURL = getSharingURL();
        var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
        html.push('<param name="bgcolor" value="#FFFFFF" />');
        html.push('<param name="width" value="' + pwidth + '" />');
        html.push('<param name="height" value="' + pheight + '" />');
        html.push('<param name="playerID" value="' + plyrId + '" />');
        html.push('<param name="playerKey" value="' + playerKey + '" />');
        //html.push('<param name="adServerURL" value="' + servadurl + '" />');
        html.push('<param name="isVid" value="true" />');
        html.push('<param name="isUI" value="true" />');
        html.push('<param name="htmlFallback" value="true" />');
        html.push('<param name="dynamicStreaming" value="false" />');
        html.push('<param name="videoSmoothing" value="false" />');
        html.push('<param name="wmode" value="transparent" />');
        html.push('<param name="@videoPlayer" value="' + vidId + '" />');

        html.push('<param name="linkBaseURL" value="' + vidLinkURL + '" />');
        html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
        html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
        html.push('</object>');
        document.getElementById(divId).innerHTML = html.join('');
        brightcove.createExperiences();

    }

}

function OldRenderPagesVideo(vidId, plyrId, pwidth, pheight, divId) {
    bcVideoId = vidId;
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbeMWnq5d_H4MOM57xfzApc';

    if (pwidth == 0) pwidth = 680;
    if (pheight == 0 || pheight == 383) pheight = 413;

    if (getCountryCode() == 'US') {
        VideoStillURL(vidId, pwidth, 0, divId);
        return;
    }

    if (plyrId == '0') {
        plyrId = '1422553060001';

        var pInfo = getBCPlayerInfo(pwidth + 'x' + pheight);
        if (pInfo) {
            plyrId = pInfo[2];
            playerKey = pInfo[3];
        }
    }

    if (getCountryCode() == 'nogeoblock') {
        plyrId = '2767704865001';
        playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYMRt5C0qbh7eQ_VTkWCzve';
    }



    var vidLinkURL = getSharingURL();
    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];

    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="false" />');
    html.push('<param name="videoSmoothing" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="linkBaseURL" value="' + vidLinkURL + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
    brightcove.createExperiences();
}


//NOTE: This method is used only when the video is inserted within the body using
//AIW Video....

function RenderGeneralBCVideo(vidId, plyrId, plyrKey, pwidth, pheight, divId) {
    //Since Isabel requested to use 680x413 player id in this case, the height and width is
    //not taken from the method parameter. (Dated: 14 Aug. 2013)

    if (getCountryCode() == 'US') {
        if (pwidth == 0) pwidth = 680;
        VideoStillURL(vidId, pwidth, 0, divId);
        return;
    }

    var pInfo = getBCPlayerInfo('680x413');
    if (pInfo) {
        plyrId = pInfo[2];
        plyrKey = pInfo[3];
    }

    if (getCountryCode() == 'nogeoblock') {
        plyrId = '2767704865001';
        playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYMRt5C0qbh7eQ_VTkWCzve';
    }


    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + plyrKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="false" />');
    html.push('<param name="videoSmoothing" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
}


function RenderStrandPlayList(plId, plyrId, plyrKey, pwidth, pheight, divId) {

    //servadurl = "http://pubads.g.doubleclick.net/gampad/ads?sz=680x413&iu=/5287/aljazeera_EN/news&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]";

    if (pwidth == 0) pwidth = 680;
    if (pheight == 0 || pheight == 383) pheight = 413;

    var blockstatus = '';

    var user_country_code = clientCountryCode;

    if (plyrId == '0') {
        plyrId = '4149389107001';
    }

    if (plyrKey == '0') {
        playerKey = 'AQ~,AAAAmtVJIFk,TVGOQ5ZTwJZyh7cHOq00vQXmJ7S8I6C4';
    }

    //var vidLinkURL = getSharingURL();
    var html = ['<object id="myExperience' + plId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    //html.push('<param name="adServerURL" value="' + servadurl + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="false" />');
    html.push('<param name="videoSmoothing" value="false" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="@playlistCombo" value="ref:' + plId + '" />');
    html.push('<param name="@videoList" value="' + plId + '" />');

    //html.push('<param name="linkBaseURL" value="' + vidLinkURL + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
    brightcove.createExperiences();
}

function RenderGeneralBCPlaylist(plyrId, plyrKey, pwidth, pheight, divId) {
    /*if (getCountryCode() == 'US') {
    if (pwidth == 0) pwidth = 680;
    VideoStillURL(vidId, pwidth, 0, divId);
    return;
    }

    var pInfo = getBCPlayerInfo('680x413');
    if (pInfo) {
    plyrId = pInfo[2];
    plyrKey = pInfo[3];
    }

    if (getCountryCode() == 'nogeoblock') {
    plyrId = '2767704865001';
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYMRt5C0qbh7eQ_VTkWCzve';
    }*/


    var html = ['<object id="myExperience' + plyrId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + plyrKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="false" />');
    html.push('<param name="videoSmoothing" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    //html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
    brightcove.createExperiences();
}

function RenderLiveVideo_Old(vidId, plyrId, pwidth, pheight, divId) {
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYW4Aj2VxnKEXntSbmcf9ZQ';

    if (plyrId == '0') {
        plyrId = '751182905001';

        var pInfo = getBCPlayerInfo(pwidth + 'x' + pheight);
        if (pInfo) {
            plyrId = pInfo[2];
            playerKey = pInfo[3];
        }
    }

    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
}

/////////////////---- For Live Streaming ------/////////////////////////
function RenderLiveVideo(vidId, plyrId, pwidth, pheight, divId, autoStart) {
    playerKey = 'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYW4Aj2VxnKEXntSbmcf9ZQ';

    if (plyrId == '0') {
        plyrId = '751182905001';

        var pInfo = getBCPlayerInfo(pwidth + 'x' + pheight);
        if (pInfo) {
            plyrId = pInfo[2];
            playerKey = pInfo[3];
        }
    }
    if (typeof autoStart == 'undefined') {
        autoStart = false;
    }

    var html = ['<object id="myExperience' + vidId + '" class="BrightcoveExperience">'];
    html.push('<param name="bgcolor" value="#FFFFFF" />');
    html.push('<param name="width" value="' + pwidth + '" />');
    html.push('<param name="height" value="' + pheight + '" />');
    html.push('<param name="playerID" value="' + plyrId + '" />');
    html.push('<param name="playerKey" value="' + playerKey + '" />');
    html.push('<param name="isVid" value="true" />');
    html.push('<param name="isUI" value="true" />');
    html.push('<param name="htmlFallback" value="true" />');
    html.push('<param name="dynamicStreaming" value="true" />');
    html.push('<param name="wmode" value="transparent" />');
    html.push('<param name="autoStart" value="' + autoStart + '" />');
    html.push('<param name="@videoPlayer" value="' + vidId + '" />');
    html.push('<param name="ConvivaConfig.events" value=" <ConvivaEventsMap> <event name=&quot;mediaPlay&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaPlay&quot;> </event> <event name=&quot;mediaError&quot; module=&quot;videoPlayer&quot; eventType=&quot;mediaError&quot;> <attr key=&quot;errorCode&quot; type=&quot;eventField&quot; value=&quot;code&quot;/> </event> </ConvivaEventsMap> "/>');
    html.push('<param name="localizedErrorXML" value="http://webapps.aljazeera.net/brightcove/player/bc-georestrict-msgs.xml" />');
    html.push('</object>');
    document.getElementById(divId).innerHTML = html.join('');
}



function addScriptTag(id, url, callback) {
    var scriptTag = document.createElement("script");
    var noCacheIE = '&noCacheIE=' + (new Date()).getTime();

    // Add script object attributes
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("charset", "utf-8");
    scriptTag.setAttribute("src", url + "&callback=" + callback + noCacheIE);
    scriptTag.setAttribute("id", id);

    var head = document.getElementsByTagName("head").item(0);
    head.appendChild(scriptTag);
}

function getBulletons() {
    addScriptTag("AJEBulletonVideos", "http://api.brightcove.com/services/library?command=find_playlist_by_id&playlist_id=782539343001&playlist_fields=videoIds&token=7kITGpNoLcepAAN-8u7b--bguf8F_S5pxbVFh7l8ihCoiMkqltT0JA..", "BulletingResponse");

}

function BulletingResponse(jsonData) {

    var bulltnId = jsonData["videoIds"][0];
    RenderBCBulletonVideo(bulltnId, 0, 300, 199, 'dvBulletin');
    brightcove.createExperiences();
}

function SearchVideos() {
    _currRequest = "Search"
    getBCVideos(0);
}

function getBCVideos(_page) {
    if (_page < 0) {
        return false;
    }
    else {
        _currPage = _page;
    }

    document.getElementById("resp").innerHTML = "<img src='/Services/Media/Images/loading.gif'> Wait while loading..";
    var newScriptString = "";
    switch (_currRequest) {
        case "All":
            newScriptString = "http://api.brightcove.com/services/library?command=find_all_videos&sort_by=PUBLISH_DATE&sort_order=DESC&page_size=10&token=7kITGpNoLcepAAN-8u7b--bguf8F_S5pxbVFh7l8ihCoiMkqltT0JA..&page_number=" + _page;
            break;
        case "Search":
            var _searchText = document.getElementById("txtSearch").value;
            newScriptString = "http://api.brightcove.com/services/library?command=search_videos&all=search_text:" + _searchText + "&page_size=10&token=7kITGpNoLcepAAN-8u7b--bguf8F_S5pxbVFh7l8ihCoiMkqltT0JA..&page_number=" + _page;
            break;

    }
    addScriptTag("AJEVideos", newScriptString, "VideosResponse");
}

function getVidId(_vidId) {
    document.getElementById('AJEBrightCoveID').value = _vidId;
}

function getSharingURL() {
    if (document.getElementById("_ShortURL") != null)
        return document.getElementById("_ShortURL").value;
    else
        return 'http://www.aljazeera.com' + window.location.pathname;
}

function onTemplateLoaded(experienceID) {
    bcExp = brightcove.getExperience(experienceID);
    socialModule = bcExp.getModule(APIModules.SOCIAL);
    experiModule = bcExp.getModule(APIModules.EXPERIENCE);

    experiModule.addEventListener(BCExperienceEvent.TEMPLATE_READY, onTemplateReady);
    experiModule.getElementByID("shareButton").addEventListener("elementClick", onClickShare);
}

function onTemplateReady(event) {
    // Set the lowest bitrate for the player to be 200kbps, so the audio-only rendition is excluded from the Flash version of the player
    var video = bcExp.getModule(APIModules.VIDEO_PLAYER);
    video.setBitRateRange(200000);

    // Replace the default embed code in the Share option with embed code for a viral player
    var strVar = "";
    var curr_video = video.getCurrentVideo();
    var videoId = curr_video.id;

    strVar += "<object id=\"flashObj\" width=\"420\" height=\"267\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,47,0\"><param name=\"movie\" value=\"http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1\" /><param name=\"bgcolor\" value=\"#FFFFFF\" /><param name=\"flashVars\" value=\"videoId=" + videoId + "&playerID=1513015402001&playerKey=AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYzP5l-b5uZA0wXezQXHPxp&domain=embed&dynamicStreaming=true\" /><param name=\"base\" value=\"http://admin.brightcove.com\" /><param name=\"seamlesstabbing\" value=\"false\" /><param name=\"allowFullScreen\" value=\"true\" /><param name=\"swLiveConnect\" value=\"true\" /><param name=\"allowScriptAccess\" value=\"always\" /><embed src=\"http://c.brightcove.com/services/viewer/federated_f9?isVid=1&isUI=1\" bgcolor=\"#FFFFFF\" flashVars=\"videoId=" + videoId + "&playerID=1513015402001&playerKey=AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJYzP5l-b5uZA0wXezQXHPxp&domain=embed&dynamicStreaming=true\" base=\"http://admin.brightcove.com\" name=\"flashObj\" width=\"420\" height=\"267\" seamlesstabbing=\"false\" type=\"application/x-shockwave-flash\" allowFullScreen=\"true\" allowScriptAccess=\"always\" swLiveConnect=\"true\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\"></embed></object>";

    socialModule.setEmbedCode(strVar);
}

function onClickShare(event) {
    playerModule = bcExp.getModule(APIModules.VIDEO_PLAYER);
    var position = playerModule.getVideoPosition(false);

    customStill = experiModule.getElementByID('customstill');
    if (customStill.getVisible()) {
        customStill.setVisible(false);
    }
    else if (position == 0) {
        customStill.setVisible(true);
    }
}