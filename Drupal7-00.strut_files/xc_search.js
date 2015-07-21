/**
 * @file
 * JavaScript functions for XC Search module
 *
 * @copyright (c) 2010-2011 eXtensible Catalog Organization
 */
var XCSearch = {};
var XCBrowse = {};

(function ($) {

	/// ignore ajax error alert
	var alert = window.alert;
	window.alert = function(msg) {
		if (msg.indexOf(Drupal.t("An AJAX HTTP request terminated abnormally.")) != -1) {
			if (console) console.log(msg);
		} else {
			alert(msg);
		}
	};

 // var XCSearch = {};
 // var XCBrowse = {};

  XCSearch.bookmark = {'total': 0, 'already': 0, 'failed': 0, 'success': 0};
  XCSearch.ncipCounter = 0;
  XCSearch.showMore = 0;
  /* added by kyushu */
  XCSearch.mltCounter = 0;
  XCSearch.mltDisplayed = 0;
  XCSearch.showMoreFlag = 0;
  XCSearch.showMoreHoldingItems = null;

  $(document).ready(function() {
    /**
     * Handles the click on select all link
     */
    $('.select-all-action').click(function() {
      $('input[name=items]').each(function() {
        if (!this.checked) {
          this.checked = "checked";
        }
      });
    });

    /**
     * Handles the click on select non link
     */
    $('.select-none-action').click(function() {
      $('input[name=items]').each(function() {
        if (this.checked) {
          this.checked = false;
        }
      });
    });

    /**
     * Setup a handler for a click on email action button
     */
    $('.email-action').click(function() {
      var selectedItems = XCSearch.getSelectedItems();
    });

    /**
     * Setup a handler for a click on print action button
     */
    $('.print-action').click(function() {
      var selectedItems = XCSearch.getSelectedItems();
    });

    /**
     * Setup a handler for a click on bookmark action button
     */
    $('.bookmark-action').click(function() {
      XCSearch.bookmark.processed = XCSearch.bookmark.already = XCSearch.bookmark.failed = XCSearch.bookmark.success = 0;
      var page = Drupal.settings.xc_search.page;
      if (page == 'node') {
        var form = $('#xc-search-full-action-form');
        var id  = $('input[name=nid]', form).val() + '|' + $('input[name=sid]', form).val();
        XCSearch.bookmark.total = 1;
        XCSearch.bookmarkItem(id);
      }
      else if (page == 'xc_search') {
        var selectedItems = XCSearch.getSelectedItems();
        XCSearch.bookmark.total = selectedItems.length;
        if (selectedItems.length > 0) {
          $('#xc-bookmark-notification .content').html('saving bookmarks&hellip;').parent().show();
          for (i in selectedItems) {
            XCSearch.bookmarkItem(selectedItems[i]);
          }
        }
      }
      else if (page == 'bookmark') {
        var selectedItems = XCSearch.getSelectedItems();
        XCSearch.bookmark.total = selectedItems.length;
        if (selectedItems.length > 0) {
          $('#xc-bookmark-notification .content').html('removing bookmarks&hellip;').parent().show();
          for (i in selectedItems) {
            XCSearch.removeBookmarkItem(selectedItems[i]);
          }
        }
      }
      return false;
    });

    /**
     * Handles the click on remove bookmark icon
     */
    $('.remove-bookmark-action').click(function() {
      XCSearch.bookmark.total = 1;
      XCSearch.bookmark.processed = XCSearch.bookmark.already = XCSearch.bookmark.failed = XCSearch.bookmark.success = 0;
      var form = $('#xc-search-full-action-form');
      var id  = $('input[name=nid]', form).val() + '|' + $('input[name=sid]', form).val();
      XCSearch.removeBookmarkItem(id);
      return false;
    });

    /**
     * Handles the click on close down image of bookmarked notification area
     */
    $('#xc-bookmark-close').click(function() {
      $('#xc-bookmark-notification').hide();
    });

    /**
     * Changes the images of bookmarked notification area's close down image
     */
    $("#xc-bookmark-close").hover(
      function () {$(this).attr('src', Drupal.settings.xc_search.xc_bookmark_close_state2);},
      function () {$(this).attr('src', Drupal.settings.xc_search.xc_bookmark_close_state1);}
    );

    /**
     * Handles the click on schema action button
     */
    $('.schema-action').click(function() {
      document.location = Drupal.settings.xc_search.schemaview_url;
      return false;
    });

    $('.xc-search-facet-more-link').click(function() {
      var link = $(this);
      if (link.hasClass('processed')) {
        return true;
      }
      var url = link.attr('href').replace('xc_search\/more_facets', 'xc_search/ajax/more_facets');
      $.getJSON(url, {}, function(data, textStatus, XMLHttpRequest) {
        if (data.status === 0) {
          alert(data.error_msg);
        }
        else {
          var content = $(data.content);
          var html = $('ul', content).html();
          link.parent().before(html);
          if (data.hasMore == 1) {
            link.html(Drupal.t('Show all&hellip;'));
            link.addClass('processed');
          }
          else {
            link.parent().remove();
          }
        }
      });
      return false;
    });

    /**
     * Clear form
     */
    $('#xc-search-clear a').click(function() {
      $('#xc-search-keys input[name=keys]').val("");
      return false;
    });

    /**
     * Copy checkbox values into search form when submit
     */
    $('#xc-search-form').submit(function() {
      var form = $(this);
      /* modified by kyushu */
      /*
      this.online_only.value = $('#xc_search_facet_checkbox_online').attr('checked') ? 1 : 0;
      this.exclude_microform.value = $('#xc_search_facet_checkbox_microform').attr('checked') ? 1 : 0;
      */
      this.kyushu_production.value = $('#xc_search_facet_checkbox_microform').attr('checked') ? 1 : 0;
      this.exclude_research_room.value = $('#xc_search_facet_checkbox_microform').attr('checked') ? 1 : 0;

      // Handling GET method
      if (Drupal.settings.xc_search.search_form_method == 'GET') {
        var query = $('input[name=keys]', form).val();
        if (query === undefined) return;
        if (Drupal.settings.xc_search.clean_url == 1) {
          var action = form.attr('action') + '/' + query;
          if (action != '') {
            form.attr('action', action);
          }
          $('input[name=form_build_id]', form).remove();
        }
        else {
          var action = Drupal.settings.xc_search.clean_action + '/' + query;
          $('input[name=form_build_id]', form).attr('name', 'q').val(action);
        }
        $('input[name=keys]', form).attr('name', 'os[keys]');
        $('input[name=form_token]', form).remove();
        $('input[name=form_id]', form).remove();
        $('input[name=hidden_filters]', form).remove();
        $('input[name=filter]', form).remove();
        $('input[name=reuse_filter]', form).remove();
        // $('input[name=op]', form).remove();
      }
      return true;
    });

    if (typeof Drupal.settings.xc_search != 'undefined') {
      /**
       * Retrieves and displays cover images
       */
      var image_info = Drupal.settings.xc_search.image_info;
      /* added by kyushu */
      XCSearch.mltCounter = Drupal.settings.xc_search.mlt_count;
      for (node_id in image_info) {
        XCSearch.getImage(node_id, image_info[node_id]);
      }

      $('img.xc-mlt-coverart-img').load(function() {
        // Handler for .load() called.
        if (this.width < 20 && this.height < 20) {
          $(this).parent().parent().parent().remove();
        }
      });

      /**
       * Retrieves and displays NCIP information
       */
      var ncip_info = Drupal.settings.xc_search.ncip_info;
      XCSearch.ncipCounter = Drupal.settings.xc_search.ncip_item_count;
      if (XCSearch.ncipCounter != 0) {
    	  $('#xc-general-notification')
    	  .html(Drupal.t('updating availability status information&hellip;'))
    	  .show();
      } else {
    	  $('#xc-general-notification').hide();
      }
      /*for (i in ncip_info) {
        var item = ncip_info[i];
        for (j in item.ncip_info) {
          var ncip_item = item.ncip_info[j];
          XCSearch.getAvailability(item.nid, ncip_item.ncip_provider_id, ncip_item.bib_id, item.id_int, ncip_item.org_code);
      */
      if (ncip_info != null) {
	      for (i in ncip_info) {
	          var item = ncip_info[i];
	        	  XCSearch.getAvailability(
	                      item.nid,
	                      item.id_int,
	                      item.ncip_info,
	                      item.identifier_int
	              );
	              /* added by kyushu */
		if (item.hasChild) {
	              XCSearch.getChildren(
	                      item.nid,
	                      item.id_int,
	                      item.ncip_info
	              );
		}
	      }
      }
      /**
       * Get availability for node id
       */
      var node_id = Drupal.settings.xc_search.node_id;
      var ncip_info = Drupal.settings.xc_search.ncip_bibs;
      if (ncip_info != null) {
          for (id_int in ncip_info) {
            var item = ncip_info[id_int];
            XCSearch.getAvailabilityAll(
              node_id,
              item.id_int,
              item.ncip_info
            );
            /* added by kyushu */
            if (item.hasChild) {
            	XCSearch.getChildrenAll(
            			node_id,
            			item.id_int,
            			item.ncip_info
            	);
            }
          }
      }

      if (typeof Drupal.settings.xc_search.synonyms != null && Drupal.settings.xc_search.synonyms == 1) {
        var url = Drupal.settings.xc_search.synonyms_url + '/' + Drupal.settings.xc_search.query;
        $.get(url, null, function(parsed) {
          // parsed = jQuery.parseJSON(data);
          if (parsed != null) {
            var placeholder = jQuery('#xc-synonyms-placeholder');
//            console.log(placeholder);
            if (typeof placeholder != "undefined") {
              placeholder.html(parsed.synonyms);
            }
          }
        });
      };

      if (typeof Drupal.settings.xc_search.suggestions != null && Drupal.settings.xc_search.suggestions == 1) {
        var url = Drupal.settings.xc_search.suggestions_url + '/' + Drupal.settings.xc_search.query;
        $.get(url, null, function(parsed) {
          // parsed = jQuery.parseJSON(data);
          placeholder = $('#xc-suggestions-placeholder');
          if (typeof placeholder != "undefined") {
            placeholder.html(parsed.suggestions);
          }
        });
      };
    }

		// mantis:0001746
		$('[id^=edit-previous]').click(function() {
      var current_page = parseFloat($("#edit-current").val()) - 1;
			$("[id^=edit-current]").val(current_page);
    });
  });

  /**
   * Get image URL, and insert it into HTML
   */
  XCSearch.getImage = function(node_id, options) {
    $.get(Drupal.settings.xc_search.image_url, options, function(syndetics) {
      // syndetics = jQuery.parseJSON(data);
      if (syndetics != null && syndetics.image_url != "") {
    	/* added by kyushu */
        mlt = $('#mlt-' + node_id);
        td = $('#coverart-' + node_id);
        url = $('#coverart-' + node_id + ' a').attr('href');
        title = $('#coverart-' + node_id + ' a').attr('title');
        // TODO: use a real jQuery method to create an image
        img = '<img src="' + syndetics.image_url + '"';
        if (typeof title != "undefined") {
          img += ' alt="' + title + '"'
              +  ' title="' + title + '"';
        }
        var className = td.hasClass('xc-mlt-coverart') ? 'xc-mlt-coverart-img' : 'xc-coverart-img';
        img += ' class="' + className + '"'
            +  '>';
        // TODO: no need to change anchor element, just put image inside.
        if (typeof url != "undefined") {
          html = '<a href="' + url + '"';
          if (typeof title != "undefined") {
            html += ' title="' + title + '"';
          }
          html += '>' + img + '</a>';
          img = html;
        }
        td.html(img);
        /* added by kyushu */
        if (syndetics.image_url.indexOf("blank-cover.gif",0) != -1 ){
          mlt.hide();
        } else {
          XCSearch.mltDisplayed++;
        }
        XCSearch.mltCounter--;
        if (XCSearch.mltCounter == 0 && XCSearch.mltDisplayed != 0) {
          $('#xc-search-similar-items-images').show('normal');
        }
      }
    });
  };

  /**
   * Get availability information and insert it into HTML
   *
   * @see xc_search_ajax_ncip_info()
   *
   * @param node_id
   *   The node id of the item in a search result list
   * @param ncip_id
   *   The NCIP server ID
   * @param bib_id
   *   The bib ID of the item in a search result list
   */
  XCSearch.getAvailability = function(node_id, ncip_id, bib_id, identifier_int) {
    var options = {
      'ncip_id': ncip_id,
      'bib_id' : bib_id,
      'identifier_int' : identifier_int,
      'org_code': null,
      'token'  : Drupal.settings.xc_search.token,
      /* added by kyushu */
      'node_id': node_id
    };

    // it calls xc_search_ajax_ncip_info
    $.get(Drupal.settings.xc_search.ncip_url, options, function(ncip_info) {
//      ncip_info = jQuery.parseJSON(data);
      if (ncip_info.avaliability != "") {
	      var tdAvail = $('#xc-availability-' + node_id);
	      var tdCall = $('#xc-call-number-' + node_id);

	      if (ncip_info.availability != Drupal.settings.xc_search.msg_not_available
	              && tdAvail.hasClass('xc_journal')) {
	    	  /* added by kyushu */
	          if ( ncip_info.count != 0 ){
	        	tdAvail.html(ncip_info.availability);
	          } else {
	            $('#xc-availability-column-' + node_id).fadeOut(1000);
	          }
	      } else {
	    	  if ( ncip_info.count != 0 ){
	    		tdAvail.html(ncip_info.availability);
	    		tdCall.text(ncip_info.call_number);
	          } else {
	            $('#xc-availability-column-' + node_id).fadeOut(1000);
	          }
	      }
      }
      /*
      if (ncip_info.availability == "") {
        // Remove the whole location line
        tdAvail.parent().fadeOut(1000);
      }
      else {
        // populate information
        tdAvail.html(ncip_info.availability);
      }

      if (ncip_info.call_number == "") {
        tdCall.parent().fadeOut(1000);
      }
      else {
        tdCall.text(ncip_info.call_number);
      }*/

      /* added by kyushu */
      var showMore_num  = $('#showMore-' + node_id).attr('value');
// mantis:1488
//      $('#availability-' + node_id ).click(function () {
      $('#availLess-' + node_id ).click(function () {
      if (showMore_num == 0) {
        toggle_row('availDetail-' + node_id );
        toggle_row('availLess-' + node_id );
        toggle_row('availSimple-' + node_id );
        showMore_num = 1;
      }else{
        toggle_row('availDetail-' + node_id );
        toggle_row('availLess-' + node_id );
        toggle_row('availSimple-' + node_id );
        showMore_num = 0;
      }     
      });
// add mantis:1488
      $('#availSimple-' + node_id ).click(function () {
      if (showMore_num == 0) {
        toggle_row('availDetail-' + node_id );
        toggle_row('availLess-' + node_id );
        toggle_row('availSimple-' + node_id );
        showMore_num = 1;
      }else{
        toggle_row('availDetail-' + node_id );
        toggle_row('availLess-' + node_id );
        toggle_row('availSimple-' + node_id );
        showMore_num = 0;
      }     
      });
// end mantis:1488
      XCSearch.ncipCounter--;
      if (XCSearch.ncipCounter == 0) {
        $('#xc-general-notification')
          .text(Drupal.t('All availability status information updated'))
          .fadeOut(3000);
      }
    });
  };

  /**
   * Get availability information and insert it into HTML
   *
   * @param node_id
   *   The node id of the item in a search result list
   * @param ncip_id
   *   The NCIP server ID
   * @param bib_id
   *   The bib ID of the item in a search result list
   */
  XCSearch.getAvailabilityAll = function(node_id, id_int, ids) {
    var options = {
      'id_int' : id_int,
      'bib_ids': ids,
      'token'  : Drupal.settings.xc_search.token
    };
    $.get(Drupal.settings.xc_search.ncip_url, options, function(result) {
      // var result = jQuery.parseJSON(response);
      if (result.status==0) {
    	  $('#xc-availability-' + node_id)
          .html(result.data)
          .fadeIn(1000);
          return false;
      } else if (result.status==-1) {
    	  // NCIPサーバエラーの場合
          $('#xc-availability-' + node_id)
          .html('Availability Unknown.')
          .fadeIn(1000);
          return false;
      } else {
    	  // 正常の場合
          if (result.count == 0){
            $('fieldset#location').fadeOut(1000);
          } else {
            XCSearch.showMoreHoldingItems = result.additions; //後で使うまで確保しておく
            XCSearch.showMoreFlag = -1;
            $('#xc-availability-' + node_id)
            .html(result.content)
            .fadeIn(1000, function () {

              $('#xc-circ-link').click(function () {
                if (XCSearch.showMoreFlag == -1) {
                  var params_ary = Array();
                  for (index in XCSearch.showMoreHoldingItems) {
                    var params = {};
                    params['node_id'] = node_id;
                    params['index'] = index;
                    params_ary.push(params);
                  }
                  loop(params_ary, addHoldingItems, 100); //0.1秒毎にループ
                  $(this).text(Drupal.t('Show less'));
                  XCSearch.showMoreFlag = 1;
                }
                else if (XCSearch.showMoreFlag == 0) {
                  $('#xc-availability-' + node_id + ' tr.hidden').show();
                  $(this).text(Drupal.t('Show less'));
                  XCSearch.showMoreFlag = 1;
                }
                else {//if (XCSearch.showMoreFlag == 1)
                  $('#xc-availability-' + node_id + ' tr.hidden').hide();
                  $(this).text(Drupal.t('Show more (!count)', {'!count': result.allcount - 5 }));
                  XCSearch.showMoreFlag = 0;
                }
                return false;
              });

              return false;
            });
          }
      }
      /*
      if (result.content) {
        XCSearch.showMore = 0;
        $('#xc-availability-' + node_id)
          .html(result.content)
          .fadeIn(1000, function () {
            $('#xc-circ-link').click(function () {
              if (XCSearch.showMore == 0) {
                $('#xc-availability-' + node_id + ' tr.hidden').show();
                $(this).text(Drupal.t('Show less'));
                XCSearch.showMore = 1;
                $('#xc-circ-link-on-top').show();
              }
              else {
                $('#xc-availability-' + node_id + ' tr.hidden').hide();
                $(this).text(Drupal.t('Show more (!count)', {'!count': result.count}));
                XCSearch.showMore = 0;
                $('#xc-circ-link-on-top').hide();
              }
              return false;
            });
            $('#xc-circ-link-on-top').click(function () {
              if (XCSearch.showMore == 1) {
                $('#xc-availability-' + node_id + ' tr.hidden').hide();
                $('#xc-circ-link').text(Drupal.t('Show more (!count)', {'!count': result.count}));
                XCSearch.showMore = 0;
                $('#xc-circ-link-on-top').hide();
              }
              return false;
            });
          }
        );
      }
      */
    });
  };

  /* 要素を追加する処理 */
  function addHoldingItems(params){
    var index     = params['index'];
    var node_id   = params['node_id'];
    var additions = XCSearch.showMoreHoldingItems[index];
    // 所蔵一覧テーブルの最後の<TR/>要素('#xc-circ-link'の行)の、その直前に追加用の<TR/>を挿入する
    $('#xc-availability-' + node_id + ' table tr:last').before(additions);
    $('#xc-availability-' + node_id + ' table tr.hidden').show();
  }
  /* ループの仕組み */
  function loop(array, fn, interval){
    var i = array.length;
    timerID = setInterval(function(){
      if(!i) {
        clearInterval(timerID);
        return;
      }
      fn(array[array.length-i]);
      i--;
    }, interval);
  }

  /**
   * Bookmark selected items
   */
  XCSearch.bookmarkItem = function(id) {
    var options = {'id': id};
    $.getJSON(Drupal.settings.xc_search.bookmark_item_url, options, function(data, textStatus, XMLHttpRequest) {
      XCSearch.bookmark.processed++;
      switch (parseInt(data.result)) {
        case -1:XCSearch.bookmark.already++;break;
        case 0:XCSearch.bookmark.failed++;break;
        case 1:XCSearch.bookmark.success++;break;
      }
      if (XCSearch.bookmark.processed == XCSearch.bookmark.total) {
        XCSearch.bookmarkShowResult();
      }
    });
  };

  /**
   * Bookmark selected items
   */
  XCSearch.removeBookmarkItem = function(id) {
    var page = Drupal.settings.xc_search.page;
    var options = {'id': id};
    $.getJSON(Drupal.settings.xc_search.remove_bookmark_item_url, options, function(data, textStatus, XMLHttpRequest) {
      XCSearch.bookmark.processed++;
      switch (parseInt(data.result)) {
        case -1:XCSearch.bookmark.already++;break;
        case 0:XCSearch.bookmark.failed++;break;
        case 1:
          XCSearch.bookmark.success++;
          if (page == 'bookmark') {
            var tr = $('#xc-bookmark-' + id);
            $('input[name=items]', tr).attr('checked', false);
            tr.hide();
          }
          break;
      }
      if (XCSearch.bookmark.processed == XCSearch.bookmark.total) {
        XCSearch.removeBookmarkShowResult();
      }
    });
  };

  XCSearch.removeBookmarkShowResult = function() {
    var page = Drupal.settings.xc_search.page;
    if (page == 'node') { // node
      if (XCSearch.bookmark.success == 1) {
        // display the remove bookmark button, and the bookmarked text, hide the bookmark action
        var form = $('#xc-search-full-action-form');
        $('#bookmarked', form).hide();
        $('.remove-bookmark-action', form).hide();
        $('.bookmark-action', form).show();
      }
    }
    else {
      var message;
      if (XCSearch.bookmark.total == XCSearch.bookmark.success) {
        message = Drupal.t('Successfully removed <strong>!total bookmark.</strong>',
          {'!total': XCSearch.bookmark.total});
      }
      else if (XCSearch.bookmark.failed == 0) {
        message = Drupal.t('Successfully removed <strong>!success bookmark.</strong> Already removed <strong>!already bookmark.</strong>',
          {'!success': XCSearch.bookmark.success,
            '!already': XCSearch.bookmark.already
          });
      }
      else {
        message = Drupal.t('Successfully removed <strong>!success bookmark.</strong> Already removed <strong>!already bookmark.</strong> Failed to remove <strong>!failed bookmark.</strong>',
          {'!success' : XCSearch.bookmark.success,
            '!already': XCSearch.bookmark.already,
            '!failed':   XCSearch.bookmark.failed
          });
      }
      var target = $('#xc-bookmark-notification .content');
      target.html(message).parent.show();
    }
  };

  /**
   * Show the result of bookmark action
   */
  XCSearch.bookmarkShowResult = function() {
    var is_node = ((typeof Drupal.settings.xc_search.node_id != "undefined"));
    if (is_node) { // node
      // display the remove bookmark button, and the bookmarked text, hide the bookmark action
      var form = $('#xc-search-full-action-form');
      $('#bookmarked', form).show();
      $('.remove-bookmark-action', form).show();
      $('.bookmark-action', form).hide();
    }
    else { // SERP
      var target = $('#xc-bookmark-notification .content');
      var message;
      if (XCSearch.bookmark.total == XCSearch.bookmark.success) {
        message = Drupal.t('Successfully bookmarked <strong>!total items.</strong>',
          {'!total': XCSearch.bookmark.total});
      }
      else if (XCSearch.bookmark.failed == 0) {
        message = Drupal.t('Successfully bookmarked <strong>!success items.</strong> Already bookmarked <strong>!already items.</strong>',
          {'!success': XCSearch.bookmark.success,
            '!already': XCSearch.bookmark.already
          });
      }
      else {
        message = Drupal.t('Successfully bookmarked <strong>!success items.</strong> Already bookmarked <strong>!already items.</strong> Failed to bookmark <strong>!failed items.</strong>',
          {'!success' : XCSearch.bookmark.success,
            '!already': XCSearch.bookmark.already,
            '!failed':   XCSearch.bookmark.failed
          });
      }
      target.html(message).parent().show();
    } // SERP
  };


  /**
   * Get the selected items in a search result list
   */
  XCSearch.getSelectedItems = function() {
    var selectedItems = [];
    $('input[name=items]').each(function() {
      if (this.checked) {
        selectedItems.push(this.value);
      }
    });
    return selectedItems;
  };

  XCSearch.openWorldCatIdentity = function(sURL) {
    $.get(Drupal.settings.xc_search.open_worldcat_identity_url, {'sURL': sURL},
        function(data) {
      document.location = data.url;
    });
  };

  /**
   * Show more and show less links on abstract pages
   */
  XCSearch.showMore = function(that, id) {
    var less = $('#text_exposed_less_' + id);
    var more = $('#text_exposed_more_' + id);
    if (less.hasClass('text_exposed_show')) {
      XCSearch.hide(less);
      XCSearch.show(more);
      $(that).removeClass('read_more');$(that).addClass('read_less');
      $(that).html(Drupal.t('Read less'));
    }
    else {
      XCSearch.hide(more);
      XCSearch.show(less);
      $(that).removeClass('read_less');$(that).addClass('read_more');
      $(that).html(Drupal.t('Read more'));
    }
    return false;
  };

  XCSearch.show = function(el) {
    el.removeClass('text_exposed_hide');el.addClass('text_exposed_show');
  };

  XCSearch.hide = function(el) {
    el.removeClass('text_exposed_show');el.addClass('text_exposed_hide');
  };

  XCBrowse.showContent = function() {
    var content = $('.xc-navigation-bar-content2');
    if (content.hasClass('text_exposed_hide')) {
      XCSearch.show(content);
    }
    else {
      XCSearch.hide(content);
    }
    return false;
  };

  /** kyushu add
   * Get children information and insert it into HTML
   * @param node_id
   *   The node id of the item in a search result list
   * @param ncip_id
   *   The NCIP server ID
   * @param bib_id
   *   The bib ID of the item in a search result list
   */
  XCSearch.getChildrenAll = function(node_id, provider_id, bib_ids) {
    var options = {
      'provider_id': provider_id,
      'bib_ids'    : bib_ids,
      'token'      : Drupal.settings.xc_search.token
    };
    $.get(Drupal.settings.xc_search.child_url, options, function(result){
      /*var result = Drupal.parseJson(response);*/
      if (result.count == 0 || result.count == null) {
        $('fieldset#children').fadeOut(1000);
      } else {
        $('#xc-children' ).html(result.content).fadeIn(1000);
      }
    });
  };
  XCSearch.getChildren = function(node_id, provider_id, bib_ids) {
    var options = {
      'provider_id': provider_id,
      'bib_ids'    : [ bib_ids ],
      'token'      : Drupal.settings.xc_search.token,
      'node_id'    : node_id
    };
    $.get(Drupal.settings.xc_search.child_url, options, function(result){
      /*var result = Drupal.parseJson(response);*/
      if (result.count == 0 || result.count == null) {
        $('tr#xc-child-column-' + node_id).fadeOut(1000);
      } else {
        $('tr#xc-child-column-' + node_id).show();
        //$('#xc-availability-column-' + node_id).fadeOut(1000);
        $('td#xc-child-' + node_id).hide();
        $('td#xc-child-' + node_id).html(result.content).fadeIn(1000);
        var showMore_num  = $('#showMoreChild-' + node_id).attr('value');
// mantis:1071        
//          $('#child-' + node_id ).click(function () {
          $('#childSimple-' + node_id ).click(function () {             
          if (showMore_num == 0) {
            var i = 1;
            while (i < result.count){
             toggle_row('childDetail-' + node_id + '-' + i);
              i = i + 1;
            }
            toggle_row('childLess-' + node_id );
            toggle_row('childSimple-' + node_id );
            showMore_num = 1;
          }else{
            var i = 1;
            while (i < result.count){
              toggle_row('childDetail-' + node_id + '-' + i);
              i = i + 1;
            }
            toggle_row('childLess-' + node_id );
            toggle_row('childSimple-' + node_id );
            showMore_num = 0;
          }
         });
// mantis:1071
          $('#childLess-' + node_id ).click(function () {             
          if (showMore_num == 0) {
            var i = 1;
            while (i < result.count){
             toggle_row('childDetail-' + node_id + '-' + i);
              i = i + 1;
            }
            toggle_row('childLess-' + node_id );
            toggle_row('childSimple-' + node_id );
            showMore_num = 1;
          }else{
            var i = 1;
            while (i < result.count){
              toggle_row('childDetail-' + node_id + '-' + i);
              i = i + 1;
            }
            toggle_row('childLess-' + node_id );
            toggle_row('childSimple-' + node_id );
            showMore_num = 0;
          }
         });
      }
    });
  };

  /**
   * Show more and show less links on abstract pages
   */
  XCSearch.ShowMore = function(that, id, cnt, label, hidelabel) {
    var less = $('#text_exposed_less_' + id);
    var more = $('#text_exposed_more_' + id);
    if (less.hasClass('text_exposed_show')) {
      XCSearch.hide(less);
      XCSearch.show(more);
      $(that).removeClass('read_more');$(that).addClass('read_less');
      if(hidelabel){
          $(that).html(Drupal.t(hidelabel));
      }
      else{
          $(that).html(Drupal.t('Show less'));
      }
    }
    else {
      XCSearch.hide(more);
      XCSearch.show(less);
      $(that).removeClass('read_less');$(that).addClass('read_more');
      if(cnt){
        if(label){
                $(that).html(Drupal.t(label) + '&nbsp;(' + cnt + ')');
        }
        else{
                $(that).html(Drupal.t('Show more') + '&nbsp;(' + cnt + ')');
        }
      }
      else{
        if(label){
                $(that).html(Drupal.t(label));
        }
        else{
                $(that).html(Drupal.t('Show more'));
        }
      }
    }
    return false;
  };

function toggle_row(id)
{
    var obj = document.getElementById(id);
    obj.style.display =
        (obj.style.display == 'none')
        ? '' : 'none';
    return false;
}

  $(document).ready(function(){
    $('.opensearch-action').click(function(){
      window.location = Drupal.settings['basePath']+Drupal.settings['swflang']+ '/opensearch/xc_search/' + document.location.pathname.split('/').slice(-1)  + window.location.search;
      return false;
    });
  });
$(document).ready(function()
{
   // Use the each() method to gain access to each elements attributes
   // $('#parmalink-action,#tooltip_result-list').each(function() mantis:1403
   $('#tooltip_result-list').each(function()
   {
      $(this).qtip(
      {
         position: {
            corner: {
               target: 'rightMiddle', // Position the tooltip above the link
               tooltip: 'leftMiddle'
            },
            adjust: {
               screen: true // Keep the tooltip on-screen at all times
            }
         },
         show: {
            when: 'click',
            solo: true // Only show one tooltip at a time
         },
         hide: 'unfocus',
         style: {
            tip: true, // Apply a speech bubble tip to the tooltip at the designated tooltip corner
            border: {
               width: 0,
               radius: 4,
                           color:"#84043D"
            },
            name: 'light', // Use the default light style
            width: 300, // Set the tooltip width
                        background:"#FFF",
                        color:"#222",
                        cursor:"pointer"
         }
      })
   });
});
// add mantis:1403  
$(document).ready(function()
{
   // Use the each() method to gain access to each elements attributes
   $('#parmalink-action').each(function()
   {
      $(this).qtip(
      {
         content: {
           text: $('#parmalink-action2').val()
         },
         position: {
            corner: {
               target: 'rightMiddle', // Position the tooltip above the link
               tooltip: 'leftMiddle'
            },
            adjust: {
               screen: true // Keep the tooltip on-screen at all times
            }
         },
         show: {
            when: 'click',
            solo: true // Only show one tooltip at a time
         },
         hide: 'unfocus',
         style: {
            tip: true, // Apply a speech bubble tip to the tooltip at the designated tooltip corner
            border: {
               width: 0,
               radius: 4,
                           color:"#84043D"
            },
            name: 'light', // Use the default light style
            width: 300, // Set the tooltip width
                        background:"#FFF",
                        color:"#222",
                        cursor:"pointer"
         }
      })
   });
});
// end mantis:1403


    /**
   * Get Recipt information and insert it into HTML
   * @param node_id
   *   The node id of the item in a search result list
   * @param ncip_id
   *   The NCIP server ID
   * @param bib_id
   *   The bib ID of the item in a search result list
   */
  /* 受入情報(詳細画面)
  XCSearch.getRecipt = function(node_id, provider_id, bib_ids) {

    var options = {
      'provider_id': provider_id,
      'bib_ids'    : [ bib_ids ],
      'token'      : Drupal.settings.xc_search.token
    };
    $.get(Drupal.settings.xc_search.ncip_recipt_url, options, function(response) {
      var result = Drupal.parseJson(response);

      if (result.status==0) {
        $('td#xc-recipt')
        .html(response)
        .fadeIn(1000);
        return false;
      }
      if (result.status==-1) {
        // NCIPサーバエラーの場合
        $('td#xc-recipt')
        .html('Recipt Unknown.')
        .fadeIn(1000);
        return false;
      }

      if (result.count == 0){
        // 正常 0件
        $('tr#recipt').fadeOut(1000);
        return false;
      }

      if (result.recipt) {
        $('td#xc-recipt').hide();
        $('td#xc-recipt').html(result.recipt).fadeIn(1000);
      } else {
        $('tr#recipt').fadeOut(1000);
      }

    });
  };
  $(document).ready(function(){
	    $('.opensearch-action').click(function(){
	      window.location = Drupal.settings['basePath']+Drupal.settings['swflang']+ '/opensearch/xc_search/' + document.location.pathname.split('/').slice(-1)  + window.location.href.slice(window.location.href.indexOf('?'));
	      return false;
	    });
	  });*/
})(jQuery);

