
import { LayoutType } from "sap/f/library";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import BaseController from "../BaseController";
import { routerArguments } from "../../type/User";
import { ScimUser } from "webapp/type/scim-user";
import Filter from "sap/ui/model/Filter";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";

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

    onSearchRoleCollection(e: Event) {
        const value : string = e.getParameter("query");
        const table = this.getView().byId("roleTable") as Table;
        const filters : Filter[] = [];
        if(value) filters.push(new Filter("value","Contains",value));
    
        const filter = new Filter({
            filters :filters,
        });
        
        (table.getBinding("items") as JSONListBinding).filter(filter);
    }

    onOpenSortDialog() {
        
    }
    sortConfirm(){

    }
}

