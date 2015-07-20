// $Id$
(function ($) {
var XCBiblioExport = {};
  $(document).ready(function(){
    $('.export-action').click(function(){
      var page = Drupal.settings.xc_search.page;
      if (page == 'node') {
        var nid = {};
        nid[0] = Drupal.settings.xc_search.node_id;
        XCBiblioExport.exportItem(nid);
      }
      else if (page == 'xc_search') {
        var selectedItems = XCSearch.getSelectedItems();
        if (selectedItems.length > 0) {
          XCBiblioExport.exportItem(selectedItems);
        }
      }
      return false;
    });
  });

  XCBiblioExport.exportItem = function(id) {
    var options = {};
    for (i in id) {
      options[i] = id[i];
    }
    var w = window.open();
    $.post(Drupal.settings.xc_biblio_export.xc_biblio_export_url, options, function(data, textStatus, XMLHttpRequest){
      w.location.href = data.url;
    }, "json");
  };
})(jQuery);
