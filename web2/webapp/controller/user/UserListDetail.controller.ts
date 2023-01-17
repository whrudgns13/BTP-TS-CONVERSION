
import { LayoutType } from "sap/f/library";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "../BaseController";
import { routerArguments } from "./User";


/**
 * @namespace com.myorg.userInformation.controller.user
 */
export default class UserListDetail extends BaseController {

	viewModel: JSONModel;
    onInit(){
        this.getRouter().attachRoutePatternMatched(this.onRouteMatched,this);
    }

    async onRouteMatched(e : Event){
        const arg : routerArguments = e.getParameter("arguments");
        if(!arg.userId) return;
        const user = await (await fetch(`/app/users/id/${arg.userId}`)).json();
        this.setModel(new JSONModel(user),"ViewModel");
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

