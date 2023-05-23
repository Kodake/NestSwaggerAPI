import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from './auth/auth.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({
    envFilePath: '.env',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Apply the middleware to all routes
  }
}
