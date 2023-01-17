import { Injectable, Req, Res } from "@nestjs/common";
import { RoleCollectionsApi } from "../../AuthorizationAPI/role-collections-api";

@Injectable()
export class RoleCollectionService {
  private destination = { destinationName: "apiAccessDestination" };

  async getRoleCollections(@Req() req, @Res() res) {
    const collection = await RoleCollectionsApi.getRoleCollections({
      showUsers: true
    }).execute(this.destination);
    return res.send(collection);
  }

  async changeRoleCollectionDescription(@Req() req, @Res() res) {
    const collection = await RoleCollectionsApi.changeRoleCollectionDescription(
      req.body.id,
      req.body.collection
    ).execute(this.destination);
    return res.send(collection);
  }

  async createRoleCollection(@Req() req, @Res() res) {
    const collection = await RoleCollectionsApi.createRoleCollection(
      req.body
    ).execute(this.destination);
    return res.send(collection);
  }

  async deleteRoleCollectionByName(@Req() req, @Res() res) {
    const collection = await RoleCollectionsApi.deleteRoleCollectionByName(
      req.body.id
    ).execute(this.destination);
    return res.send(collection);
  }

  async addRolesToRoleCollection(@Req() req, @Res() res) {
    let body = req.body;
    const collection = await RoleCollectionsApi.addRolesToRoleCollection(
      body.collectionName,
      body.roleReference
    ).execute(this.destination);
    return res.send(collection);
  }

  async deleteRoleFromRoleCollection(@Req() req, @Res() res) {
    let body = req.body;
    const collection = await RoleCollectionsApi.deleteRoleFromRoleCollection(
      body.roleCollectionName,
      body.roleName,
      body.roleTemplateAppId,
      body.roleTemplateName
    ).execute(this.destination);
    return res.send(collection);
  }
}
