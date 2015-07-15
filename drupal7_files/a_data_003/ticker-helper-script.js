function doNewsTicker(url, top, interval) {
    return false;
}

function setTicker(url, top, left, interval) {
    $.ajax({

        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            data = JSON.parse(JSON.stringify(data));

            if (data.Alert == true) {
                $('#header_container').css('visibility', 'visible');
                $('#header_container').css('display', 'block');
                $('.ticker-wrapper').css('visibility', 'visible');
                $('#header_container').html('');
                $('#header_container').html('<ul id="js-news" class="js-hidden"></ul>');

                $.each(data.AlertText, function (key, value) {
                    $('#js-news').append('<li class="news-item"><a href="#">' + value.Text + '</a></li>');
                });
                showTicker(top, left);

                // $('.ticker').css('left', left);

            }
            else {
                hideTicker();
            }

            window.setInterval(function () {
                intNewsTicker(url, top, left);
            }, interval);
        },
        error: function (request, error) {
            //alert("Request: " + JSON.stringify(request));
        }
    });
};

function intNewsTicker(url, top, left) {
    //var flickerAPI = url + '&' + new Date().getTime();

    $.ajax({

        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(JSON.stringify(data));

            if (data.Alert == true) {

                $('#header_container').html('');
                $('#header_container').html('<ul id="js-news" class="js-hidden"></ul>');
                $('#header_container').css('display', 'block');

                $.each(data.AlertText, function (key, value) {
                    $('#js-news').append('<li class="news-item"><a href="#">' + value.Text + '</a></li>');
                });
                showTicker(top, left);

                // $('.ticker').css('left', left);

            }
            else {
                hideTicker();
            }
        },
        error: function (request, error) {
            //alert("Request: " + JSON.stringify(request));
        }

    });
};

function showTicker(top, left) {
    // change fotter and content div.
    //    alert(top);
    $('#header_container').css('top', top + 'px');

    //show news ticker.
    $('#js-news').ticker({ left: left });


    $('#header_container').css('visibility', 'visible');
    $('.ticker-controls').css('display', 'none');
    $('.ticker-wrapper').css('visibility', 'visible');

    //$('.ticker-wrapper').css('width', ($(window).width() - 100) + 'px');

    scrollHandler(top, left);

};

function hideTicker() {
    $('#header_container').css('display', 'none');
    $('.ticker-wrapper').css('display', 'none');
}

function scrollHandler(top, left) {


    var $el = $('#header_container');
    var $window = $(window);
    var top = $("#header_container").position().top;

    $window.bind("scroll resize", function () {
        var scrollTop = $window.scrollTop();


        if (scrollTop > $('#site-header').height()) {

            $el.css({
                top: 0 + 'px',
                bottom: "auto",
                position: "fixed"
            });
        }
        else if (scrollTop < $('#site-header').height()) {
            $el.css({
                top: 0 + 'px',
                bottom: "auto",
                position: "relative"
            });


        }



        if ($(window).width() < 380) {

            if (scrollTop > 169) {

                $el.css({
                    top: 0 + 'px',
                    bottom: "auto",
                    position: "fixed"
                });
            }
            else if (scrollTop < 169) {
                $el.css({
                    top: 14 + 'px',
                    bottom: "auto",
                    position: "relative"
                });


            }
        }




    }).scroll();

    //$('.ticker').css('left', left);
}


$(document).ready(function () {
    try {
        // News Ticker Call
        setTicker("/addons/alert.ashx?command=breaking", 600, 0, 30000);
    } catch (err) {
    }
});