export interface JwtPayload {
  uuid: number;
  username: string;
  level: string;
  expiresIn: Date;
}
