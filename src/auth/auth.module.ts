import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './constants/jwt.constants';
import { ManagersModule } from 'src/managers/managers.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { Manager } from 'src/managers/entities/manager.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Manager,Employee]),
    ManagersModule,
    EmployeesModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { 
        expiresIn: EXPIRES_IN 
      },
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
