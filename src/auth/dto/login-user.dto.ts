import { IsString } from 'class-validator';

export class LoginUserDto {
    @IsString()
    mail: string;

    @IsString()
    password: string;
}
