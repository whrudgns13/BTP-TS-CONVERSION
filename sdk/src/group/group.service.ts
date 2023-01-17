import { Injectable, Req, Res } from "@nestjs/common";
import { SCIMGroupsRoleCollectionsApi } from "../../PlatformAPI/scim-groups-role-collections-api";
@Injectable()
export class GroupService {
  private destination = { destinationName: "apiAccessDestination" };

  async getRoleColleactions() {
    const roles = await SCIMGroupsRoleCollectionsApi.getAllGroupsUsingGet().execute(
      this.destination
    );
    return roles;
  }

  async addUserRoleColleaction(@Req() req, @Res() res) {
    try {
      const body = req.body;
      const role = await SCIMGroupsRoleCollectionsApi.addUserRoleUsingPost(
        body.id,
        body.group
      ).execute(this.destination);
      return res.send(role);
    } catch (error) {
      return res.send(error);
    }
  }

  async deleteUserRoleColleaction(@Req() req, @Res() res) {
    const body = req.body;
    const role = await SCIMGroupsRoleCollectionsApi.deleteUserRoleUsingDelete(
      body.groupId,
      body.userId
    ).execute(this.destination);
    return res.send(role);
  }
}
