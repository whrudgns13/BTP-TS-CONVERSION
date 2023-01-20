import { Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { RoleCollectionService } from './role-collection.service';

@Controller('role-collection')
export class RoleCollectionController {
    constructor(private readonly roleColleactionService: RoleCollectionService) { }

    @Get()
    getRoleCollections(@Req() req, @Res() res) {
        return this.roleColleactionService.getRoleCollections(req, res);
    }
    
    @Get(":roleCollectionName")
    getRoleCollection(@Param("roleCollectionName") roleCollectionName : string, @Res() res) {
        return this.roleColleactionService.getRoleCollection(roleCollectionName, res);
    }

    @Put()
    changeRoleCollectionDescription(@Req() req, @Res() res) {
        return this.roleColleactionService.changeRoleCollectionDescription(req, res);
    }

    @Post()
    createRoleCollection(@Req() req, @Res() res) {
        return this.roleColleactionService.createRoleCollection(req, res);
    }

    @Delete()
    deleteRoleCollectionByName(@Req() req, @Res() res) {
        return this.roleColleactionService.deleteRoleCollectionByName(req, res);
    }

    @Put("/role")
    addRolesToRoleCollection(@Req() req, @Res() res) {
        return this.roleColleactionService.addRolesToRoleCollection(req, res);
    }

    @Delete("/role")
    deleteRoleFromRoleCollection(@Req() req, @Res() res) {
        return this.roleColleactionService.deleteRoleFromRoleCollection(req, res);
    }
}
