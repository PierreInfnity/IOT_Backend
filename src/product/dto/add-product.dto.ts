import { IsString } from 'class-validator';

export class AddProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    price: string;

    @IsString()
    image: string;
}
