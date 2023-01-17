
import { LayoutType } from "sap/f/library";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "../BaseController";

/**
 * @namespace com.myorg.userInformation.controller.user
 */
export default class UserList extends BaseController {

	viewModel: JSONModel;
    
    onInit(){
        this.defaultSetting();
    }
    
    async defaultSetting(){
        const users = await (await fetch("/app/users")).json();
        const view = this.getView();
        const viewModel = new JSONModel(Object.assign({
            searchCondition : {
                userName : "",
                email : "",
            }
        },{users}));
        view.setModel(viewModel,"ViewModel");
        this.viewModel = viewModel;
    }
    
    async onSearch() {
        const searchCondition = this.viewModel.getProperty("/searchCondition");
        const userName : string = searchCondition.userName;
        const email : string = searchCondition.email;
        const table = this.getView().byId("userTable") as Table;
        const filters : Filter[] = [];

        if(userName) filters.push(new Filter("userName","Contains",userName));
        if(email) filters.push(new Filter("emails/0/value","Contains",email));
    
        const filter = new Filter({
            filters :filters,
            and : true
        });
        
        (table.getBinding("items") as JSONListBinding).filter(filter);
    }
    onOpenDetail(e : Event) {
        const path = sap.ui.getCore().byId(e.getParameter("id")).getBindingContext("ViewModel").getPath();
        this.navTo("list",{
            userId :  this.viewModel.getProperty(path+"/id"),
            layout : LayoutType.TwoColumnsMidExpanded
        });
       // this.setLayout("/users/layout",LayoutType.TwoColumnsMidExpanded)
    }
}

