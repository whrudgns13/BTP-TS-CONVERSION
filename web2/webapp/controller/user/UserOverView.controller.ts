import { LayoutType } from "sap/f/library";
import Event from "sap/ui/base/Event";
import BaseController from "../BaseController";
import { routerArguments } from "../../type/User";

/**
 * @namespace com.myorg.userInformation.controller.user
 */

export default class UserOverView extends BaseController {
    routeName : string;
	
	public onInit() : void {
		this.getRouter().attachRouteMatched(this.onRouterMatched,this);
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

}
