import { LayoutType } from "sap/f/library";
import Button from "sap/m/Button";
import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import HBox from "sap/m/HBox";
import Label from "sap/m/Label";
import OverflowToolbar from "sap/m/OverflowToolbar";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import Text from "sap/m/Text"
import Title from "sap/m/Title";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Event from "sap/ui/base/Event";
import JSView from "sap/ui/core/mvc/JSView";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import ObjectPageDynamicHeaderTitle from "sap/uxap/ObjectPageDynamicHeaderTitle";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageSubSection from "sap/uxap/ObjectPageSubSection";
import UserListDetailController from "../../controller/user/UserListDetail.controller";

sap.ui.jsview("com.myorg.userInformation.view.user.UserListDetail",{
    getControllerName : function(){
        return "com.myorg.userInformation.controller.user.UserListDetail";
    },
    createContent : function(controller : UserListDetailController){
        const _self = this as JSView;
        
        const page = new ObjectPageLayout({
            headerTitle : new ObjectPageDynamicHeaderTitle({
                expandedHeading : new HBox({
                    items : [
                        new Title({text : "{ComponentModel>/user/userName}",titleStyle:"H3"})
                    ]
                }),
                snappedHeading : new HBox({
                    items : [
                        new Title({text : "{ComponentModel>/user/userName}",titleStyle:"H3"}),
                    ]
                }),
                actions : [
                    new Button({
                        icon : "sap-icon://full-screen",
                        press : function(){
                            const layout : LayoutType = _self.getModel().getProperty("/users/layout");
                            if(layout===LayoutType.MidColumnFullScreen){
                                controller.changeLayout(LayoutType.TwoColumnsBeginExpanded);
                                return;
                            }
                            controller.changeLayout(LayoutType.MidColumnFullScreen);
                        }
                    }),
                    new Button({
                        icon : "sap-icon://decline",
                        press : function(){
                            controller.changeLayout(LayoutType.OneColumn)
                        }
                    })
                ]
            }),
            headerContent :  new SimpleForm({
                content : [
                    new Label({text : "????????? ?????????"}),
                    new Text({
                        text : {
                            path : 'ComponentModel>/user/lastLogonTime',
                            formatter : (value : string | number)=>{
                                if(value){
                                    if(!isNaN(Number(value))) value = Number(value);
                                    return controller.formatDate(value)
                                }
                            }
                        }
                    })
                ]
            }),
            sections : [
                new ObjectPageSection({
                    title : "??????",
                    subSections : new ObjectPageSubSection({
                        title : "??????",
                        blocks : [
                            new SimpleForm({
                                content : [
                                    new Label({text : "????????????"}),
                                    new Text({text : "{ComponentModel>/user/emails/0/value}"}),
                                    new Label({text : "?????????"}),
                                    new Text({text : {
                                        path : 'ComponentModel>/user/meta/created',
                                        formatter : (value : string)=>{
                                            return controller.formatDate(value)
                                        }
                                    }}),
                                    new Label({text : "ID"}),
                                    new Text({text : "{ComponentModel>/user/id}"}),
                                    new Label({text : "????????? ????????????"}),
                                    new Text({
                                        text : {
                                            path : 'ComponentModel>/user/meta/lastModified',
                                            formatter : (value : string)=>{
                                                return controller.formatDate(value)
                                            }
                                        }
                                    })
                                ]
                            })
                        ]
                    })
                }),
                new ObjectPageSection({
                    title : "?????? ????????? ({= ${ComponentModel>/user/groups}.length})",
                    subSections : new ObjectPageSubSection({
                        blocks : [
                            new Table(_self.createId("roleTable"),{
                                itemPress : function(e : Event){
                                    controller.onOpenCollection(e)
                                },
                                headerToolbar : new OverflowToolbar({
                                    content : [
                                        new SearchField({
                                            value : "",
                                            width : "15rem",
                                            search : function(e : Event){
                                                controller.onSearchRoleCollection(e);
                                            }
                                        }),
                                        new ToolbarSpacer(),
                                        new Button({
                                            text : "?????? ????????? ??????",
                                            press : function(){
                                                controller.onOpenCollectionDialog();
                                            }
                                        }),
                                        new Button({
                                            icon : "sap-icon://sort",
                                            press : function(){
                                                //controller.onOpenSortDialog();
                                            }}
                                        ),
                                        new Button({icon : "sap-icon://export"}),
                                    ]
                                }),
                                columns : [
                                    new Column({
                                        header : new Text({text : "??????"}),
                                    }),
                                    new Column({
                                        header : new Text({text : "??????"}),
                                    }),
                                    new Column({
                                        hAlign : "End",
                                        header : new Text({text : "??????"}),
                                    })
                                ],
                                items : {
                                    path : "ComponentModel>/user/groups",
                                    template : new ColumnListItem({
                                        type : "Navigation",
                                        cells : [
                                            new Text({text : "{ComponentModel>value}"}),
                                            new Text({text : "{ComponentModel>display}"}),
                                            new Button({
                                                icon : "sap-icon://delete",
                                                type : "Transparent",
                                                press : function(event : Event){
                                                    controller.onDeleteUserRoleCollection(event)
                                                }
                                            })
                                        ]
                                    })
                                }
                            })
                        ]
                    })
                })
            ]
        })
        return page;
    }
})