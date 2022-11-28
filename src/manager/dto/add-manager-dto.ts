import { IsString } from 'class-validator';

export class AddManagerDto {
    @IsString()
    mail: string;

    @IsString()
    password: string;
}