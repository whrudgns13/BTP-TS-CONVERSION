
import { LayoutType } from "sap/f/library";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";
import JSONModel from "sap/ui/model/json/JSONModel";
import UserOverView from "./UserOverView.controller";

/**
 * @namespace com.myorg.userInformation.controller.user
 */
export default class UserList extends UserOverView {
    viewModel : JSONModel;
    
    onInit(){
        this.defaultSetting();
    }
    
    async defaultSetting(){
        const view = this.getView();
        this.getUsers();
        const viewModel = new JSONModel(Object.assign({
            searchCondition : {
                userName : "",
                email : "",
            }
        }));
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
        const path = sap.ui.getCore().byId(e.getParameter("id")).getBindingContext("ComponentModel").getPath();
        this.navTo("list",{
            userId : this.getComponentModel().getProperty(path+"/id"),
            layout : LayoutType.TwoColumnsBeginExpanded
        });
    }
}

