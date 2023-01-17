sap.ui.define(
    [
        "../BaseController",
        "sap/ui/core/Fragment",
        "sap/m/MessageBox"
    ],
    function (Controller, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.Users", {
            onBeforeRendering: function () {
                this._setDefault();
            },
            getUserObj: function () {
                return {
                    "userName": "",
                    "name": {
                        "familyName": "",
                        "givenName": ""
                    },
                    "emails": [
                        {
                            "type": "string",
                            "value": "",
                            "primary": true
                        }
                    ],
                    "origin": "sap.default",
                    "schemas": ["urn:scim:schemas:core:1.0"]
                }
            },
            _setDefault: function () {
                this.onFCLOneColumn();
                let oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "user");
                oView.setModel(new sap.ui.model.json.JSONModel(), "users");
                oView.setModel(new sap.ui.model.json.JSONModel(), "collections");
                this._userState = "Edit";
                this._userModel = oView.getModel("user");
                this._usersModel = oView.getModel("users");
                this._collectionsModel = oView.getModel("collections");
                this._FCL = this.getView().byId("fcl");
                this.getUsers();
                this.getRoleCollections();
            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            getRoleCollections: function () {
                this.callSDK("GET", "/app/group", undefined, this.setRoleCollections);
            },
            setUsers: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._usersModel.setProperty("/", data);
                if (this._userPath) this.setUser();
            },
            setUser: function () {
                this._userModel.setProperty("/", this._usersModel.getProperty(this._userPath));
            },
            setRoleCollections: function (data) {
                this.collectionsData = data.resources;
                this._collectionsModel.setProperty("/", data);
            },
            onUserItemPress: function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let sPath = oListItem.getBindingContextPath("users");
                let oBinding = JSON.parse(JSON.stringify(this._usersModel.getProperty(sPath)));
                this._userModel.setProperty("/", oBinding);
                this._userPath = sPath;
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";
            },
            onSubmit: function () {
                let oForm = this.getView().byId("userForm");
                if (!this.validationCheck(oForm)) return;
                let oUser = this._userModel.getProperty("/");
                oUser.userName = `${oUser.name.familyName} ${oUser.name.givenName}`;
                this._userState === "create" ? this.saveUser() : this.editUser();
            },
            saveUser: function () {
                let oUser = this._userModel.getProperty("/");
                oUser.displayName = "displayName test";
                this.callSDK("POST", "/app/users", oUser, this.getUsers);
                this.onClose();
            },
            editUser: function () {
                let oUser = this._userModel.getProperty("/");
                this.callSDK("PUT", "/app/users", oUser, this.getUsers);
                this.onClose();
            },
            deleteUser: async function () {
                let sUserId = this._userModel.getProperty("/id");
                let bCheck = await this.showWarningBox();

                if (bCheck) {
                    this.callSDK("DELETE", "/app/users", { id: sUserId }, this.getUsers);
                }
            },
            onOpenDialog: function (oEvent) {
                let sDialogName = this.getCustomDataKey(oEvent.getSource());
                let sDialogValue = this.getCustomDataValue(oEvent.getSource());
                this._dialogName = sDialogName;

                switch (sDialogValue) {
                    case "Create":
                        this._userModel.setProperty("/", this.getUserObj());
                        this._userState = "create";
                        this._FCL.getLayout() !== "OneColumn" ? this.onFCLOneColumn() : "";
                        break;
                    case "Edit":
                        this._userState = "edit";
                        break;
                    case "addCollection":
                        let aCollections = this.collectionsData;
                        let aUserCollections = this._userModel.getProperty("/groups");

                        let newCollections = aCollections.filter(collection => {
                            let iIndex = aUserCollections.findIndex(userCollection => collection.id === userCollection.value);
                            if (iIndex > -1) return false;
                            return true;
                        });

                        this._collectionsModel.setProperty("/resources", newCollections);
                        break;
                }

                let oView = this.getView();

                if (!this[sDialogName]) {
                    this[sDialogName] = Fragment.load({
                        id: oView.getId(),
                        name: `com.myorg.myUI5App.view.user.dialog.${sDialogName}`,
                        controller: this
                    })
                }

                this[sDialogName].then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            },
            onClose: function () {
                let sDialogName = this._dialogName;
                this[sDialogName].then(dialog => dialog.close());
            },
            onDeleteUserRole: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                let oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group", oDelete, this.getUsers);
                }
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
                    this.callSDK("POST", "/app/group", oGroups, this.getUsers);
                });
            }
        });
    }
);
