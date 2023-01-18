
import { LayoutType } from "sap/f/library";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import BaseController from "../BaseController";
import { routerArguments } from "../../type/User";
import { ScimUser } from "webapp/type/scim-user";
import Filter from "sap/ui/model/Filter";
import JSONListBinding from "sap/ui/model/json/JSONListBinding";
import TableSelectDialog from "sap/m/TableSelectDialog";
import ColumnListItem from "sap/m/ColumnListItem";
import Text from "sap/m/Text";
import { RoleCollection } from "webapp/type";
import { Group } from "webapp/type/group";
import Column from "sap/m/Column";

type RoleCollections =  RoleCollection & {
    selected : boolean
}
/**
 * @namespace com.myorg.userInformation.controller.user
 */
export default class UserListDetail extends BaseController {
    _collectionDialog : TableSelectDialog;

    onInit(){
        this.getRouter().attachRoutePatternMatched(this.onRouteMatched,this);
    }

    async onRouteMatched(e : Event){
        const arg : routerArguments = e.getParameter("arguments");
        if(arg.userId){
            const componentModel = this.getComponentModel();
            if(!componentModel.getProperty("/users")){
                this.navTo("list",{
                    layout : LayoutType.OneColumn,
                    userId : undefined
                })
                return;
            }

            const users : ScimUser[] = componentModel.getProperty("/users/resources");
            const user = users.find(user=>user.id===arg.userId);
            componentModel.setProperty("/user",user);
        }
    }

    async defaultSetting(){
       
    }
    
    changeLayout(layout : LayoutType){
        this.navTo("list",{layout});
        //this.setLayout("/users/layout",layout)
    }

    onSearchRoleCollection(e: Event) {
        const value : string = e.getParameter("query");
        const table = this.getView().byId("roleTable") as Table;
        const filters : Filter[] = [];
        if(value) filters.push(new Filter("value","Contains",value));
    
        const filter = new Filter({
            filters :filters,
        });
        
        (table.getBinding("items") as JSONListBinding).filter(filter);
    }
    async onOpenCollectionDialog(){
        const componentModel = this.getComponentModel();
        const collections = this.getComponentModel().getProperty("collections");
        if(!collections){
            let roleCollections : RoleCollections[] = await (await fetch("/app/role-collection")).json();
            const groups : Group[] = componentModel.getProperty("/user/groups");
            // groups.forEach(group=>{
            //     if(group.value)
            // })
            roleCollections = roleCollections.filter(collection=>{
                const group = groups.find(group=>group.value===collection.name);
                if(group) return false;
                return true;
            })
            componentModel.setProperty("/collections",roleCollections);
        }

        if(!this._collectionDialog){
            this._collectionDialog = new TableSelectDialog({
                title : "Role Collections {= ${ComponentModel>/collections}.length}",
                multiSelect : true,
                columns : [
                    new Column({
                        header : new Text({text : "Name"}),
                    }),
                    new Column({
                        header : new Text({text : "Description"}),
                    }),
                ],
                items : {
                    path : "ComponentModel>/collections",
                    template : new ColumnListItem({
                        cells : [
                            new Text({text : "{ComponentModel>name}"}),
                            new Text({text : "{ComponentModel>description}"}),
                        ]
                    })
                }
            })
            this.getView().addDependent(this._collectionDialog);
        }
        this._collectionDialog.open();
    }
    onOpenSortDialog() {
        
    }
    sortConfirm(){

    }
}

