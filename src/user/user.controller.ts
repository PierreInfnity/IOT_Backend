import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddUserDto } from './dto/add-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get(":userId")
    getUser(@Param("userId") userId: number) {
        return this.userService.getUser(userId);
    }

    @Post()
    createUser(@Body() addCandidateDto: AddUserDto) {
        return this.userService.createUser(addCandidateDto);
    }

    // Get All Users
    @Get()
    findAll() {
        return this.userService.getAllUsers();
    }
}
