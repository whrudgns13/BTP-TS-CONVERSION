import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import { LayoutType } from "sap/f/library";
import Event from "sap/ui/base/Event";

/**
 * @namespace com.myorg.userInformation.controller
 */
export default class Main extends BaseController {
    onItemSeleted(event : Event) {
		let oItem = event.getParameter("item");
        this.navTo(oItem.getKey());
	}
	
	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	getFCL() {
		return sap.ui.getCore().byId("fcl") as FlexibleColumnLayout;
	}

	changeLayout(layout : LayoutType){
        const fcl = this.getFCL();
		if(fcl.getLayout()===LayoutType.MidColumnFullScreen) return fcl.setLayout(LayoutType.TwoColumnsBeginExpanded);
        fcl.setLayout(layout);
    }
}
