import jwt, { JwtPayload } from 'jsonwebtoken';


const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

const generateJWT = (userId: string): string => {

  const jwtToken = jwt.sign({ userId, purpose: 'login' }, JWT_SECRET!);
  return jwtToken;

}

const generatePasswordResetJWT = (userId: string): string => {

  const jwtToken = jwt.sign({ userId, purpose: 'reset-password' }, JWT_SECRET!, { expiresIn: 600 });
  return jwtToken;

}

const verifyJWT = (jwtToken: string): string | JwtPayload => {

  const jwtPayload: string | JwtPayload = jwt.verify(jwtToken, JWT_SECRET!);
  return jwtPayload;

}


export {
  generateJWT,
  generatePasswordResetJWT,
  verifyJWT
}
