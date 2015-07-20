jQuery(function() {
    
    var valid_mail = Drupal.t('Please enter email-id');
    var plswait = Drupal.t('Please Wait...');
    var err_oc = Drupal.t('Error occurred');
    var thanks = Drupal.t('Thank you for signing up. Your email confirmation has been sent.');
    
    jQuery('#artinfo_subscribe_newsmc').submit(function(){
        if(jQuery('#MERGE0').val()==''){
            jQuery('#mcmsg').remove();
            jQuery('#artinfo_subscribe_newsmc #MERGE0').before('<span id="mcmsg" class="errorsc">'+valid_mail+'</span>');
            setTimeout('doFadeOut();', 4000);
            return false;
        }
        
        var data = jQuery(this).serialize();
        jQuery.ajax({
            type: "POST",
            dataType:'json',
            url: Drupal.settings.basePath+"ai_mailchimp/mailc_ajax_req",
            data: data,
            beforeSend:function(){
                jQuery('#mcmsg').remove();
                jQuery('#artinfo_subscribe_newsmc #MERGE0').before('<span id="mcmsg" class="sendingsc">'+plswait+'</span>');
            },
            error:function(){
                 jQuery('#mcmsg').remove();
                 jQuery('#artinfo_subscribe_newsmc #MERGE0').before('<span id="mcmsg" class="errorsc">'+err_oc+'</span>');
                 setTimeout('doFadeOut();', 4000);
            },
            success:function( msg ) {
                jQuery('#mcmsg').remove();
                if(msg.success){
                    //jQuery('#artinfo_subscribe_newsmc #MERGE0').before('<span id="mcmsg" class="successsc">'+Drupal.t(msg.msg)+'</span>');
                    //jQuery('.ai-digest .newsfooter_'+msg.lang).css('background-image',"url('"+Drupal.settings.basePath+"sites/all/themes/vsc_artinfo/img/newsletter-block/ai_newsletter_design-"+msg.lang+".jpg')");
                    jQuery('#newsletter-signup-inner-art newsletter-signup-inner').remove();
                    jQuery('#newsletter-signup-inner-art').html('<div id="mcmsg" class="successsc">'+thanks+'</div>').show();
                    
                    
                }else{
                    if(msg.url !='')
                    window.location.href = msg.url;
                    else
                    jQuery('#artinfo_subscribe_newsmc #MERGE0').before('<span id="mcmsg" class="errorsc">'+Drupal.t(String(msg.error))+'</span>');
                    setTimeout('doFadeOut();', 4000);   
                 }
                
                
                }
            });
        return false;
    });
    
    jQuery('#artinfo_subscribe_newsft').submit(function(){
        if(jQuery('#artinfo_subscribe_newsft #MERGE0').val()==''){
            jQuery('#mcmsg').remove();
            jQuery('#artinfo_subscribe_newsft #MERGE0').before('<span id="mcmsg" class="errorsc">'+valid_mail+'</span>');
            setTimeout('doFadeOut();', 4000);
            return false;
        }
        
        var data = jQuery(this).serialize();
        jQuery.ajax({
            type: "POST",
            dataType:'json',
            url: Drupal.settings.basePath+"ai_mailchimp/mailc_ajax_req",
            data: data,
            beforeSend:function(){
                jQuery('#mcmsg').remove();
                jQuery('#artinfo_subscribe_newsft #MERGE0').before('<span id="mcmsg" class="sendingsc">'+plswait+'</span>');
            },
            error:function(){
                 jQuery('#mcmsg').remove();
                 jQuery('#artinfo_subscribe_newsft #MERGE0').before('<span id="mcmsg" class="errorsc">'+err_oc+'</span>');
                 setTimeout('doFadeOut();', 4000);
            },
            success:function( msg ) {
                jQuery('#mcmsg').remove();
                if(msg.success){
                    //jQuery('#artinfo_subscribe_newsft #MERGE0').before('<span id="mcmsg" class="successsc">'+Drupal.t('Thank you for signing up!')+'</span>');
                    //jQuery('#block-ai-footer-ai-footer-subscribe .subscribe-text').hide();
                    //jQuery('#block-ai-footer-ai-footer-subscribe .newsletter-signup .subscribe-text').after('<span id="mcmsg" class="successsc">'+Drupal.t('Thank you for signing up!')+'</span>');
                    jQuery('#block-ai-footer-ai-footer-subscribe .newsletter-signup').html('');
                    jQuery('#block-ai-footer-ai-footer-subscribe .newsletter-signup').html('<div id="mcmsg" class="successsc">'+thanks+'</div>');
                    
                    
                }else{
                    if(msg.url !='')
                    window.location.href = msg.url;
                    else
                    jQuery('#artinfo_subscribe_newsft #MERGE0').before('<span id="mcmsg" class="errorsc">'+Drupal.t(String(msg.error))+'</span>');
                        
                }
                //setTimeout('doFadeOut();', 4000);
                
                }
            });
        return false;
    });
    
    /*  For #1150 */
    
    jQuery('#mc-embedded-subscribe').click(function() {
        var email = escape(jQuery('#mce-EMAIL').val());
                    if(email==''){
                        jQuery('#mce-EMAIL').css('border','1px solid #EF1F1F');
                        return false;
                }
	     var jqxhr = jQuery.get('/ai_mailchimp/check_subscriber_info'+'/'+escape(jQuery('#l_id').val())+'/'+escape(jQuery('#mce-EMAIL').val())+'/'+'true',function(data){
                    
                    if(data && data !='false' && data.success=='1'){
                        jQuery('#mc-embedded-subscribe-form').attr('action','http://blouinartinfo.us1.list-manage.com/profile?u=' + escape(jQuery('#u_name').val()) + '&id='+ escape(jQuery('#l_id').val()) + '&e='+data.data[0].euid);
                   jQuery('#mc-embedded-subscribe-form').submit();
                    }else{
                        jQuery('#mc-embedded-subscribe-form').submit();
                    }
                   
                },'json');
     
                });
    
});

function doFadeOut(){
    jQuery('#mcmsg').fadeOut(1600);
}

;
