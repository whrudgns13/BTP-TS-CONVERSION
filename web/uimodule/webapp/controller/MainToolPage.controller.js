sap.ui.define(["./BaseController"], function(Controller) {
  "use strict";

  return Controller.extend("com.myorg.myUI5App.controller.MainToolPage",{
      onInit: function() {
        this.getPermission();
      },
      getPermission: function() {
        this.callSDK("GET", "/app", undefined, this.setPermission);
      },
      setPermission: function(data) {
        this.setModel(new sap.ui.model.json.JSONModel(data), "permission");
      },
      onItemSelect: function(oEvent) {
        let oItem = oEvent.getParameter("item");
        this.navTo(oItem.getKey());
      }
    }
  );
});
