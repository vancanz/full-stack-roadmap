import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto/register.dto'
import { compare } from 'bcrypt'
import { User } from '../users/users.entity'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // register
  register(body: RegisterDto) {
    return this.usersService.createUser(body)
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user: User = await this.usersService.findOne({ email })

    const passwordIsValid = await compare(password, user.password)
    if (!passwordIsValid) throw new UnauthorizedException('Password is wrong')

    return user
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)
    const payload = {
      id: user._id,
      role: user.role,
    }
    return { token: this.jwtService.sign(payload) }
  }
}
