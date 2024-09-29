import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  resgisterUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    console.log(createUserDto);
    
    return this.userRepository.save(createUserDto);
  }

  async loginUser(createUserDto: CreateUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: createUserDto.userEmail,
      }
    })
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword)
    if (!match) throw new UnauthorizedException('No estas autorizado') 
    return;
  }
}
