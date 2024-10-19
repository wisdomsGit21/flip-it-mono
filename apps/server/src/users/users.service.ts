import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    console.log('User found in UsersService:', user);
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
