/**
 * @file
 */

(function ($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.keyboard_navigation = {
  attach: function (context, settings) {
    // Use a variable for the breakpoint width to make it easier to change later.
    var breakpoint = 850;
    // Get current width of the window at time of page load.
    var viewingSize = widthCheck();
    // Initialize link position variable.
    var linkPosition = 0;

    /**
     * On window resize, check the width and adjust current mode if necessary.
     */
    $(window).resize(function () {
      viewingSize = widthCheck();
    });

    /**
     * Captures key events that occur in the designated selector.
     */
    $('#block-menu-block-sixteenhundrednav-main').keydown(function (e) {
      // If pressed key wasn't an arrow key, esc, or enter, end here.
      if ([27, 37, 38, 39, 40, 13].indexOf(e.keyCode) == -1) {
        return;
      }
      // Allow users to expand the main menu via any keyboard arrow or enter.
      if ($(document.activeElement).attr('id') == 'main-menu-toggle') {
        $(document.activeElement).click();
        $('a#ui-accordion-1-header-1').trigger('mouseenter').focus();

      }
      // Get the currently focused item. In the case of a menu, it returns
      // the currently focused <a>, so we call .parent() to get the <li>.
      var focused = $(document.activeElement).closest('li');
      switch (e.keyCode) {
        // Escape Key
        case 27:
          $(document.activeElement).blur();
          if (viewingSize == 'mobile') {
            $('#main-menu-toggle').click().focus();
          }
          break;
        // Left arrow key.
        case 37:
          // If in desktop viewing mode.
          if (viewingSize == 'desktop') {
            // At the top level, left/right should move between top level links.
            if (focused.hasClass('depth-1')) {
              prevListItem(focused);
            }
            // At level 3, left/right should you between menus
            else {
              // Determine the position of the current link in the menu.
              linkPosition = focused.attr('data-position');
              // If there is a sibling to jump to.
              if (focused.parents('li.depth-2').prev().length) {
                // If there's a link to jump to of the same level.
                if (focused.parents('li.depth-2').prev().find("ul:first li[data-position=" + linkPosition + "] a").first().length) {
                  focused.parents('li.depth-2').prev().find("ul:first li[data-position=" + linkPosition + "] a").first().trigger('mouseenter').focus();
                }
                // Otherwise jump to the last link in the sibling menu.
                else {
                  focused.parents('li.depth-2').prev().find("ul:first li:last > a").trigger('mouseenter').focus();
                }
              }
            }
          }
          // If in mobile mode, pressing left should jump to the top parent.
          else {
            // When jumping to the top level, close all accordions.
            $('#block-menu-block-sixteenhundrednav-main').find('.menu-block-wrapper > ul.menu').accordion("option", "active", false);
            topParent(focused);
          }

          // Prevent default behaviors. Arrow keys typically move the page.
          // Appears in all cases for the same reason.
          e.preventDefault();
          e.stopPropagation();
          break;

        // Up arrow key.
        case 38:
          // If focus is inside a multicolumn layout, the focus needs to traverse
          // the columns.
          if (!focused.prev().length && focused.parents('ul.menu-featured__column').length) {
            if (focused.parent('ul.menu-featured__column').first().prev().length) {
                focused.parent('ul.menu-featured__column').first().prev().find('li:last a').first().trigger('mouseenter').focus();
            }
          }
          // If in desktop viewing mode.
          if (viewingSize == 'desktop') {
            // At the top level in desktop, pressing up should do nothing.
            if (focused.hasClass('depth-1')) {
              return;
            }
            // Otherwise, pressing up should move up the current list of LI's,
            // or if already at the top of the list, it should jump up to the
            // parent UL.
            else {
              if (focused.hasClass('first')) {
                topParent(focused);
              }
              else {
                prevListItem(focused);
              }
            }
          }
          // If in mobile viewing mode.
          else {
            if (focused.hasClass('depth-1')) {
              prevListItem(focused);
            }
            // If at the top of a list.
            else if (focused.hasClass('first')) {
              // If there's a previous sibling list.
              if (focused.parents('li.depth-2').prev().length != 0) {
                // Jump to the last link in the previous sibling list.
                focused.parents('li.depth-2').prev().find('li.depth-3.last a').first().trigger('mouseenter').focus();
              }
              // If at the top of the top list, it should find the top level
              // parent.
              else {
                topParent(focused);
              }
            }
            // If inside an existing list and not at the top, go up one item.
            else {
              prevListItem(focused);
            }
          }

          e.preventDefault();
          e.stopPropagation();
          break;

        // Right arrow key.
        case 39:
          // If in desktop viewing mode.
          if (viewingSize == 'desktop') {
            // At the top level, left/right should move between top level links.
            if (focused.hasClass('depth-1') || focused.hasClass('depth-2')) {
              nextListItem(focused);
            }
            // Otherwise, it should move to the child UL.
            else {
              // Determine the position of the current link in the menu.
              linkPosition = focused.attr('data-position');
              // If there is a sibling to jump to.
              if (focused.parents('li.depth-2').next().length) {
                // If there's a link to jump to of the same level.
                if (focused.parents('li.depth-2').next().find("ul:first li[data-position=" + linkPosition + "] > a").length) {
                  focused.parents('li.depth-2').next().find("ul:first li[data-position=" + linkPosition + "] > a").trigger('mouseenter').focus();
                }
                // Otherwise jump to the last link in the sibling menu.
                else {
                  focused.parents('li.depth-2').next().find("ul:first li:last > a").trigger('mouseenter').focus();
                }
              }
            }
          }
          // If in mobile viewing mode.
          else {
            if (focused.hasClass('depth-1')) {
              // Determine the position of the current item.
              var position = (focused.attr('data-position')) - 1;
              // Expand the accordion in question.
              $('#block-menu-block-sixteenhundrednav-main').find('.menu-block-wrapper > ul.menu').accordion("option", "active", position);
            }
            focused.find('li.depth-2.first li.depth-3.first a').trigger('mouseenter').focus();
          }
          e.preventDefault();
          e.stopPropagation();
          break;

        // Down arrow key.
        case 40:
          // If focus is inside a multicolumn layout, the focus needs to traverse
          // the columns.
          if (!focused.next().length && focused.parents('ul.menu-featured__column').length) {
            if (focused.parent('ul.menu-featured__column').first().next().length) {
              focused.parent('ul.menu-featured__column').first().next().find('li:first a').first().trigger('mouseenter').focus();
            }
          }
          // If in desktop viewing mode.
          if (viewingSize == 'desktop') {
            // At the top level, pressing down should descend to a child UL.
            if (focused.hasClass('depth-1') || focused.hasClass('depth-2')) {
              listDescend(focused);
            }
            // Otherwise, it should move to the next LI.
            else {
              nextListItem(focused);
            }
          }
          // If in mobile viewing mode.
          else {
            if (focused.hasClass('depth-1')) {
              nextListItem(focused);
            }
            else if (focused.hasClass('last')) {
              if (focused.parents('li.depth-2').next().length != 0) {
                focused.parents('li.depth-2').next().find('li.depth-3.first > a').trigger('mouseenter').focus();
              }
            }
            else {
              nextListItem(focused);
            }
          }
          e.preventDefault();
          e.stopPropagation();
          break;
      }
    });

    /**
     * Selects the previous list item in the current list.
     */
    function prevListItem(focused) {
      focused.prev().find('a').first().trigger('mouseenter').focus();
    }

    /**
     * Selects the next list item in the current list.
     */
    function nextListItem(focused) {
      focused.next().find('a').first().trigger('mouseenter').focus();
    }

    /**
     * If the current li has a child list, select the first item in that list.
     */
    function listDescend(focused) {
      if (focused.children('ul').length) {
        focused.find('ul:first li:first a:first').trigger('mouseenter').focus();
      }
    }

    /**
     * If the current list has a parent list, jump to the parent LI.
     */
    function listAscend(focused) {
      if (focused.parent('ul').length) {
        focused.parent('ul').siblings('a').trigger('mouseenter').focus();
      }
    }

    /**
     * Jumps to the top level parent of a given link. Used only in mobile mode
     * at this time.
     */
    function topParent(focused) {
      focused.parents('li.depth-1').children('a').trigger('mouseenter').focus();
    }

    /**
     * Checks width of the browser.
     * @return {string}
     *   Desktop or mobile width.
     */
    function widthCheck() {
      if (document.documentElement.clientWidth >= breakpoint) {
        return 'desktop';
      }
      else {
        return 'mobile';
      }
    }
  }
};

})(jQuery, Drupal, this, this.document);
;
(function ($) {
    Drupal.behaviors.media_preview_sizer = {
        attach: function (context, settings) {
            //add in slider support for image sizing in the library
            //find the exposed filters and add the slider inline with them
            $(".media-browser-wrapper .views-exposed-form .views-exposed-widgets").once('media_preview_sizer').append("<div class='views-exposed-widget slide-widget'><label>Image Size</label><div class='slide-image'></div></div>");
            var valued = (!localStorage.getItem("slideWidth")) ? 200 : localStorage.getItem("slideWidth");
            //set a default CSS size for the list items
            $('#media-browser-library-list li').css('width', localStorage.getItem('slideWidth') + 'px');
            //using a preset image style with a max width of 300, set the minimum and starting value
            $('.slide-image').once('media_preview_sizer').slider({
                value: valued,
                min: 100,
                max: 300,
                step: 2,
                //when the slider moves, resize the image according to the px amount
                slide: function (event, ui) {
                    //store value in localstorage
                    localStorage.setItem('slideWidth', ui.value);
                    $('#media-browser-library-list li').css('width', localStorage.getItem('slideWidth') + 'px');
                }
            });
        }
    };
}(jQuery));
;
(function ($) {

 Drupal.behaviors.panopolyMagic = {
   attach: function (context, settings) {

     /**
      * Title Hax for Panopoly
      *
      * Replaces the markup of a node title pane with
      * the h1.title page element
      */
     if ($.trim($('.pane-node-title .pane-content').html()) == $.trim($('h1.title').html())) {
       $('.pane-node-title .pane-content').html('');
       $('h1.title').hide().clone().prependTo('.pane-node-title .pane-content');
       $('.pane-node-title h1.title').show();
     }

   }
 }

})(jQuery);

