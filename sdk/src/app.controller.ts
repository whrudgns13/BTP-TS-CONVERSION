import { Controller, Get, Req, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRolePermission(@Req() req, @Res() res) {
    let oPermission = {
      create: false,
      read: false,
      update: false,
      delete: false
    };

    if (req.authInfo.checkScope("$XSAPPNAME.Admin")) {
      oPermission.create = true;
      oPermission.read = true;
      oPermission.update = true;
      oPermission.delete = true;

      res.send(oPermission);
    }

    if (req.authInfo.checkScope("$XSAPPNAME.Read")) {
      oPermission.read = true;
    }

    if (req.authInfo.checkScope("$XSAPPNAME.Create")) {
      oPermission.create = true;
    }

    if (req.authInfo.checkScope("$XSAPPNAME.Update")) {
      oPermission.update = true;
    }

    if (req.authInfo.checkScope("$XSAPPNAME.Delete")) {
      oPermission.delete = true;
    }

    res.send(oPermission);
  }
}
