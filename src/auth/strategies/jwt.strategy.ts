import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AppConfig } from "src/config/configuration";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService<AppConfig, true>) {
		const secretOrKey = configService.get("jwt", { infer: true }).secret as string;
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey,
		});
	}

	async validate(payload: { sub: string; email: string; role: string }) {
		return { id: payload.sub, email: payload.email, role: payload.role };
	}
}
