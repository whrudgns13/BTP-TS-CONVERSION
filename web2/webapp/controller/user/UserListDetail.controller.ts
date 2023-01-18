
import { LayoutType } from "sap/f/library";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "../BaseController";
import { routerArguments } from "../../type/User";
import Control from "sap/ui/core/Control";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import View from "sap/ui/core/mvc/View";
import { ScimUser } from "webapp/type/scim-user";

/**
 * @namespace com.myorg.userInformation.controller.user
 */
export default class UserListDetail extends BaseController {

	onInit(){
        this.getRouter().attachRoutePatternMatched(this.onRouteMatched,this);
    }

    async onRouteMatched(e : Event){
        const arg : routerArguments = e.getParameter("arguments");
        if(arg.userId){
            const componentModel = this.getComponentModel();
            if(!componentModel.getProperty("/users")){
                this.navTo("list",{
                    layout : LayoutType.OneColumn,
                    userId : undefined
                })
                return;
            }

            const users : ScimUser[] = componentModel.getProperty("/users/resources");
            const user = users.find(user=>user.id===arg.userId);
            componentModel.setProperty("/user",user);
        }
    }

    async defaultSetting(){
       
    }
    
    changeLayout(layout : LayoutType){
        this.navTo("list",{layout});
        //this.setLayout("/users/layout",layout)
    }

    onOpenSortDialog() {
        
    }
    sortConfirm(){

    }
}

