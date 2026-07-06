import jwt from "jsonwebtoken";
import type {
  Jwt,
  JwtPayload,
  PrivateKey,
  Secret,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";
import { AppError } from "../utils/general-error-handler";
import UserRepository from "../../DB/repositories/user.repository";
import {
  ACCESS_SECRET_KEY_ADMIN,
  ACCESS_SECRET_KEY_USER,
  PREFIX_ADMIN,
  PREFIX_USER,
  REFRESH_SECRET_KEY_ADMIN,
  REFRESH_SECRET_KEY_USER,
} from "../../config/config.service";

class TokenService {
  private readonly _userRepo = new UserRepository();
  constructor() {}

  GenerateToken = ({
    payload,
    secret_key,
    options = {},
  }: {
    payload: string | object | Buffer;
    secret_key: Secret | PrivateKey;
    options?: SignOptions;
  }): string => {
    return jwt.sign(payload, secret_key, options);
  };

  VerifyToken = ({
    token,
    secret_key,
    options,
  }: {
    token: string;
    secret_key: Buffer | jwt.Secret;
    options?: VerifyOptions;
  }): Jwt | JwtPayload | string => {
    try {
      return jwt.verify(token, secret_key, options);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("jwt expired", 401);
      }
      if (error.name === "JsonWebTokenError") {
        throw new AppError("Invalid token", 401);
      }
      throw new AppError("Unauthorized: token verification failed", 401);
    }
  };

  getSignature = async (prefix: string) => {
    let ACCESS_SECRET_KEY = "";
    let REFRESH_SECRET_KEY = "";
    if (prefix == PREFIX_USER) {
      ACCESS_SECRET_KEY = ACCESS_SECRET_KEY_USER!;
      REFRESH_SECRET_KEY = REFRESH_SECRET_KEY_USER!;
    } else if (prefix == PREFIX_ADMIN) {
      ACCESS_SECRET_KEY = ACCESS_SECRET_KEY_ADMIN!;
      REFRESH_SECRET_KEY = REFRESH_SECRET_KEY_ADMIN!;
    } else throw new AppError("Unauthorized: invalid token type", 401);

    return { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY };
  };

  decodedToken_and_fetchUser = async (token: string, secret: string) => {
    const decoded = await this.VerifyToken({ token, secret_key: secret });
    if (typeof decoded === "string" || !decoded || !("id" in decoded)) {
      throw new AppError("Unauthorized: Invalid token", 401);
    }
    const user = await this._userRepo.findOne({ filter: { _id: decoded.id } });
    if (!user) throw new AppError("User not found", 401);
    return { user, decoded };
  };
}

export default TokenService;
