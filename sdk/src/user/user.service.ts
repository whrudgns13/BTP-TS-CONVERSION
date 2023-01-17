import { Injectable, Req, Res } from "@nestjs/common";
import { SCIMUsersShadowUsersApi } from "../../PlatformAPI/scim-users-shadow-users-api";

@Injectable()
export class UserService {
  
  private destination = { destinationName: "apiAccessDestination" };

  async getUsers() {
    const oUsers = await SCIMUsersShadowUsersApi.getAllUsersUsingGet().execute(this.destination);
    return oUsers;
  }

  async getUser(id: string) {
    const user = await SCIMUsersShadowUsersApi.getUserUsingGet(id).execute(this.destination);
    return user;
  }
  async getCurrentUser(@Req() req, @Res() res) {
    const sCurrentUserId = req.authInfo.getTokenInfo().getUserId();
    const oCurrentUser = await SCIMUsersShadowUsersApi.getUserUsingGet(sCurrentUserId).execute(this.destination);
    return res.send(oCurrentUser);
  }

  async createUser(@Req() req, @Res() res) {
    const oUser = await SCIMUsersShadowUsersApi.createUserUsingPost(req.body).execute(this.destination);
    return res.send(oUser);
  }

  async deleteUser(@Req() req, @Res() res) {
    const oUser = await SCIMUsersShadowUsersApi.deleteUserUsingDelete(req.body.id).execute(this.destination);
    return res.send(oUser);
  }

  async updateUser(@Req() req, @Res() res) {
    //If-Match : *     업데이트할 SCIM 모두 허용
    const oUser = await SCIMUsersShadowUsersApi.updateUserUsingPut(req.body.id, req.body)
      .addCustomHeaders({ "If-Match": "*" })
      .execute(this.destination);
    return res.send(oUser);
  }
}
