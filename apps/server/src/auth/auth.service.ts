import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email: email,
      password: hashedPassword,
    });

    const { password: _, ...result } = user;
    return result;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('Attempting to validate user:', email);
    const user = await this.usersService.findOne(email);
    console.log('User found:', user ? 'Yes' : 'No');
    if (user && (await bcrypt.compare(pass, user.password))) {
      console.log('Password match:', 'Yes');
      const { password, ...result } = user;
      return result;
    }
    console.log('Password match:', 'No');
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    console.log(payload, 'payload');
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
