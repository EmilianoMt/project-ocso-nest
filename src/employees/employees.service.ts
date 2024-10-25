import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}


  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findByLocations(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({id: id});

    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeUpd = await this.employeeRepository.preload({
      id: id,
      ...updateEmployeeDto
    });
    if (!employeeUpd) throw new NotFoundException('Employee not found');
    this.employeeRepository.save(employeeUpd);
    return employeeUpd;
  }

  remove(id: string) {
    this.findOne(id);
    this.employeeRepository.delete(id);

    return {
      message: `Employee with ${id} deleted`,
    };
  }
}
