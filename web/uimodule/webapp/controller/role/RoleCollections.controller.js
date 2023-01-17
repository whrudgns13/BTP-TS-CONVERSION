sap.ui.define([
    "../BaseController",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.role.RoleCollections", {
            onBeforeRendering: function () {
                this._setDefault();
            },
            _setDefault: function () {
                this.onFCLOneColumn();
                let oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "users");
                oView.setModel(new sap.ui.model.json.JSONModel(), "collections");
                oView.setModel(new sap.ui.model.json.JSONModel(this.getRoleTemplate()), "collection");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                oView.setModel(new sap.ui.model.json.JSONModel({ state: "Create" }), "state");
                this._usersModel = oView.getModel("users");
                this._collectionsModel = oView.getModel("collections");
                this._collectionModel = oView.getModel("collection");
                this._rolesModel = oView.getModel("roles");
                this._state = oView.getModel("state");
                this._FCL = oView.byId("fcl");
                this._collectionTable = oView.byId("collectionTable");
                this.getRoleCollections();
                this.getRoles();
                this.getUsers();
            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            setUsers: function (data) {
                this._users = data.resources;
                this._usersModel.setProperty("/", data);
            },
            getRoleCollections: function () {
                this.callSDK("GET", "/app/role-collection", undefined, this.setRoleCollections);
            },
            setRoleCollections: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._collectionsModel.setProperty("/", data);
                if (this._collectionPath) this.setRoleCollection();
            },
            setRoleCollection: function () {
                let oCollection = this._collectionsModel.getProperty(this._collectionPath);
                this._collectionModel.setProperty("/", oCollection);
            },
            getRoles: function () {
                this.callSDK("GET", "/app/roles", undefined, this.setRoles);
            },
            setRoles: function (data, xhr) {
                this._roles = data;
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._rolesModel.setProperty("/", data);
            },
            getRoleTemplate: function () {
                return {
                    "name": "",
                    "description": "",
                };
            },
            onSearch: function (oEvent) {
                let oBinding = this._collectionTable.getBinding("items");
                let sValue = oEvent.getParameter("query");
                let aFilters = [];

                if (sValue) {
                    aFilters.push(new sap.ui.model.Filter("name", "Contains", sValue));
                }

                oBinding.filter([aFilters]);

            },
            onOpenDialog: function (oEvent) {
                let oView = this.getView();
                let sDialogName = this.getCustomDataKey(oEvent.getSource());
                let sDialogValue = this.getCustomDataValue(oEvent.getSource());
                this._dialogName = sDialogName;

                switch (sDialogValue) {
                    case "Create":
                        this._collectionModel.setProperty("/", this.getRoleTemplate());
                        this._FCL.getLayout() !== "OneColumn" ? this.onFCLOneColumn() : "";
                        this._state.setProperty("/state", "Create");
                        break;
                    case "Edit":
                        this._state.setProperty("/state", "Edit");
                        break;
                    case "addUser":
                        let aUsers = this._users;
                        let aCollectionUsers = this._collectionModel.getProperty("/userReferences");
                        if (aCollectionUsers) {
                            let newUsers = aUsers.filter(user => {
                                let iIndex = aCollectionUsers.findIndex(CollectionUser => user.id === CollectionUser.id);
                                if (iIndex > -1) return false;
                                return true;
                            });
                            this._usersModel.setProperty("/resources", newUsers);
                            break;
                        }
                        this._usersModel.setProperty("/resources", aUsers);
                        break;
                    case "addRole":
                        let aRoles = this._roles;
                        let aCollectionRoles = this._collectionModel.getProperty("/roleReferences");
                        if (aCollectionRoles) {
                            let newRoles = aRoles.filter(role => {
                                let iIndex = aCollectionRoles.findIndex(CollectionRef => role.name === CollectionRef.name);
                                if (iIndex > -1) return false;
                                return true;
                            });

                            this._rolesModel.setProperty("/", newRoles);
                            break;
                        }
                        this._rolesModel.setProperty("/", aRoles);
                        break;
                }

                if (!this[sDialogName]) {
                    this[sDialogName] = Fragment.load({
                        id: this.getView().getId(),
                        name: `com.myorg.myUI5App.view.role.dialog.${sDialogName}`,
                        controller: this
                    });
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
            onSubmit: function () {
                let oForm = this.getView().byId("collectionForm");
                if (!this.validationCheck(oForm)) return;

                let oCollection = this._collectionModel.getProperty("/");
                if (this._state.getProperty("/state") === "Create") {
                    this.createCollection(oCollection);
                } else {
                    this.editCollection(oCollection);
                }

                this.onClose();
            },
            createCollection: function (oCollection) {
                this.callSDK("POST", "/app/role-collection", oCollection, this.getRoleCollections);
            },
            editCollection: function ({ name, description }) {
                let oGroups = { id: name, collection: { description } };
                this.callSDK("PUT", "/app/role-collection", oGroups, this.getRoleCollections);
            },
            onCollectionsItemPress: function (oEvent) {
                let oView = this.getView();
                let oAddRoleBtn = oView.byId("addRoleBtn");
                let oRoleTable = oView.byId("roleTable");
                let oListItem = oEvent.getParameter("listItem");
                let sPath = oListItem.getBindingContextPath("collections");
                let oCollection = this._collectionsModel.getProperty(sPath);
                this._collectionModel.setProperty("/", oCollection);
                this._collectionPath = sPath;
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";

                //readOnly가 true 이면 수정 못함
                if (oCollection.isReadOnly) {
                    oAddRoleBtn.setVisible(false);
                    oRoleTable.setMode("None");
                    return;
                }

                oRoleTable.setMode("Delete");
                oAddRoleBtn.setVisible(true);
            },
            deleteRoleCollection: async function () {
                let sCollectionId = this._collectionModel.getProperty("/name");
                let bCheck = await this.showWarningBox();

                if (bCheck) {
                    this.callSDK("DELETE", "/app/role-collection", { id: sCollectionId }, this.getRoleCollections);
                    this.onFCLOneColumn();
                }
            },
            onAddUserCollection: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let aUserId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                let sCollectionId = this._collectionModel.getProperty("/name");

                aUserId.forEach(userId => {
                    let oGroups = {
                        id: sCollectionId,
                        group: {
                            "type": "USER",
                            "value": userId,
                            "origin": "sap.default"
                        }
                    }
                    this.callSDK("POST", "/app/group", oGroups, this.getRoleCollections);
                })
            },
            deleteCollectionUser: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();

                if (bCheck) {
                    let oDelete = {
                        groupId: this._collectionModel.getProperty("/name"),
                        userId: this._collectionModel.getProperty(`${oListItem.getBindingContextPath("collection")}/id`)
                    };
                    this.callSDK("DELETE", "/app/group", oDelete, this.getRoleCollections);
                }
            },
            onRolesSearch: function (oEvent) {
                let sValue = oEvent.getParameter("value");
                let oFilter = new sap.ui.model.Filter("name", "Contains", sValue);
                let oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onDeleteRoleFromRoleCollection: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                let sPath = oListItem.getBindingContextPath("collection");
                if (bCheck) {
                    let oCollection = this._collectionModel.getProperty(sPath);
                    let oRoleCollectionName = this._collectionModel.getProperty("/name");
                    let oDelete = {
                        roleCollectionName: oRoleCollectionName,
                        roleName: oCollection.name,
                        roleTemplateAppId: oCollection.roleTemplateAppId,
                        roleTemplateName: oCollection.roleTemplateName
                    };
                    this.callSDK("DELETE", "/app/role-collection/role", oDelete, this.getRoleCollections);
                }
            },
            addRolesToRoleCollection: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let oRoles = {
                    collectionName: this._collectionModel.getProperty("/name"),
                    roleReference: []
                };

                oSelectedItems.forEach(seletedItem => {
                    let sPath = seletedItem.getBindingContextPath("roles");
                    let oBindingRole = this._rolesModel.getProperty(sPath);
                    let referenceTemplate = {
                        description: oBindingRole.description,
                        name: oBindingRole.name,
                        roleTemplateAppId: oBindingRole.roleTemplateAppId,
                        roleTemplateName: oBindingRole.roleTemplateName
                    };
                    oRoles.roleReference.push(referenceTemplate);
                });

                this.callSDK("PUT", "/app/role-collection/role", oRoles, this.getRoleCollections);
            },
        });
    });
