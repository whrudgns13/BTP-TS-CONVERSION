import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import JSView from "sap/ui/core/mvc/JSView";
import CollectionOverView from "../../controller/collections/CollectionOverView.controller";
sap.ui.jsview("com.myorg.userInformation.view.collections.CollectionOverView",{
    getControllerName : function(){
        return "com.myorg.userInformation.controller.collections.CollectionOverView"
    },
    createContent : function(Controller : CollectionOverView){
        const _self = this as JSView;
        return new FlexibleColumnLayout(_self.createId("fcl"),{
            layout : "{/collections/layout}",
        });
    }
})