    var str = window.parent.location.pathname.toLowerCase();

    var n_eu = '/topics/regions/europe';
    var n_af = '/topics/regions/africa';
    var n_me = '/topics/regions/middleeast';

    var n_as = '/topics/regions/asia';

    var id_opinion = '/indepth/Opinion';
    var id_features = '/indepth/features';
    var id_pics = '/indepth/inpictures';
    var id_interactive = '/indepth/interactive';
    
    var sp = '/topics/categories/sport';
    var sp_fo = '/topics/subjects/football';
    var sp_us = '/topics/subjects/us-sports';
    var sp_cr = '/topics/subjects/cricket';

    var sp_for = '/topics/subjects/formula-one';
    var sp_go = '/topics/subjects/golf';

    var sp_t = '/topics/subjects/tennis';

    var pr = '/programmes';
    var pr_101east = '/programmes/101east';
    var pr_instory = '/programmes/insidestory';
    var pr_witness = '/programmes/witness';
    var pr_pandp = '/programmes/peopleandpower';
    var pr_listpost = '/programmes/listeningpost';
    var hummanrights = '/topics/categories/human_rights';
    var we = '/topics/categories/weather';
    var wn = '/watch_now';

    var inv = '/investigations'
    var section = 'news';

    if (str.indexOf(n_eu, 0) > -1) {
        section = '/topics/regions/europe';
                                
    } else if (str.indexOf(n_af, 0) > -1) {
        section = '/topics/regions/africa';
                                
    } else if (str.indexOf(n_me, 0) > -1) {
        section = '/topics/regions/middleeast';
                                
    } else if (str.indexOf(id_opinion, 0) > -1) {
        section = '/indepth/Opinion';
    } 
                else if (str.indexOf(id_features, 0) > -1) {
        section = 'indepth/features';
    } 
                else if (str.indexOf(id_interactive, 0) > -1) {
        section = 'indepth/interactive';
    } 
                else if (str.indexOf(id_pics, 0) > -1) {
        section = 'indepth/inpictures';
    }  
                else if (str.indexOf(hummanrights, 0) > -1) {
        section = '/topics/categories/human_rights';
     }		else if (str.indexOf(sp, 0) > -1) {
        section = '/topics/categories/sport';

    }
                else if (str.indexOf(sp_us, 0) > -1) {
        section = '/topics/subjects/us-sports';

    }
                else if (str.indexOf(sp_cr, 0) > -1) {
        section = '/topics/subjects/cricket';

    }    else if (str.indexOf(sp_for, 0) > -1) {
       section = '/topics/subjects/formula-one';

    }
                else if (str.indexOf(sp_go, 0) > -1) {
        section = '/topics/subjects/golf';

    }
                else if (str.indexOf(sp_t, 0) > -1) {
        section = '/topics/subjects/tennis';

    }
                else if (str.indexOf(sp_fo, 0) > -1) {
        section = '/topics/subjects/football';

    }
                else if (str.indexOf(inv, 0) > -1) {
        section = 'investigations';

    }          else if (str.indexOf(we, 0) > -1) {
        section = '/topics/categories/weather';
                                
    } else if (str.indexOf(wn, 0) > -1) {
        section = 'watch_now';
                                
    }
                else if (str.indexOf(pr_101east, 0) > -1) {
        section = 'programmes/101east';
                                
    } else if (str.indexOf(pr_instory, 0) > -1) {
        section = 'programmes/insidestory';
                                
    } else if (str.indexOf(pr_witness, 0) > -1) {
        section = 'programmes/witness';
                                
    } else if (str.indexOf(pr_pandp, 0) > -1) {
        section = 'programmes/peopleandpower';
                                
    } else if (str.indexOf(pr_listpost, 0) > -1) {
        section = 'programmes/listeningpost';
                                
    } else if (str.indexOf(pr, 0) > -1) {
        section = 'programmes';

    }



    //Adslot 1 declaration
    gptadslots[1]= googletag.defineSlot('/5287/aljazeera_EN/'+section+'', [[300,250],[250,250],[200,200]],'div-gpt-ad-809429194207278781-1').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);


    googletag.pubads().enableSingleRequest();
    googletag.pubads().enableVideoAds();
    googletag.enableServices();
	
	