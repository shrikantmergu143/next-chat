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
        // App_url.link.Home,
        App_url.link.Channel,
    ];

    if (access_token?.value) {
        if (protectedUrlsForAuth.includes(requestedUrl)) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            return NextResponse.next();
        }
    } else {
        if (protectedUrlsForUnauth.some(url => requestedUrl.includes(url))) {
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
};
