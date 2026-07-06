import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/general-error-handler";
import TokenService from "../service/token.service";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      decoded?: any;
    }
  }
}

const _tokenService = new TokenService();

export const decodedToken_and_fetchUser = async (authorization: string) => {
  if (!authorization) {
    throw new AppError("Unauthorized: token missing.", 401);
  }
  const [prefix, token] = authorization.split(" ");
  if (!token) throw new AppError("Unauthorized: token missing", 401);

  const { ACCESS_SECRET_KEY } = await _tokenService.getSignature(prefix!);
  var { decoded, user } = await _tokenService.decodedToken_and_fetchUser(
    token,
    ACCESS_SECRET_KEY,
  );

  return { user, decoded };
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const { user, decoded } = await decodedToken_and_fetchUser(authorization!);
  // ------------------------------>
  req.user = user;
  req.decoded = decoded;
  next();
};
