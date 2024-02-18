export interface JwtPayload {
  uuid: number;
  customer: string;
  username: string;
  level: string;
  expiresIn: Date;
}
