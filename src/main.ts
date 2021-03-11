import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import * as hbs from "hbs";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  // hbs.registerPartial('navigation_area', '/views/partials/navigation_area.');
  app.setViewEngine("hbs");
  // hbs.registerPartials(__dirname + '/views/partials');

  loadComponents("partials");
  loadComponents("pages");
  loadComponents("components");

  // hbs.registerPartial('navigation_area', '/partials/navigation_area');

  app.set("view options", { layout: "/partials/index.hbs" });

  await app.listen(3000);
}

bootstrap();

function loadComponents(pathName: string) {
  const partialsDir = __dirname + `/../views/${pathName}`;
  const filenames = fs.readdirSync(partialsDir);

  filenames.forEach(function(filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = `${pathName}_${matches[1]}`;
    console.log(name);
    const template = fs.readFileSync(partialsDir + "/" + filename, "utf8");
    hbs.registerPartial(name, template);
  });
}

console.log(`


      ### NEST APPLICATION RUNNING ON http://localhost:3000 ###


`);
