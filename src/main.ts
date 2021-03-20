import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

import * as cookieParser from "cookie-parser";
import * as hbs from "hbs";
import * as fs from "fs";

require("dotenv").config();

const port: number | string | undefined = process.env.PORT;

function loadComponents(pathName: string) {
  const partialsDir = __dirname + `/../views/${pathName}`;
  const filenames = fs.readdirSync(partialsDir);

  filenames.forEach(function(filename) {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = `${pathName}/${matches[1]}`;
    console.log(name);
    const template = fs.readFileSync(partialsDir + "/" + filename, "utf8");
    hbs.registerPartial(name, template);
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  loadComponents("partials");
  loadComponents("pages");
  loadComponents("components");

  app.set("view options", { layout: "/partials/index.hbs" });

  if (port) {
    await app.listen(port);
  }
}

bootstrap();

console.log(`


      ### NEST APPLICATION RUNNING ON http://localhost:${process.env.PORT} ###


`);
