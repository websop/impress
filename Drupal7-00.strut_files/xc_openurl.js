// $Id$

/**
 * Open new window OpenURL
 */
var XCOpenURL = {};
//if (Drupal.jsEnabled) {

(function($) {

  $(document).ready(function() {

    if (Drupal.settings.xc_openurl != undefined) {
      if (!Drupal.settings.xc_openurl.openurl.match(/^http/)) {
        $('#edit-openurl-action').remove();
      }
    }

    var page = Drupal.settings.xc_search.page;
    if (page == 'node') {
      XCOpenURL.getOpenURLInfo(Drupal.settings.xc_search.node_id, page);
    }
    else if (page == 'xc_search') {
      $('.openurl').each(function() {
        var coverart = $(this).attr('id');
        var coverart_id = coverart.split('-')[2];
        XCOpenURL.getOpenURLInfo(coverart_id, page);
      });
    }
    return false
  });

  XCOpenURL.getOpenURLInfo = function(nid, page) {
    var api_url = Drupal.settings.basePath + 'xc/openurl/360linkapi/';
    var options = {'lang' : $('html').attr('lang')};
    var id;

    if (page == 'node') {
      id = '#openurl';
    }
    else if (page == 'xc_search') {
      id = '#xc-openurl-' + nid;
    }

    $(id).hide();
    api_url = api_url + nid;

    $.ajaxSetup({
      timeout: 60000   //単位はms
    });

    $.get(api_url, options, function(data){
      if (!data.result) {
      } else {
        if (page == 'node') {
          $(id).children('.fieldset-wrapper').html(data.result);
          $(id).fadeIn(1000);
        }
        else if (page == 'xc_search') {
          $(id).children('td:eq(1)').append(data.result);
          $(id).fadeIn(1000);
        }
      }
    }, "json");
  }

  XCOpenURL.moveOpenURL = function() {
    var url = Drupal.settings.xc_openurl.openurl;
    window.open(url);
    return false;
  }

})(jQuery);

//}
