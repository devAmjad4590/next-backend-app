import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = [
    '/api/login',
    '/api/logout',
    '/api/public',
    '/',
];

const SECRET = new TextEncoder().encode("123"); // Use a Uint8Array for the secret

export const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;

    // Allow public routes to pass through
    if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    // Get the token from cookies
    const token = req.cookies.get('token')?.value;
    console.log("Token:", token);

    if (!token) {
        return NextResponse.json({ message: "No Token was found" }, { status: 401 });
    }

    try {
        // Verify the token using jose
        const { payload } = await jwtVerify(token, SECRET);
        console.log("Decoded Token:", payload);

        return NextResponse.next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        return NextResponse.json({ message: "Invalid token or Expired" }, { status: 401 });
    }
};

export const config = {
    matcher: ['/api/:path*'], // Only apply to /api routes
};