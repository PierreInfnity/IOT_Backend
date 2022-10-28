import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user-dto';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    createUser(addCandidateDto: AddUserDto) {
        const user = new User();
        user.firstName = addCandidateDto.firstName;
        user.lastName = addCandidateDto.lastName;

        return this.usersRepository.save(user);
    }

    getUser(userId: number) {
        return this.usersRepository.findOneBy({ id: userId });
    }
}
