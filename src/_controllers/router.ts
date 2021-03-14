import { JwtAuthGuard } from "./../auth/jwt-auth.guard";
import { AuthService } from "./../auth/auth.service";
import { LocalAuthGuard } from "./../auth/local-auth.guard";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Req,
  UseGuards
} from "@nestjs/common";
import { Pages, PageControllers } from "../_utilities/templates.enum";
import { routeDataConstructor } from "./router.functions";
import { Response, Request } from "express";
import { FileService } from "../_services/file.service";
import { Log } from "../_utilities/constants.class";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class Router {
  private globalSiteData: any;

  constructor(private authService: AuthService) {
    this.initialiseDatabaseState();
  }

  private initialiseDatabaseState(): void {
    FileService.queryDb("mock-site")
      .then((response: any) => {
        this.globalSiteData = response.payload;
      })
      .catch((error: any) => {
        Log(error.payload);
      });
  }

  //   $ # POST admin17/login
  // $ curl -X POST http://localhost:3000/admin17/login -d '{"username": "admin", "password": "admin"}' -H "Content-Type: application/json"
  // $ # result -> {"access_token":"<TOKEN>"" }

  @UseGuards(LocalAuthGuard)
  @Post("admin17/login")
  async login(@Req() req, @Res() res: Response) {
    // const authToken = await this.authService.login(req.user);
    const { user } = req;
    console.log(user);
    const cookie = this.authService.getCookieWithJwtToken(req.id);
    res.setHeader("Set-Cookie", cookie);
    return res.send(user);
  }

  //   $ # GET /profile using access_token returned from previous step as bearer code
  // $ curl http://localhost:3000/profile -H "Authorization: Bearer <TOKEN>."
  // $ # result -> {"userId":1,"username":"john"}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req, @Res() res) {
    res.send("OK!");
  }

  @Post("/submit")
  public formHander(
    @Res() res: Response,
    @Body() body: Body,
    @Req() req: Request
  ) {
    console.log("body", body);
    routeDataConstructor(res, "success", this.globalSiteData);
  }

  @Get("")
  public baseRouteFinder(@Res() res: Response) {
    routeDataConstructor(res, "home", this.globalSiteData);
  }

  @Get(":id")
  public primaryRouteHandler(
    @Param() param: { id: string },
    @Res() res: Response
  ) {
    routeDataConstructor(res, param.id, this.globalSiteData);
  }

  @Get("admin17/login")
  public adminLogin(@Res() res: Response) {
    routeDataConstructor(res, "admin17/login", this.globalSiteData);
  }
}
