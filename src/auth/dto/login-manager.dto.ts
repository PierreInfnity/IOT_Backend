import { IsString } from 'class-validator';

export class LoginManagerDto {
    @IsString()
    mail: string;

    @IsString()
    password: string;
}
