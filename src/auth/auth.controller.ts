import {
    Controller,
    Logger,
    HttpException,
    HttpStatus,
    Body,
    Post,
    Put
} from '@nestjs/common';
import { AddUserDto } from 'src/user/dto/add-user-dto';
import { inspect } from 'util';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

import { LoginManagerDto } from './dto/login-manager.dto';
import { AddManagerDto } from 'src/manager/dto/add-manager-dto';


@Controller('auth')
export class AuthController {

    constructor(
        private service: AuthService,
    ) { }

    @Post('register')
    async register_user(@Body() addUsertDto: AddUserDto): Promise<any> {
        try {
            const tokens = await this.service.register(
                addUsertDto
            );
            return { accessToken: tokens.accessToken };
        } catch (error) {
            Logger.error(error);
            throw new HttpException(error, HttpStatus.UNAUTHORIZED);
        }
    }


    @Put('login')
    async login_user(@Body() loginUserDto: LoginUserDto): Promise<any> {
        try {
            console.log(inspect(loginUserDto))

            const tokens = await this.service.login(
                loginUserDto
            );
            return { accessToken: tokens.accessToken };
        } catch (error) {
            Logger.error(error);
            throw new HttpException(error, HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('register/manager')
    async register_manager(@Body() addManagerDto: AddManagerDto): Promise<any> {
        try {
            const tokens = await this.service.register_manager(
                addManagerDto
            );
            return { accessToken: tokens.accessToken };
        } catch (error) {
            Logger.error(error);
            throw new HttpException(error, HttpStatus.UNAUTHORIZED);
        }
    }

    @Put('login/manager')
    async login_manager
    (@Body() loginManagerDto: LoginManagerDto): Promise<any> {
        try {
            console.log(inspect(loginManagerDto))

            const tokens = await this.service.login(
                loginManagerDto
            );
            return { accessToken: tokens.accessToken };
        } catch (error) {
            Logger.error(error);
            throw new HttpException(error, HttpStatus.UNAUTHORIZED);
        }
    }
}
