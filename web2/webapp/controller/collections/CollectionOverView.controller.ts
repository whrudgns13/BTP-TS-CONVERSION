import BaseController from "../BaseController";
import Event from "sap/ui/base/Event";
import JSView from "sap/ui/core/mvc/JSView";
import ToolPage from "sap/tnt/ToolPage";
import { LayoutType } from "sap/f/library";

/**
 * @namespace com.myorg.userInformation.controller.collections
 */
export default class Main extends BaseController {
    public onInit() : void {
		this.getRouter().attachRouteMatched(this.onRouterMatched,this);
	}

    onRouterMatched(event : Event){
		const oLayoutModel = this.getModel();
		this.navTo("collectionsList",{
            layout : LayoutType.OneColumn
        })
		
		//oLayoutModel.setProperty("/users/layout",sLayout);
	}
	
}
