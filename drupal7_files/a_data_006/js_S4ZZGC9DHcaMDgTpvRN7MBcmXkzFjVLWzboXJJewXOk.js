(function ($, Drupal, window, document, undefined) {

    Drupal.behaviors.forall_heroes = {
        attach: function (context, settings) {
            if (context === document) {

                var updateImageSrc = function() {
                    var breakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content').replace(/"/g, '');
                    if (typeof(breakpoint) !== "undefined") {
                        var targetItem = $('#field-hero-image img').data(breakpoint);
                        if (typeof(targetItem) !== "undefined") {
                            if (targetItem.length > 0) {
                                $('#field-hero-image img').attr('src', targetItem);
                            }
                        }
                    }
                }

                window.addEventListener('load', updateImageSrc);
                window.addEventListener('resize', updateImageSrc);
            }
        }
    };

})(jQuery, Drupal, this, this.document);
;
