import MainController from "../controller/Main.controller";
import JSView from "sap/ui/core/mvc/JSView";
import ToolPage from "sap/tnt/ToolPage";
import SideNavigation from "sap/tnt/SideNavigation";
import NavigationList from "sap/tnt/NavigationList";
import NavigationListItem from "sap/tnt/NavigationListItem";
import App from "sap/m/App";
import Button from "sap/m/Button";
import Title from "sap/m/Title";
import ToolHeader from "sap/tnt/ToolHeader";
import Image from "sap/m/Image";

sap.ui.jsview("com.myorg.userInformation.view.Main",{
    getControllerName : function(){
        return "com.myorg.userInformation.controller.Main"
    },
    createContent : function(Controller : MainController){
        const _self = this as JSView;
        _self.setDisplayBlock(true);
        const toolPage = new ToolPage(_self.createId("toolpage"),{
            header : new ToolHeader({
                content : [
                    new Button({
                        icon : "sap-icon://menu2",
                        press : function(){
                            Controller.onExpendedMenu()
                        }
                    }).addStyleClass("menu"),
                    new Image({width : "3rem",src:"https://cockpit.hanatrial.ondemand.com/~1673352428000~/images/sap_logo.svg"}).addStyleClass("menu"),
                    new Title({text : "BTP 관리자"})
                ]
            }),
            sideContent :new SideNavigation(_self.createId("sidebar"),{
                itemSelect : function(event){
                    Controller.onItemSeleted(event)
                },
                item : new NavigationList({
                    items : [
                        new NavigationListItem({text : "Main",icon : "sap-icon://tree"}),
                        new NavigationListItem({text : "User" , key : "user", icon: "sap-icon://employee"}),
                    ]
                })
            }),
            mainContents : [
                new App(_self.createId("app"))
            ]
        });
        
        return toolPage;
    }
})