import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get("next-auth.session-token");

  if (!cookies)
    return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|auth\\/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
