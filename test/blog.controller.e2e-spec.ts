/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { BlogService } from '../src/blog/blog.service';
import { CreateBlogDto } from '../src/blog/dto/create-blog.dto';
import { UsersEntity } from '../src/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogsEntity } from '../src/blog/entities/blogs.entity';
import { AuthService } from '../src/auth/auth.service';
import { SignupDto } from '../src/auth/dtos/signup.dto';
import { LoginDto } from '../src/auth/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import { faker } from 'faker';

describe('BlogController (e2e)', () => {
  let app: INestApplication;
  let blogService: BlogService;
  let blogRepository: Repository<BlogsEntity>;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })import { IsEmail } from 'class-validator';
.compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    blogService = moduleFixture.get<BlogService>(BlogService);
    blogRepository = moduleFixture.get<Repository<BlogsEntity>>(
      getRepositoryToken(BlogsEntity),
    );
    authService = moduleFixture.get<AuthService>(AuthService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user', async () => {
        const signupDto: SignupDto = {
            email: faker.internet.email(),
            password: String(faker.internet.password()),
            name: faker.internet.name()
        };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupDto)
        .expect(201);

      

      expect(response).toBeDefined(id);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should authenticate the user and return a JWT token', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'password',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(201);

      const token = response.body.access_token;

      expect(token).toBeDefined();
    });
  });

  describe('/blog (POST)', () => {
    let jwtToken: string;

    beforeAll(async () => {
      const signupDto: SignupDto = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupDto)
        .expect(201);

      const loginDto: LoginDto = {
        username: signupDto.username,
        password: signupDto.password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(201);

      jwtToken = loginResponse.body.access_token;
    });

    it('should create a new blog', async () => {
      const createBlogDto: CreateBlogDto = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
      };

      const response = await request(app.getHttpServer())
        .post('/blog')
        .send(createBlogDto)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(201);

      const createdBlog = await blogRepository.findOne(response.body.id);

      expect(createdBlog).toBeDefined();
      expect(createdBlog.title).toEqual(createBlogDto.title);
      expect(createdBlog.content).toEqual(createBlogDto.content);
    });
  });

  // Add more test cases for other endpoints (GET, PATCH, DELETE) similarly
});
