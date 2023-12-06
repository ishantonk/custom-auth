import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path: string = request.nextUrl.pathname;
    const accessToken: string = request.cookies.get('accessToken')?.value || '';
    const recoveryToken: string = new URL(request.url).searchParams.get('token')?.valueOf() || '';

    const isPublicPath: boolean = path === '/login' || path === '/signup' || path === '/forget-password';
    const isProtectedPath: boolean = !isPublicPath;
    const isChangePasswordPath: boolean = path === '/change-password';


    if (isPublicPath && accessToken) {
        return NextResponse.redirect(new URL('/', request.url))
    } else if (isProtectedPath && !accessToken) {
        if (isChangePasswordPath && !recoveryToken) {
            return NextResponse.redirect(new URL('/forget-password', request.url))
        } else if (isChangePasswordPath && recoveryToken) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else {
        return NextResponse.next()
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/signup/:path*',
        '/login/:path*',
        '/profile/:path*',
        '/forget-password/:path*',
        '/change-password/:path*',
    ],
}