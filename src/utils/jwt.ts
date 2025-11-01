import jwt, { SignOptions } from 'jsonwebtoken';
import { Response } from 'express';

interface TokenPayload {
  userId: string;
}

const JWT_EXPIRE = process.env.JWT_EXPIRE  || '15m'
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE  || '7d'

export const generateAccessToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: '15m',
  };
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, options);
};

export const generateRefreshToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: '7d',
  };
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
};

export const setTokenCookies = (res: Response, userId: string): void => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  // Set access token cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Set refresh token cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const clearTokenCookies = (res: Response): void => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });
};