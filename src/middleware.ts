import { type NextRequest, NextResponse } from 'next/server';
import { env } from './env';

const BASIC_USER = env.BASIC_USER ?? '';
const BASIC_PASS = env.BASIC_PASS ?? '';

export const isAuthorized = (authHeader: string | null): boolean => {
  if (!authHeader || !authHeader?.startsWith('Basic ')) {
    return false;
  }
  const decoded = Buffer.from(authHeader.slice(6).trim(), 'base64').toString('utf8');
  const [user, pass] = decoded.split(':');
  return user === BASIC_USER && pass === BASIC_PASS;
};

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (isAuthorized(authHeader)) {
    return NextResponse.next();
  }
  return new Response('Auth Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
  });
}

export const config = {
  matcher: ['/cover']
};
