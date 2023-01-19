
import { LayoutType } from "sap/f/library";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";;
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
import StandardListItem from "sap/m/StandardListItem";
import MessageToast from "sap/m/MessageToast";
import UserOverView from "./UserOverView.controller";
import Button from "sap/m/Button";

/**
 * @namespace com.myorg.userInformation.controller.user
 */
export default class UserListDetail extends UserOverView {
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
                });
                return;
            }
            this.setUser(arg.userId);
        }
    }

    setUser(userId? : string){
        const componentModel = this.getComponentModel();
        if(!userId) userId = this.getComponentModel().getProperty("/user/id");
        const users : ScimUser[] = componentModel.getProperty("/users/resources");
        const user = users.find(user=>user.id===userId);
        componentModel.setProperty("/user",user);
    }

    changeLayout(layout : LayoutType){
        this.navTo("list",{layout});
    }
    
    onSearchRoleCollection(e: Event) {
        const value : string = e.getParameter("query");
        const table = this.getView().byId("roleTable") as Table;
        const filters : Filter[] = [];
        if(value) filters.push(new Filter("value","Contains",value));
        
        const filter = new Filter({filters});
        
        (table.getBinding("items") as JSONListBinding).filter(filter);
    }

    async onDeleteUserRoleCollection(event : Event){
        const view = this.getView();
        const control = event.getSource() as Button;
        const context = control.getBindingContext("ComponentModel");
        const componentModel = this.getComponentModel();
        const collection : Group = context.getModel().getProperty(context.getPath());
        const user : ScimUser = componentModel.getProperty("/user");
        const check : boolean = await this.showWarningBox("정말 삭제하시겠습니까?");
        if(!check) return;
        
        const response = await fetch("/app/group",{
            method : "DELETE",
            headers : {
                "X-CSRF-Token" : componentModel.getProperty("/csrfToken"),
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                groupId : collection.value,
                userId : user.id
            })
        })
        
        if(response.ok){
            MessageToast.show("Role Collection 삭제 완료");
            await this.getUsers();
            this.setUser();
        }

        view.setBusy(false);
        
    }
    
    onOpenCollectionDialog(){
        this.setUserCollections();
        if(!this._collectionDialog){
            this._collectionDialog = new TableSelectDialog({
                title : "Role Collections ({= ${ComponentModel>/user/collections}.length})",
                multiSelect : true,
                confirm : (event : Event)=>{
                    this.onAddCollection(event);
                },
                search : (event : Event)=>{
                    this.onCollectionSearch(event);
                },
                columns : [
                    new Column({
                        header : new Text({text : "Name"}),
                    }),
                    new Column({
                        header : new Text({text : "Description"}),
                    }),
                ],
                items : {
                    path : "ComponentModel>/user/collections",
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
    async setUserCollections(){
        const componentModel = this.getComponentModel();
        let roleCollections : RoleCollection[] = this.getComponentModel().getProperty("collections");
        
        if(!roleCollections) roleCollections = await this.getCollection();
        const groups : Group[] = componentModel.getProperty("/user/groups");
        roleCollections = roleCollections.filter(collection=>{
            const group = groups.find(group=>group.value===collection.name);
            if(group) return false;
            return true;
        });
        componentModel.setProperty("/user/collections",roleCollections);
    
    }
    
    onCollectionSearch(event : Event){
        const value : string = event.getParameter("value");
        const binding : JSONListBinding = event.getParameter("itemsBinding");
        const filters = [];
        if(value){
            filters.push(new Filter("name","Contains",value));
        }
        binding.filter(filters);
    }
    
    onAddCollection(event : Event){
        const selectedItems = event.getParameter("selectedItems") as StandardListItem[];
        const _self = this;
        const view = this.getView();
        view.setBusy(true);

        if(selectedItems.length){
            const componentModel = this.getComponentModel();
            
            selectedItems.forEach(async (item)=>{
                const bindingContext = item.getBindingContext("ComponentModel")
                const model = bindingContext.getModel();
                const path = bindingContext.getPath();
                const collection : RoleCollection = model.getProperty(path);
                
                const response = await fetch("/app/group",{
                    method : "POST",
                    body : JSON.stringify(this.createGroupObject(collection)),
                    headers : {
                        "X-CSRF-Token" : componentModel.getProperty("/csrfToken"),
                        "Content-Type": "application/json",
                    }
                })
                
                if(response.ok){
                    MessageToast.show("Role Collection 추가 완료");
                    await _self.getUsers();
                    _self.setUser();
                }
            })
        }

        view.setBusy(false);       
    }
    createGroupObject(collection : RoleCollection){
        const user : ScimUser = this.getComponentModel().getProperty("/user");
        return {
            id : collection.name,
            group : {
                origin : user.origin,
                type : "USER",
                value : user.id
            }
        }
    }
    
}

