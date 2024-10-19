import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(`Validating user: ${email}`);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('Validation failed: Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('Validation successful:', user);
    return user;
  }
}
