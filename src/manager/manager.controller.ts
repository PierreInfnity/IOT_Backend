import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { AddManagerDto } from './dto/add-manager-dto';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) { }

    @Get("profile")
    @Roles(Role.Manager)
    getmanager(@Req() req) {
        return this.managerService.getManager(req.jwtDatas.manager_id);
    }

    @Post()
    createmanager(@Body() addCandidateDto: AddManagerDto) {
        return this.managerService.createManager(addCandidateDto);
    }

    // Get All managers
    @Get()
    findAll() {
        return this.managerService.getAllManagers();
    }
}