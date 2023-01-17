import { Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get("/currentUser")
  getCurrentUser(@Req() req, @Res() res) {
    return this.userService.getCurrentUser(req, res);
  }

  @Get("/id/:id")
  getUser(@Param("id") id : string) {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Req() req, @Res() res) {
    return this.userService.createUser(req, res);
  }

  @Delete()
  deleteUser(@Req() req, @Res() res) {
    return this.userService.deleteUser(req, res);
  }

  @Put()
  updateUser(@Req() req, @Res() res) {
    return this.userService.updateUser(req, res);
  }
}
