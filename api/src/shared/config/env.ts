import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  SECRET_JWK: string;

  @IsString()
  @IsNotEmpty()
  PORT: string;
}

export const env: Env = plainToInstance(Env, {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_JWK: process.env.SECRET_JWK,
  PORT: process.env.PORT,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
