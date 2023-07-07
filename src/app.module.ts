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
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm-config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TypeOrmModule.forRoot({
    //   type: (process.env.PORT as any) || 'mysql',
    //   host: process.env.localhost as any,
    //   port: parseInt(process.env.DB_PORT as string, 10) || 3306,
    //   username: process.env.username,
    //   password: process.env.password,
    //   database: 'blog',
    //   entities: ['dist/**/*.entity.js'],
    //   synchronize: true,
    // }),
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
