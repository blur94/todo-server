import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   console.log(token);

//   if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
// }

export { default } from "next-auth/middleware";

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
