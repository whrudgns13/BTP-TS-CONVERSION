sap.ui.define([
    "../BaseController",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.role.Roles", {
            onBeforeRendering: function () {
                this._setDefault();
            },
            _setDefault: function () {
                this.onFCLOneColumn();
                let oView = this.getView();
                this._FCL = oView.byId("fcl");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                oView.setModel(new sap.ui.model.json.JSONModel(), "role");
                this._rolesModel = oView.getModel("roles");
                this._roleModel = oView.getModel("role");
                this.getRoles();
            },
            getRoles: function () {
                this.callSDK("GET", "/app/roles", undefined, this.setRoles);
            },
            setRoles: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._rolesModel.setProperty("/", data);
            },
            setRole: function () {
                this._roleModel.setProperty("/", this._rolesModel.getProperty(this._rolePath));
            },
            onSearch: function (oEvent) {
                let oView = this.getView();
                let oComboBox = oView.byId("rolesSearchCombo");
                let oBinding = oView.byId("rolesTable").getBinding("items");
                let sValue = oEvent.getParameter("query");
                let aFilters = [];

                if (sValue) {
                    aFilters.push(new sap.ui.model.Filter(oComboBox.getSelectedKey(), "Contains", sValue));
                }

                oBinding.filter([aFilters]);
            },
            onRoleItemPress: function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let sPath = oListItem.getBindingContextPath("roles");
                this._roleModel.setProperty("/", this._rolesModel.getProperty(sPath));
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";
            }
        });
    });
