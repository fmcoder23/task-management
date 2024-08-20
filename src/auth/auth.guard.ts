import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1];
        let payload;

        try {
            payload = this.jwtService.verify(token, {
                secret: this.config.get("JWT_SECRET_KEY")
            });
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        if (!payload.id) {
            throw new UnauthorizedException('Unauthorized');
        }

        req.user = payload;
        return true;
    }
}
