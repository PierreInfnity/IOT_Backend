import { IsString } from 'class-validator';

export class UpdateBasketDto {
    @IsString()
    idBasket: string;

    @IsString()
    idProduct: string;
}
