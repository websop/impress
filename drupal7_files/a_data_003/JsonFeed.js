    $(document).ready(function () {
    checkCookies();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
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

function displayWeather(status, image, country, city, temp, temp_unit, weather_url) {
  
    if (status == "Ok") {
        $('#weatherwidget').html("<div class='WeatherMasterHead'><a style='text-decoration:none; color:#909090;' href='" + weather_url + "'><img src='/Assets/Images/weather/SmallImages/" + image + ".gif'/><span>" + temp + "</span><span>" + temp_unit + "°</span> <span class='WeatherCity'>" + city + "</span><span>, </span><span class='WeatherCountry'>" + country + "</span> </a> ");
    }
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

function checkCookies() {

    var status, image, country, city, temp, temp_unit,weather_url;
    var JSON_Cookie = readCookie("AJEWeather");
    var CountryCookie = readCookie("AJEUserCountry");
    var CityCookie = readCookie("AJEUserCity");
    if (JSON_Cookie != null) {
        var JSON_Data = JSON_Cookie.split('-');
        status = JSON_Data[0];
        image = JSON_Data[1];
        country = JSON_Data[2];
        city = JSON_Data[3];
        temp = JSON_Data[4];
        temp_unit = JSON_Data[5];
        weather_url = JSON_Data[6];
        displayWeather(status, image, country, city, temp, temp_unit, weather_url);
    }
    else {

        if (CountryCookie != null && CityCookie != null){
            country = CountryCookie;
            city = CityCookie;
        }

        else {
            /* var _0xec31 = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x56\x34\x39\x36\x33\x50\x58\x37\x4B\x59\x54\x56\x57\x44\x36\x32\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E"]; var url = _0xec31[0]; */
           /* var _0x39fa = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x56\x34\x39\x36\x33\x50\x58\x37\x4B\x59\x54\x56\x57\x44\x36\x32\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x31\x30\x58"]; var url = _0x39fa[0];*/
            /* var _0x57e4 = ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x69\x70\x61\x64\x64\x72\x65\x73\x73\x6C\x61\x62\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x36\x58"]; var url = _0x57e4[0];*/
           var _0x2b35=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x70\x69\x2E\x61\x70\x69\x67\x75\x72\x75\x73\x2E\x63\x6F\x6D\x2F\x69\x70\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2F\x76\x31\x2E\x38\x2F\x6C\x6F\x63\x61\x74\x65\x69\x70\x3F\x6B\x65\x79\x3D\x53\x41\x4B\x34\x57\x53\x33\x32\x37\x46\x4C\x53\x4D\x50\x53\x48\x45\x4E\x35\x5A\x26\x69\x70\x3D\x6C\x6F\x63\x61\x6C\x2D\x69\x70\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x63\x61\x70\x61\x63\x69\x74\x79\x3D\x38\x58"];var url=_0x2b35[0];
             loadJSON(_0x2b35, function (data) {
                country = data.geolocation_data.country_name;
                city = data.geolocation_data.city;
                setCookie("AJEUserCountry", country, 24);
                setCookie("AJEUserCity", city, 24);
            });
        }
       


        $.getJSON("/weatherapp/weatherapi.ashx?cmd=findWeather&country=" + country + "&city=" + city + "", { get_param: 'value' }, function (data) {
            status = data.Status;
            image = data.Symbols;
            temp = data.MaxTemp;
            temp_unit = data.MaxTempUnit;
            city = data.City;
            country = data.Country;
            weather_url = data.WeatherPageurl;
         
            if (status == "Ok") {
                var JSON_Data = status + "-" + image + "-" + country + "-" + city + "-" + temp + "-" + temp_unit + "-" + weather_url;
                setCookie("AJEWeather", JSON_Data, 1);
            }
        displayWeather(status, image, country, city, temp, temp_unit, weather_url);
        });
    }
}



