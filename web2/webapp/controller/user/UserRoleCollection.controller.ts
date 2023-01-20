import UserOverViewController from "./UserOverView.controller";
import Event from "sap/ui/base/Event";
import { routerArguments } from "webapp/type/User";
import Filter from "sap/ui/model/Filter";
import Table from "sap/m/Table";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";

/**
 * @namespace com.myorg.userInformation.controller
 */
export default class UserRoleCollection extends UserOverViewController {
    public onInit(){
        this.getRouter().attachRoutePatternMatched(this.onRouteMatched,this);
    }

    async onRouteMatched(e : Event){
        const arg : routerArguments = e.getParameter("arguments");
        if(arg.collection){
            const collection = await (await fetch(`/app/role-collection/${arg.collection}`)).json();
            const componentModel = this.getComponentModel();
            componentModel.setProperty("/user/collection",collection);
        }
    }

    onCollectionSearch(e : Event){
        const value = e.getParameter("query");
        const table = this.getView().byId("collectionTable") as Table;
        const binding = table.getBinding("items") as JSONListBinding;
        const filters = [];
        if(value){
            filters.push(new Filter("name","Contains",value));
        }
        binding.filter(filters);
    }
}
