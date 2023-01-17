import MainController from "../controller/Main.controller";
import JSView from "sap/ui/core/mvc/JSView";
import ToolPage from "sap/tnt/ToolPage";
import SideNavigation from "sap/tnt/SideNavigation";
import NavigationList from "sap/tnt/NavigationList";
import NavigationListItem from "sap/tnt/NavigationListItem";
import App from "sap/m/App";

sap.ui.jsview("com.myorg.userInformation.view.Main",{
    getControllerName : function(){
        return "com.myorg.userInformation.controller.Main"
    },
    createContent : function(Controller : MainController){
        const _self = this as JSView;
        
        const toolPage = new ToolPage(_self.createId("toolpage"),{
            sideContent :new SideNavigation({
                itemSelect : function(event){
                    Controller.onItemSeleted(event)
                },
                item : new NavigationList({
                    items : [
                        new NavigationListItem({text : "Main"}),
                        new NavigationListItem({text : "User" , key : "user"}),
                    ]
                })
            }),
            mainContents : [
                new App(_self.createId("app"))
            ]
        })
        
        return toolPage;
    }
})