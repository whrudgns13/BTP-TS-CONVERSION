import BaseController from "../BaseController";
import Event from "sap/ui/base/Event";
import JSView from "sap/ui/core/mvc/JSView";
import ToolPage from "sap/tnt/ToolPage";
import CollectionOverView from "./CollectionOverView.controller";
/**
 * @namespace com.myorg.userInformation.controller.collections
 */
export default class CollectionsList extends CollectionOverView {
    onExpendedMenu() {
      const oView = this.getView() as JSView;
      const toolpage = oView.byId("toolpage") as ToolPage;
      const expended = toolpage.getSideExpanded();
      toolpage.setSideExpanded(!expended);
    }
    onItemSeleted(event : Event) {
      let oItem = event.getParameter("item");
      this.navTo(oItem.getKey());
	  }
	
}
