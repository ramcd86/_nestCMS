

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as fs from 'fs';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // hbs.registerPartial('navigation_area', '/views/partials/navigation_area.');
  app.setViewEngine('hbs');
  hbs.registerPartials(__dirname + '/views/partials');

  // hbs.registerPartial('navigation_area', '/partials/navigation_area');

  app.set('view options', { layout: '/partials/index.hbs' });



  await app.listen(3000);
}
bootstrap();

console.log(`


      ### NEST APPLICATION RUNNING ON http://localhost:3000 ###


`);
