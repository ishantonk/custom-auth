import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path: string = request.nextUrl.pathname;
    const accessToken: string = request.cookies.get('accessToken')?.value || '';

    const isPublicPath: boolean = path === '/login' || path === '/signup';
    const isProtectedPath: boolean = !isPublicPath;


    if (isPublicPath && accessToken) {
        return NextResponse.redirect(new URL('/', request.url))
    } else if (isProtectedPath && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/signup/:path*',
        '/login/:path*',
        '/profile/:path*',
    ],
}