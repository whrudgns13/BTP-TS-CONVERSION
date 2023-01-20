import { LayoutType } from "sap/f/library";
import Event from "sap/ui/base/Event";
import BaseController from "../BaseController";
import { routerArguments } from "../../type/User";
import { RoleCollection } from "webapp/type";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.myorg.userInformation.controller.user
 */

export default class UserOverView extends BaseController {
    routeName : string;
	
	public onInit() : void {
		this.getRouter().attachRouteMatched(this.onRouterMatched,this);
	}

	getComponentModel(){
		return this.getView().getModel("ComponentModel") as JSONModel;
	}
	
	async getCollection(){
		const componentModel = this.getComponentModel();
        let roleCollections : RoleCollection[] = await (await fetch("/app/role-collection")).json();
		componentModel.setProperty("/collections",roleCollections);
		return roleCollections;
	}

	async getUsers(){
		const response = await fetch("/app/users",{
			headers : {
				"X-CSRF-Token" : "fetch",
			}
		});
		
		const componentModel = this.getComponentModel();
		const token = response.headers.get("X-CSRF-Token");
		const user = await response.json();

		componentModel.setProperty("/csrfToken",token);
		componentModel.setProperty("/users",user);
	}

	onRouterMatched(event : Event){
		const oLayoutModel = this.getModel();
		let sLayout = (event.getParameter("arguments") as routerArguments).layout;
		if(!sLayout){
			sLayout = LayoutType.OneColumn;
			this.navTo(`list`,{
				layout : sLayout,
			});

			return;
		}
		
		oLayoutModel.setProperty("/users/layout",sLayout);
	}
	
	onStateChange(event : Event) {
		const layout : string = event.getParameter("layout");
		const isNavigationArrow : boolean = event.getParameter("isNavigationArrow");
		console.log("stateChange");
	}

	changeLayout(layout : LayoutType){
		const componentModel = this.getComponentModel();
		this.navTo("list",{
			layout,
			userId : componentModel.getProperty("/user/id"),
			collection : componentModel.getProperty("/user/collection")?.name
		});
    }

}
