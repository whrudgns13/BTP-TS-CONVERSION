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
                            const layout = _self.getProperty("/user/layout");
                            if(layout===LayoutType.ThreeColumnsMidExpanded){
                                controller.changeLayout(LayoutType.TwoColumnsBeginExpanded);
                            }
                            controller.changeLayout(LayoutType.ThreeColumnsEndExpanded);
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
                    new Link({text : "역활 컬렉션으로 이동"}),
                    new Text({text : "내역 : {ComponentModel>/user/collection/description}"})
                ]
            }),
            sections : new ObjectPageSection({
                subSections : new ObjectPageSubSection({
                    title : "역활",
                    blocks : [
                        new Table({
                            headerToolbar : new OverflowToolbar({
                                content : [
                                    new ToolbarSpacer(),
                                    new SearchField({
                                        value : "",
                                        width : "20rem",
                                    })
                                ]
                            }),
                            columns : [
                                new Column({
                                    header : new Text({text : "어플리케이션 이름"})
                                }),
                                new Column({
                                    header : new Text({text : "역활 이름"})
                                }),
                                new Column({
                                    header : new Text({text : "역활 템플릿"})
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