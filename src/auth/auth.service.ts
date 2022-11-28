import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { randomUUID } from 'crypto';
import { AddUserDto } from 'src/user/dto/add-user-dto';
import { UserService } from 'src/user/user.service';

import { AddManagerDto } from 'src/manager/dto/add-manager-dto';
import { ManagerService } from 'src/manager/manager.service';
import { LoginManagerDto } from './dto/login-manager.dto';

import { hashPassword } from '../utils/auth.utils';
import { Role } from './decorators/roles.enum';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly managerService: ManagerService
    ) {
    }

    async register(authUser: AddUserDto): Promise<JwtResponseDto> {

        let client = await this.userService.findOneByEmail(authUser.mail)
        if (client)
            throw new UnauthorizedException('already_registered');

        let hashedPassword = hashPassword(authUser.password)
        const AddCandidatDto: AddUserDto = {
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            mail: authUser.mail,
            password: hashedPassword
        };

        const addCandidat = await this.userService.createUser(AddCandidatDto);

        const accessToken = await this.createAccessToken({ sub: addCandidat.id, user_id: addCandidat.id, user_role: Role.User });

        return { accessToken };
    }

    async register_manager(authUser: AddManagerDto): Promise<JwtResponseDto> {

        let client = await this.managerService.findOneByEmail(authUser.mail)
        if (client)
            throw new UnauthorizedException('already_registered');

        let hashedPassword = hashPassword(authUser.password)
        const AddCandidatDto: AddManagerDto = {
            mail: authUser.mail,
            password: hashedPassword
        };

        const addCandidat = await this.managerService.createManager(AddCandidatDto);

        const accessToken = await this.createAccessToken({ sub: addCandidat.id, user_id: addCandidat.id, user_role: Role.User });

        return { accessToken };
    }

    async login(authUser: LoginUserDto): Promise<JwtResponseDto> {

        let user = await this.userService.checkCredentials(authUser);
        if (!user) {
            this.logger.error('Bad credentials');
            throw new UnauthorizedException('bad_credentials');
        }
        const accessToken = await this.createAccessToken({ sub: user.id, user_id: user.id, user_role: Role.User });
        return { accessToken };
    }

    async login_manager(authUser: LoginManagerDto): Promise<JwtResponseDto> {

        let user = await this.managerService.checkCredentials(authUser);
        if (!user) {
            this.logger.error('Bad credentials');
            throw new UnauthorizedException('bad_credentials');
        }
        const accessToken = await this.createAccessToken({ sub: user.id, user_id: user.id, user_role: Role.User });
        return { accessToken };
    }

    async createAccessToken(
        payload: any,
        options?: JwtSignOptions // Override for tests
    ): Promise<string> {
        return await this.jwtService.signAsync(payload, { jwtid: randomUUID(), ...options });
    }


    verifyJwt(payload: string) {
        return this.jwtService.verify(payload);
    }

}
