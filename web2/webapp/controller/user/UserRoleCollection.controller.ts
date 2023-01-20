import UserOverViewController from "./UserOverView.controller";
import Event from "sap/ui/base/Event";
import JSView from "sap/ui/core/mvc/JSView";
import ToolPage from "sap/tnt/ToolPage";
import { routerArguments } from "webapp/type/User";

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
}
