import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { BasketService } from './basket.service';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) { }

    /*   @Post("reservation/:userId") // create a basket and assign it to a user
      reservation(@Param("userId") userId: string) {
          return this.basketService.reservation(userId);
      } */

    @Post("reservation/:shoppingCartId") // create a basket and assign it to a user with a shoppingCartId
    reservationWithCartId(@Req() req, @Param("shoppingCartId") shoppingCartId: string) {
        return this.basketService.reservationWithCartId(req.jwtDatas.user_id, shoppingCartId);
    }

    @Put("addItem") //addItem to basket
    @Roles(Role.User)
    addItem(@Body() updateBasketDto: UpdateBasketDto) {
        return this.basketService.addItem(updateBasketDto);
    }

    @Put("removeItem") //Remove item to basket
    @Roles(Role.User)
    removeItem(@Body() updateBasketDto: UpdateBasketDto) {
        return this.basketService.removeItem(updateBasketDto);
    }

    @Get()
    findAll() {
        return this.basketService.getAllBaskets();
    }

    @Get(':id')
    getOne(@Param("id") id: string) {
        return this.basketService.getOne(id);
    }

    @Get('active')
    @Roles(Role.User)
    findActiveBasketForUser(@Req() req) {
        return this.basketService.findActiveBasketForUser(req.jwtDatas.user_id);
    }

    @Put("pay/:id") //Pay basket
    @Roles(Role.User)
    payBasket(@Param("id") id: string) {
        return this.basketService.payBasket(id);
    }
}
