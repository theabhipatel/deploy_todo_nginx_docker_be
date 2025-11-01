import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, verifyRefreshToken, setTokenCookies } from '../utils/jwt';

export interface AuthRequest extends Request {
  userId?: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
      return;
    }

    // Try to verify access token
    if (accessToken) {
      try {
        const decoded = verifyAccessToken(accessToken);
        req.userId = decoded.userId;
        next();
        return;
      } catch (error) {
        // Access token expired, try refresh token
        if (!refreshToken) {
          res.status(401).json({
            success: false,
            message: 'Access token expired and no refresh token',
          });
          return;
        }
      }
    }

    // Try to verify refresh token and issue new access token
    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);
        req.userId = decoded.userId;
        
        // Issue new tokens
        setTokenCookies(res, decoded.userId);
        
        next();
        return;
      } catch (error) {
        res.status(401).json({
          success: false,
          message: 'Invalid or expired refresh token',
        });
        return;
      }
    }

    res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, token verification failed',
    });
  }
};