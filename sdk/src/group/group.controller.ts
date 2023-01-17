import { Controller, Delete, Get, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Get()
    getRoleColleactions() {
        return this.groupService.getRoleColleactions();
    }

    @Post()
    addUserRoleColleaction(@Req() req, @Res() res) {
        return this.groupService.addUserRoleColleaction(req, res);
    }

    @Delete()
    deleteUserRoleColleaction(@Req() req, @Res() res) {
        return this.groupService.deleteUserRoleColleaction(req, res);
    }

    // @Patch()
    // updateRoleColleaction(@Req() req, @Res() res) {
    //     return this.groupService.updateRoleColleaction(req, res);
    // }


    // @Delete("/role")
    // deleteRoleColleaction(@Req() req, @Res() res) {
    //     return this.groupService.deleteRoleColleaction(req, res);
    // }
}
