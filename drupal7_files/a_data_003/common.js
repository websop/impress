var MyJs = (function(myjs) {

    myjs.Misc = (function (misc) {

        //**************
        //function Misc.getQueryStringValue(name)
        //**************
        misc.getQueryStringValue = function (name) {
            if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
                return decodeURIComponent(name[1]);
            }
        };
        return misc;
    }(myjs.Misc || {}));

    myjs.Date = (function (date) {

        //**************
        //function Date.Format(pDate)
        //**************
        date.Format = function (d, pShowTime) {
            var mmm = new Array("January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December");

            //var d = new Date();
            var dd = d.getDate();
            var MM = d.getMonth();
            var yy = d.getFullYear();
            if (pShowTime) {
                var hh = d.getHours();
                var mm = d.getMinutes();
                var ss = d.getSeconds();
                return (dd + " " + mmm[MM].substring(0,3) + ", " + yy + " " + hh + ":" + mm);
                //return (dd + "-" + mmm[MM].substring(0,3) + "-" + yy + " " + hh + ":" + mm + ":" + ss);
            } else {
                return (dd + " " + mmm[MM].substring(0, 3) + ", " + yy);
                //return (dd + "/" + MM + "/" + yy);
            }
        };
        return date;
    }(myjs.Date || {}));

    myjs.Num = (function (num) {
        //**************
        //function Num.PadZero(pDate)
        //**************
        num.PadZero = function (pNum, pSize) {
            var mRet = pNum + "";
            while (mRet.length < pSize) s = "0" + mRet;
            return mRet;
        }
    }(myjs.Num || {}));

    myjs.Window = (function (win) {

        //**************
        //function Window.Alert(Message)
        //**************
        win.Alert = function (pMsg) {
            alertify.set({
                labels: { ok: "Ok"}
            });
            alertify.set({ buttonFocus: "Ok" })
            alertify.alert(pMsg);

        };

        //**************
        //function Window.confirmAction(pMsg, ifYesCallback, ifYesDontCloseShowLoader)
        //**************

        win.confirmAction = function (pMsg, ifYesCallback, ifYesDontCloseShowLoader) {
            alertify.set({ buttonReverse: true });
            alertify.set({ buttonFocus: "cancel" })
            alertify.set({
                labels: { ok: "Yes", cancel: "No" }
            });
            alertify.confirm(pMsg.replace('.', '<br/><br/>'), function (e) {
                if (e) {
                    // user clicked "ok"
                    eval(ifYesCallback);
                    if (ifYesDontCloseShowLoader) {
                        ShowLoader($('.ui-dialog').css("left"), $('.ui-dialog').css("top"), $('.ui-dialog').css("width"), $('.ui-dialog').css("height"), true);
                    } else {
                        //Enable Main Window Scroll
                        $("body").css({ overflow: 'inherit' });
                    }
                } else {
                    // user clicked "cancel"
                    //Enable Main Window Scroll
                    $("body").css({ overflow: 'inherit' });
                }
            });
        };

        //**************
        //function Window.inIframe()
        //**************
        win.inIframe = function () {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        };

        //**************
        //function Window.OpenInWindowOrTab(pUrl, pTitle, pUniqueId,pParentUiObj)
        //**************
        win.OpenInWindowOrTab = function (pUrl, pTitle, pUniqueId, pParentUiObj) {
            if (win.inIframe()) {
                if (pParentUiObj) {
                    pParentUiObj.addTab(pTitle, pUrl, pUniqueId);
                } else {
                    window.parent.addTab(pTitle, pUrl, pUniqueId);
                }
            } else {
                window.open(pUrl, pTitle);//, 'location=no,resizable=1,scrollbars=yes');
            }
        };

        //**************
        //function Window.ShowAjaxLoader(pMsg)
        //**************
        win.ShowAjaxLoader = function (pMsg) {
            var mMsg = "Executing please wait..."
            if (pMsg) {
                if (pMsg.length > 0) {
                    mMsg = pMsg + " please wait...";
                }
            }
            toastr.options = {
                "tapToDismiss": false,
                "closeButton": false,
                "debug": false,
                "positionClass": "toast-center",//toast-top-right,toast-center
                "onclick": null,
                "showDuration": "0",
                "hideDuration": "0",
                "timeOut": "0",
                "extendedTimeOut": "0",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr.info(mMsg);
        };

        //**************
        //function Window.HideAjaxLoader()
        //**************
        win.HideAjaxLoader = function () {
            toastr.clear();
        };

        return win;
    }(myjs.Window || {}));
    return myjs;
}(MyJs || {}));





