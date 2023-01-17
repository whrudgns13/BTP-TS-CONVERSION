import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getServices } from '@sap/xsenv';
import * as passport from 'passport';
import { JWTStrategy } from '@sap/xssec';

const xsuaa = getServices({ uaa: { tag: 'xsuaa' } }).uaa;
passport.use(new JWTStrategy(xsuaa));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.use(passport.authenticate('JWT', { session: false }));
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
