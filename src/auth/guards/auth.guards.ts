import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { inspect } from 'util';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);

    constructor(
        private readonly authService: AuthService,
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        /* Get the roles associated with a request */
        const requestRoles = this.reflector.get<string[]>(
            'roles',
            context.getHandler()
        );

        if (!requestRoles) return true;

        const request = context.switchToHttp().getRequest();

        if (request.headers.authorization === undefined) {
            return false
        }
        const jwtToken = request.headers.authorization.replace('Bearer ', '');
        try {
            const jwtDatas = this.authService.verifyJwt(jwtToken);

            if (requestRoles.includes(jwtDatas.user_role)) {
                request.jwtDatas = jwtDatas;
                return true;
            }
        } catch (error) {
            this.logger.debug(error);
            return false;
        }

        /* If there is a role but the request role doen't match it 
        or this is an unknown role we return false*/
        return false;
    }
}
