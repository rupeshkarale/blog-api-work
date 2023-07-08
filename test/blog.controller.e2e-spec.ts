/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { BlogService } from '../src/blog/blog.service';
import { CreateBlogDto } from '../src/blog/dto/create-blog.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

import { Repository } from 'typeorm';
import { BlogsEntity } from '../src/blog/entities/blogs.entity';
import { AuthService } from '../src/auth/auth.service';
import { SignupDto } from '../src/auth/dtos/signup.dto';
import { LoginDto } from '../src/auth/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AddCommentDto } from '../src/comments/dtos/add-comment.dto';
// import { faker } from 'faker';

describe('BlogController (e2e)', () => {
  let app: INestApplication;
  let blogService: BlogService;
  let blogRepository: Repository<BlogsEntity>;
  let authService: AuthService;
  let jwtService: JwtService;
  let jwtToken: string;
  let blogId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    blogService = moduleFixture.get<BlogService>(BlogService);
    blogRepository = moduleFixture.get<Repository<BlogsEntity>>(
      getRepositoryToken(BlogsEntity),
    );
    authService = moduleFixture.get<AuthService>(AuthService);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    const signupDto: SignupDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.internet.displayName(),
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(201);

    const loginDto: LoginDto = {
      email: signupDto.email,
      password: signupDto.password,
    };

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201);
    jwtToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/blog (POST)', () => {
    it('should create a new blog', async () => {
      const createBlogDto: CreateBlogDto = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
      };

      const response = await request(app.getHttpServer())
        .post('/blog/blog')
        .send(createBlogDto)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(201);

      blogId = response.body.id;

      expect(response.body.title).toEqual(createBlogDto.title);
      expect(response.body.content).toEqual(createBlogDto.content);
    });
  });

  describe('/blog/blogId/comment (POST)', () => {
    it('add comment to new blog', async () => {
      const addCommentDto: AddCommentDto = {
        comment: faker.lorem.sentence(),
      };
      const response = await request(app.getHttpServer())
        .post(`/blog/${blogId}/comment`)
        .send(addCommentDto)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(201);

      blogId = response.body.id;
      expect(response.body.comment).toEqual(addCommentDto.comment);
    });

    it('add comment to new blog', async () => {
      const response = await request(app.getHttpServer())
        .get(`/blog/${blogId}/comment`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
    });
  });

  describe('/blog/blogId (Delete)', () => {
    it('delete blog by id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/blog/blog/${blogId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(201);
    });
  });
});
