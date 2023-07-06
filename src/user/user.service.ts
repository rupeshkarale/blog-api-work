/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async findUserById(id: number): Promise<UsersEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmailId(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async save(userEntity: UsersEntity) {
    return await this.userRepository.save(userEntity);
  }
}
