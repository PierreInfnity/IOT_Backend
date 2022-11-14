import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { User } from 'src/entity/User.entity';
import { checkPassword } from 'src/utils/auth.utils';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    createUser(addCandidateDto: AddUserDto) {
        const user = new User();
        user.firstName = addCandidateDto.firstName;
        user.lastName = addCandidateDto.lastName;
        user.password = addCandidateDto.password;
        user.mail = addCandidateDto.mail

        return this.usersRepository.save(user);
    }

    async findOneByEmail(mail: string): Promise<User> {
        return this.usersRepository.findOne({ where: { mail: mail } });

    }

    getUser(userId: string) {
        return this.usersRepository.findOneBy({ id: userId });
    }

    getAllUsers() {
        return this.usersRepository.find();
    }

    async checkCredentials(authUser: LoginUserDto): Promise<User> {
        let user: User = await this.findOneByEmail(authUser.mail)
        if (user == null || user == undefined)
            return null;
        let match = checkPassword(authUser.password, user.password)
        if (match)
            return user;
        return null;
    }
}