(function ($) {

  /**
   * Improves the Auto Submit Experience for CTools Modals
   */
  Drupal.behaviors.panopolyMagicAutosubmit = {
    attach: function (context, settings) {
      // Replaces click with mousedown for submit so both normal and ajax work.
      $('.ctools-auto-submit-click', context)
      // Exclude the 'Style' type form because then you have to press the
      // "Next" button multiple times.
      // @todo: Should we include the places this works rather than excluding?
      .filter(function () { return $(this).closest('form').attr('id').indexOf('panels-edit-style-type-form') !== 0; })
      .click(function(event) {
        if ($(this).hasClass('ajax-processed')) {
          event.stopImmediatePropagation();
          $(this).trigger('mousedown');
          return false;
        }
      });

      // 'this' references the form element
      function triggerSubmit (e) {
        var $this = $(this), preview_widget = $('.widget-preview', context);
        if (!preview_widget.hasClass('panopoly-magic-loading')) {
          preview_widget.addClass('panopoly-magic-loading');
          $this.find('.ctools-auto-submit-click').click();
        }
      }

      // e.keyCode: key
      var discardKeyCode = [
        16, // shift
        17, // ctrl
        18, // alt
        20, // caps lock
        33, // page up
        34, // page down
        35, // end
        36, // home
        37, // left arrow
        38, // up arrow
        39, // right arrow
        40, // down arrow
         9, // tab
        13, // enter
        27  // esc
      ];

      // Special handling for link field widgets. This ensures content which is ahah'd in still properly autosubmits.
      $('.field-widget-link-field input:text', context).addClass('panopoly-textfield-autosubmit').addClass('ctools-auto-submit-exclude');

      // Handle text fields and textareas.
      var timer;
      $('.panopoly-textfield-autosubmit, .panopoly-textarea-autosubmit', context)
      .once('ctools-auto-submit')
      .bind('keyup blur', function (e) {
        var $element;
        $element = $('.widget-preview .pane-title', context);

        clearTimeout(timer);

        // Filter out discarded keys.
        if (e.type !== 'blur' && $.inArray(e.keyCode, discardKeyCode) > 0) {
          return;
        }

        // Special handling for title elements.
        if ($element.length && $(e.target).parent('.form-item-title,.form-item-widget-title').length) {

          // If all text was removed, remove the existing title markup from the dom.
          if (!$(e.target).val().length) {
            $('.widget-preview .pane-title', context).remove();
          }
          // Insert as link title text if the title is a link.
          else if ($('a', $element).length) {
            $('a', $element).html($(e.target).val());
          }
          // Otherwise just insert the form value as-is.
          else {
            $element.html($(e.target).val());
          }
        } 
        // Automatically submit the field on blur. This won't happen if title markup is already present.
        else if (e.type == 'blur') {
          triggerSubmit.call(e.target.form)
        }
        // If all else fails, just trigger a timer to submit the form a second after the last activity.
        else {
          timer = setTimeout(function () { triggerSubmit.call(e.target.form); }, 1000);
        }
      });
  
      // Handle autocomplete fields.
      $('.panopoly-autocomplete-autosubmit', context)
      .once('ctools-auto-submit')
      .blur(function (e) {
        triggerSubmit.call(e.target.form);
      });

      // Prevent ctools auto-submit from firing when changing text formats.
      $(':input.filter-list').addClass('ctools-auto-submit-exclude');

    }
  }
})(jQuery);
;
(function ($) {

 Drupal.behaviors.PanelsAccordionStyle = {
   attach: function (context, settings) {
     for ( region_id in Drupal.settings.accordion ) {
    		var accordion = Drupal.settings.accordion[region_id] ;
		    jQuery('#'+region_id).accordion(accordion.options);
  	 }
   }
  }

})(jQuery);
;
