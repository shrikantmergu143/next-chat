import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import App_url from './components/common/constant';

export function middleware(request) {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access_token');
    const requestedUrl = new URL(request.url).pathname;

    const protectedUrlsForAuth = [
        App_url.link.Login,
        App_url.link.Register,
    ];

    const protectedUrlsForUnauth = [
        App_url.link.Channel,
    ];

    console.log(`Access Token: ${access_token?.value}`);
    console.log(`Requested URL: ${requestedUrl}`);

    if (access_token?.value) {
        if (protectedUrlsForAuth.includes(requestedUrl)) {
            console.log(`Redirecting authenticated user away from: ${requestedUrl}`);
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            return NextResponse.next();
        }
    } else {
        if (protectedUrlsForUnauth.includes(requestedUrl)) {
            console.log(`Redirecting unauthenticated user to login from: ${requestedUrl}`);
            return NextResponse.redirect(new URL('/login', request.url));
        } else {
            return NextResponse.next();
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
    matcher: [
        '/login', 
        '/register', 
        '/channel', 
        '/', 
        '/:path*',
        "/ws"
    ],
};
