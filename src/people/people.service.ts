import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      if (!createPersonDto) return new BadRequestException('Invalid data');

      const data = {
        name: createPersonDto.name,
        email: createPersonDto.email,
        passwordHash: createPersonDto.password,
      };

      return await this.peopleRepository.save(data);
    } catch (error) {
      if (error.code === 'EREQUEST') {
        throw new ConflictException('Email already exists');
      }
      throw new BadRequestException('Failed to create person');
    }
  }

  async findAll() {
    return this.peopleRepository.find({});
  }

  async findOne(id: number) {
    const person = await this.peopleRepository.findOne({
      where: { id },
    });
    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.peopleRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    const updatedPerson = {
      name: updatePersonDto.name,
      passwordHash: updatePersonDto.password,
    };
    try {
      await this.peopleRepository.update(id, updatedPerson);
      return this.peopleRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException('Failed to update person');
    }
  }

  async remove(id: number) {
    const person = await this.peopleRepository.findOneBy({ id });
    if (person) {
      await this.peopleRepository.remove(person);
      return { message: `Person with id ${id} has been removed` };
    } else {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
  }
}
