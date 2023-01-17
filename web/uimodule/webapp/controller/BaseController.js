sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/core/UIComponent",
        "com/myorg/myUI5App/model/formatter",
        "sap/m/MessageBox"
    ],
    function (Controller, History, UIComponent, formatter, MessageBox) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.BaseController", {
            formatter: formatter,
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },
            navTo: function (psTarget, pmParameters, pbReplace) {
                this.getRouter().navTo(psTarget, pmParameters, pbReplace);
            },
            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },
            onNavBack: function () {
                const sPreviousHash = History.getInstance().getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.getRouter().navTo("appHome", {}, true /* no history*/);
                }
            },
            getCustomDataKey(oControl) {
                let sCustomDataKey = oControl.getCustomData()[0].getKey();
                return sCustomDataKey;
            },
            getCustomDataValue(oControl) {
                let sCustomDataValue = oControl.getCustomData()[0].getValue();
                return sCustomDataValue;
            },
            callSDK: function (sMethod, sUrl, oData, fnCallback) {
                let _self = this;
                let oHeader = getHeader(sMethod);

                jQuery.ajax({
                    url: sUrl,
                    type: sMethod,
                    headers: oHeader,
                    data: JSON.stringify(oData),
                    async: true,
                    success: function (data, textStatus, xhr) {
                        if (textStatus === "success") {
                            fnCallback.bind(this)(data, xhr);
                        }
                        statusMessage(sMethod, textStatus);
                    }.bind(_self),
                    error: function (error) {
                        _self.navTo("ErrorPage");
                        console.log(error);
                    }
                });

                function getHeader(sMethod) {
                    if (sMethod !== "GET") {
                        return {
                            "Content-Type": "application/json",
                            "X-CSRF-Token": _self.csrfToken
                        };
                    }
                    return { "X-CSRF-Token": "Fetch" };
                }

                function statusMessage(sMethod, textStatus) {
                    if (textStatus === "success") {
                        switch (sMethod) {
                            case "POST":
                                new sap.m.MessageToast.show("생성 성공");
                                break;
                            case "PUT":
                                new sap.m.MessageToast.show("변경 성공");
                                break;
                            case "DELETE":
                                new sap.m.MessageToast.show("삭제 성공");
                                sUrl === "/app/users" ? _self.onFCLOneColumn() : "";
                                break;
                        }
                    }
                }
            },
            onCollectionsSearch: function (oEvent) {
                let sValue = oEvent.getParameter("value");
                let oFilter = new sap.ui.model.Filter("id", "Contains", sValue);
                let oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onFCLOneColumn: function () {
                let oFCL = this.getView().byId("fcl");
                oFCL.setLayout("OneColumn");
            },
            onFCLTwoColumn: function () {
                let oFCL = this.getView().byId("fcl");
                oFCL.setLayout("TwoColumnsBeginExpanded");
            },
            validationCheck: function (oForm) {
                let mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                let oFormContent = oForm.getContent();
                let oFormInputs = oFormContent.filter(oControl => oControl.getMetadata().getElementName() === "sap.m.Input");
                let bCheck = true;

                //forEach에서 break나 continue사용못해서 some
                //return false 면 continue / true면 break;
                oFormInputs.some(oInput => {
                    let oInputValue = oInput.getValue();
                    let oInputVisible = oInput.getVisible();

                    if (!oInputValue && oInputVisible) {
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }

                    if (oInput.getType() === "Email" && !oInputValue.match(mailregex)) {
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }

                    oInput.setValueState("None");
                })
                return bCheck;
            },
            showWarningBox: function () {
                return new Promise((resolve, reject) => {
                    MessageBox.alert("정말 삭제하시겠습니까?", {
                        icon: "WARNING",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            sAction === "OK" ? resolve(true) : resolve(false);
                        }
                    });
                });
            },
        });
    }
);
