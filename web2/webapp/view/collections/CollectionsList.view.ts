import Text from "sap/m/Text";
import JSView from "sap/ui/core/mvc/JSView";
import CollectionOverView from "../../controller/collections/CollectionOverView.controller";

sap.ui.jsview("com.myorg.userInformation.view.collections.CollectionsList",{
    getControllerName : function(){
        return "com.myorg.userInformation.controller.collections.CollectionsList"
    },
    createContent : function(Controller : CollectionOverView){
        const _self = this as JSView;
        return new Text({text : "CollectionList"});
    }
})