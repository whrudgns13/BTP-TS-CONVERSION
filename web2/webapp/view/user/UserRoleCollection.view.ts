import { LayoutType } from "sap/f/library";
import Button from "sap/m/Button";
import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import HBox from "sap/m/HBox";
import Link from "sap/m/Link";
import OverflowToolbar from "sap/m/OverflowToolbar";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import Text from "sap/m/Text";
import Title from "sap/m/Title";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import VBox from "sap/m/VBox";
import Event from "sap/ui/base/Event";
import JSView from "sap/ui/core/mvc/JSView";
import ObjectPageDynamicHeaderTitle from "sap/uxap/ObjectPageDynamicHeaderTitle";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageSubSection from "sap/uxap/ObjectPageSubSection";
import UserRoleCollection from "webapp/controller/user/UserRoleCollection.controller";

sap.ui.jsview("com.myorg.userInformation.view.user.UserRoleCollection",{
    getControllerName : function(){
        return "com.myorg.userInformation.controller.user.UserRoleCollection"
    },
    createContent : function(controller : UserRoleCollection){
        const _self = this as JSView;
        const page = new ObjectPageLayout({
            headerTitle : new ObjectPageDynamicHeaderTitle({
                expandedHeading : new HBox({
                    items : [
                        new Title({text : "{ComponentModel>/user/collection/name}",titleStyle:"H3"})
                    ]
                }),
                snappedHeading : new HBox({
                    items : [
                        new Title({text : "{ComponentModel>/user/collection/name}",titleStyle:"H3"}),
                    ]
                }),
                actions : [
                    new Button({
                        icon : "sap-icon://full-screen",
                        press : function(){
                            const layout = _self.getModel().getProperty("/users/layout");
                            if(layout===LayoutType.EndColumnFullScreen){
                                controller.changeLayout(LayoutType.ThreeColumnsMidExpanded);
                                return;
                            }
                            controller.changeLayout(LayoutType.EndColumnFullScreen);
                        }
                    }),
                    new Button({
                        icon : "sap-icon://decline",
                        press : function(){
                            controller.changeLayout(LayoutType.TwoColumnsBeginExpanded);
                        }
                    })
                ]
            }),
            headerContent : new VBox({
                items : [
                    new Link({text : "?????? ??????????????? ??????"}),
                    new Text({text : "?????? : {ComponentModel>/user/collection/description}"})
                ]
            }),
            sections : new ObjectPageSection({
                subSections : new ObjectPageSubSection({
                    title : "??????",
                    blocks : [
                        new Table(_self.createId("collectionTable"),{
                            headerToolbar : new OverflowToolbar({
                                content : [
                                    new ToolbarSpacer(),
                                    new SearchField({
                                        value : "",
                                        width : "20rem",
                                        search : function(e : Event){
                                            controller.onCollectionSearch(e);
                                        }
                                    })
                                ]
                            }),
                            columns : [
                                new Column({
                                    header : new Text({text : "?????????????????? ??????"})
                                }),
                                new Column({
                                    header : new Text({text : "?????? ??????"})
                                }),
                                new Column({
                                    header : new Text({text : "?????? ?????????"})
                                })
                            ],
                            items : {
                                path : "ComponentModel>/user/collection/roleReferences",
                                template : new ColumnListItem({
                                    cells : [
                                        new Text({text : "{ComponentModel>roleTemplateAppId}"}),
                                        new Text({text : "{ComponentModel>name}"}), 
                                        new Text({text : "{ComponentModel>roleTemplateName}"}),
                                    ]
                                })
                            }
                        }),

                    ]
                })
            })
        })
        return page;
    }
})