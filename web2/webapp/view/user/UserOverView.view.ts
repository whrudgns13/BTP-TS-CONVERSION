import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import Event from "sap/ui/base/Event";
import JSView from "sap/ui/core/mvc/JSView";
import UserOverView from "../../controller/user/UserOverView.controller";
sap.ui.jsview("com.myorg.userInformation.view.user.UserOverView",{
    getControllerName : function(){
        return "com.myorg.userInformation.controller.user.UserOverView"
    },
    createContent : function(Controller : UserOverView){
        const _self = this as JSView;
        return new FlexibleColumnLayout(_self.createId("fcl"),{
            layout : "{/users/layout}",
            stateChange : function(event : Event){
                Controller.onStateChange(event);
            },
        });
    }
})