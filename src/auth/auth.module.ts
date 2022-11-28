import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';


import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
    imports: [
        JwtModule.register({
            secret: "password",
        }),
        UserModule,
        ManagerModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }