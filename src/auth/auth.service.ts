import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dtos/signup.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { secretKey } from 'src/shareble/constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async validateUser(payload: JwtPayload): Promise<UsersEntity> {
    const userEntity = await this.usersService.findUserById(payload.userId);

    if (!userEntity) {
      throw new UnauthorizedException('user not found');
    }
    return userEntity;
  }

  async login(body: LoginDto): Promise<{ token: string }> {
    // Logic to generate and return a JWT token for the authenticated user

    const userEntity = await this.usersService.findByEmailId(body.email);

    if (!userEntity) {
      throw new UnauthorizedException('email id is not register ');
    }

    const isMatch = bcrypt.compareSync(body.password, userEntity.password);

    if (!isMatch) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload: JwtPayload = {
      userId: userEntity.id,
      email: userEntity.email,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: secretKey,
    });
    return { token };
  }

  async signup(createUserDto: SignupDto): Promise<UsersEntity> {
    const { name, email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userEntity = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return await this.usersService.save(userEntity);
  }
}
