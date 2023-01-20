import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import { LayoutType } from "sap/f/library";
import Event from "sap/ui/base/Event";
import JSView from "sap/ui/core/mvc/JSView";
import SideNavigation from "sap/tnt/SideNavigation";
import ToolPage from "sap/tnt/ToolPage";

/**
 * @namespace com.myorg.userInformation.controller
 */
export default class Main extends BaseController {
    onExpendedMenu() {
		  const oView = this.getView() as JSView;
      const toolpage = oView.byId("toolpage") as ToolPage;
      const expended = toolpage.getSideExpanded();
		  toolpage.setSideExpanded(!expended);
    }
    onItemSeleted(event : Event) {
      let oItem = event.getParameter("item");
      this.navTo(oItem.getKey(),{
        layout : LayoutType.OneColumn
      });
	}
	
}
