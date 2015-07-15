(function ($) {
  Drupal.behaviors.social_shareFacebookSDK = {
    attach: function (context) {

      // Include the Facebook Javascript SDK. For more information, see:
      // https://developers.facebook.com/docs/javascript/quickstart/v2.0
      window.fbAsyncInit = function() {
        FB.init({
          appId      : Drupal.settings.socialShare.appID,
          xfbml      : true,
          version    : 'v2.0'
        });
      };

      (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk')
      );
      // End of Facebook Javascript SDK.

      // Add fb-root to the DOM.
      var fb_root = document.createElement("div");
      var a = document.createAttribute("id");
      a.value = "fb-root";
      fb_root.setAttributeNode(a);
      document.body.appendChild(fb_root);
    }
  };
})(jQuery);
;
/**
 * @file
 * Javascript behaviors for the ForAll Webforms module.
 */

(function ($) {
    Drupal.behaviors.forall_webforms = {
        attach: function (context, settings) {
            // Google Analytics tracking for all Webform submissions:
            $('.webform-client-form .form-actions input[type="submit"]').click(function() {
                var thisWebform = $(this).parents('.webform-client-form').prop('id');
                var webformID = 'Submit button clicked on '.concat(thisWebform);

                _gaq.push(['_trackEvent', 'Webform', 'Clicked', webformID ]);
            });
        }
    };

    Drupal.behaviors.forall_webforms_goto_link = {
        attach: function (context, settings) {
            // Opens links with class forall-webforms-goto-link in new window.
            $('a.forall-webforms-goto-link', context).click(function(){
                var href = $(this).attr('href');
                window.open(href, 'newwindow', 'width=600, height=450');
                return false;
            });
        }
    };

    Drupal.behaviors.forall_webforms_file_handler = {
        attach: function (context, settings) {

            // We only want to detach the file button behavior on webforms.
            // It conflicts with webforms_ajax and prevents files from being
            // uploaded.

            // See https://www.drupal.org/node/2188487 and
            // https://www.drupal.org/node/1513200
            //
            // Note:
            // https://www.drupal.org/node/1513200#comment-9022839 did not solve
            // the issue in our case.
            var webformsOnPage = $('.webform-client-form', context);
            var fileButtonsOnPage = Drupal.behaviors.fileButtons != undefined;

            if(webformsOnPage.length > 0 && fileButtonsOnPage){
                Drupal.behaviors.fileButtons.detach(webformsOnPage);
            }
        }
    };

})(jQuery);
;
