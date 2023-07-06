import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.PORT as any) || 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'blog',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'your-secret',
    }),

    BlogModule,
    UserModule,
    CommentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
