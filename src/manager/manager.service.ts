import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginManagerDto } from 'src/auth/dto/login-manager.dto';
import { Manager } from 'src/entity/Manager.entity';
import { checkPassword } from 'src/utils/auth.utils';
import { Repository } from 'typeorm';
import { AddManagerDto } from './dto/add-manager-dto';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager)
        private managersRepository: Repository<Manager>,
    ) { }

    async createManager(addCandidateDto: AddManagerDto): Promise<Manager> {
        const manager = new Manager();
        manager.password = addCandidateDto.password;
        manager.mail = addCandidateDto.mail

        return this.managersRepository.save(manager);
    }


    async findOneByEmail(mail: string): Promise<Manager> {
        return this.managersRepository.findOne({ where: { mail: mail } });

    }


    async findOneById(id: string): Promise<Manager> {
        return this.managersRepository.findOne({ where: { id: id } });

    }

    getManager(managerId: string) {
        return this.managersRepository.findOneBy({ id: managerId });
    }

    getAllManagers() {
        return this.managersRepository.find();
    }

    async checkCredentials(authManager: LoginManagerDto): Promise<Manager> {
        let manager: Manager = await this.findOneByEmail(authManager.mail)
        if (manager == null || manager == undefined)
            return null;
        let match = checkPassword(authManager.password, manager.password)
        if (match)
            return manager;
        return null;
    }
}
