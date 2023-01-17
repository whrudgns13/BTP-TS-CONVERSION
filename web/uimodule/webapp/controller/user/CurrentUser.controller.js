sap.ui.define([
    "../BaseController",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.CurrentUser", {
            onBeforeRendering: function () {
                this._setDefault();
            },
            _setDefault: function () {
                this.onFCLOneColumn();
                const oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "user");
                oView.setModel(new sap.ui.model.json.JSONModel(), "collections");
                this._userModel = oView.getModel("user");
                this._collectionsModel = oView.getModel("collections");
                this.getUser();
                this.getRoleCollections();
            },
            getUser: function () {
                this.callSDK("GET", "/app/users/currentUser", undefined, this.setUser);
            },
            getRoleCollections: function () {
                this.callSDK("GET", "/app/group", undefined, this.setRoleCollections);
            },
            setUser: function (data, xhr) {
                this._userModel.setProperty("/", data);
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
            },
            setRoleCollections: function (data) {
                this._collectionsModel.setProperty("/", data);
            },
            onAddUserRoleCollection: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let aRoleId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                let sUserId = this._userModel.getProperty("/id");

                aRoleId.forEach(roleId => {
                    let oGroups = {
                        id: roleId,
                        group: {
                            "type": "USER",
                            "value": sUserId,
                            "origin": "sap.default"
                        }
                    };
                    this.callSDK("POST", "/app/group", oGroups, this.getUser);
                });
            },
            onOpenDialog: function () {
                let aCollections = this._collectionsModel.getProperty("/resources");
                let aUserCollections = this._userModel.getProperty("/groups");
                let newCollections = aCollections.filter(collection => {
                    let iIndex = aUserCollections.findIndex(userCollection => collection.id === userCollection.value);
                    if (iIndex > -1) return false;
                    return true;
                })

                this._collectionsModel.setProperty("/resources", newCollections);

                const oView = this.getView();

                if (!this.oDialog) {
                    this.oDialog = Fragment.load({
                        name: `com.myorg.myUI5App.view.user.dialog.RoleCollectionsDialog`,
                        controller: this
                    })
                }

                this.oDialog.then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            },
            onClose: function () {
                this.oDialog.then(dialog => dialog.close());
            },
            onDeleteUserRole: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                let oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group", oDelete, this.getUser);
                }
            },
            onCreateUserRole: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let aRoleId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                let sUserId = this._userModel.getProperty("/id");

                aRoleId.forEach(roleId => {
                    let oGroups = {
                        id: roleId,
                        group: {
                            "type": "USER",
                            "value": sUserId,
                            "origin": "sap.default"
                        }
                    };
                    this.callSDK("POST", "/app/group", oGroups, this.getUser);
                });
            }
        });
    });
