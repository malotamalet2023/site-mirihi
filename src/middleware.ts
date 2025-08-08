import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Ajouter le pathname dans les headers pour le layout racine
  const response = handleI18nRouting(request);
  
  if (response) {
    response.headers.set('x-pathname', request.nextUrl.pathname);
    return response;
  }
  
  // Si pas de redirection, créer une nouvelle réponse avec le header
  const newResponse = NextResponse.next();
  newResponse.headers.set('x-pathname', request.nextUrl.pathname);
  return newResponse;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
