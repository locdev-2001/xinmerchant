import { ENV } from "@config/env.config";
import jwt, { JwtPayload } from "jsonwebtoken";

export default class JwtService {
  private secret: string;

  constructor() {
    this.secret = ENV.JWT_SIGNING_KEY || "";
  }

  generateAccessToken(params: { id: string; email: string }): string {
    return jwt.sign({ ...params, timestamp: Date.now() }, this.secret, {
      expiresIn: "8h",
    });
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
