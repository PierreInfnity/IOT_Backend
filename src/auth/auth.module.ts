import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';


import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';


@Module({
    imports: [
        JwtModule.register({
            secret: "password",
        }),
        UserModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }