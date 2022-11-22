import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { AddUserDto } from './dto/add-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("profile")
    @Roles(Role.User)
    getUser(@Req() req) {
        return this.userService.getUser(req.jwtDatas.user_id);
    }

    @Post()
    createUser(@Body() addCandidateDto: AddUserDto) {
        return this.userService.createUser(addCandidateDto);
    }

    @Put()
    @Roles(Role.User)
    updateuser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(updateUserDto, req.jwtDatas.user_id);
    }


    // Get All Users
    @Get()
    findAll() {
        return this.userService.getAllUsers();
    }
}
