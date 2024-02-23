import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



const protectedRoutes = "/dashboard";
const authRoutes = "/login";

export function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get("connect.sid")?.value;
  // if (
  //   request.nextUrl.pathname.startsWith(protectedRoutes) &&
  //   (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  // ) {
  //   request.cookies.delete("currentUser");
  //   const response = NextResponse.redirect(new URL(`${request.nextUrl.locale === "en" ? "en":""}/log`, request.url));
  //   response.cookies.delete("currentUser");
  //   return response;
  // }
  // if (request.nextUrl.pathname.startsWith(authRoutes) && currentUser) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));

  // }
  return NextResponse.next();
}
export const config = {
    matcher: ['/dashboard/:path*', '/'],
  }