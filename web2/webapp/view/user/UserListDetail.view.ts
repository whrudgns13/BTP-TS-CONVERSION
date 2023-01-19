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
                            controller.changeLayout(LayoutType.MidColumnFullScreen)
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
                    new Label({text : "마지막 로그온"}),
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
                    title : "개요",
                    subSections : new ObjectPageSubSection({
                        title : "개요",
                        blocks : [
                            new SimpleForm({
                                content : [
                                    new Label({text : "전자메일"}),
                                    new Text({text : "{ComponentModel>/user/emails/0/value}"}),
                                    new Label({text : "생성됨"}),
                                    new Text({text : {
                                        path : 'ComponentModel>/user/meta/created',
                                        formatter : (value : string)=>{
                                            return controller.formatDate(value)
                                        }
                                    }}),
                                    new Label({text : "ID"}),
                                    new Text({text : "{ComponentModel>/user/id}"}),
                                    new Label({text : "마지막 업데이트"}),
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
                    title : "역활 컬렉션 ({= ${ComponentModel>/user/groups}.length})",
                    subSections : new ObjectPageSubSection({
                        blocks : [
                            new Table(_self.createId("roleTable"),{
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
                                            text : "역활 컬렉션 지정",
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
                                        header : new Text({text : "이름"}),
                                    }),
                                    new Column({
                                        header : new Text({text : "내역"}),
                                    }),
                                    new Column({
                                        hAlign : "End",
                                        header : new Text({text : "삭제"}),
                                    })
                                ],
                                items : {
                                    path : "ComponentModel>/user/groups",
                                    template : new ColumnListItem({
                                        type : "Navigation",
                                        cells : [
                                            new Text({text : "{ComponentModel>value}"}),
                                            new Text({text : "{ComponentModel>display}"}),
                                            new Button({icon : "sap-icon://delete",type : "Transparent"})
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