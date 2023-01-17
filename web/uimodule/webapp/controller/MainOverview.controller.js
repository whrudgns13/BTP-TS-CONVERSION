sap.ui.define([
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.MainOverview", {
            onBeforeRendering: function () {
                this._setDefault();
            },
            _setDefault: function () {
                let oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "overview");
                this._overviewModel = oView.getModel("overview");
                this.getUsers();
                this.getRoles();
                this.getRoleCollections();
            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            getRoleCollections: function () {
                this.callSDK("GET", "/app/role-collection", undefined, this.setRoleCollections);
            },
            getRoles: function () {
                this.callSDK("GET", "/app/roles", undefined, this.setRoles);
            },
            setUsers: function (data) {
                this._overviewModel.setProperty("/users", data);
            },
            setRoleCollections: function (data) {
                this._overviewModel.setProperty("/collections", data);
            },
            setRoles: function (data) {
                this._overviewModel.setProperty("/roles", data);
            },
            onTilePress: function (oEvent) {
                let oCustomDataKey = this.getCustomDataKey(oEvent.getSource())
                this.navTo(oCustomDataKey);
            }
        });
    });
