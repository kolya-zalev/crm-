import { auth } from "@/auth";
import { NextResponse } from "next/server";

const guestRoutes = ["/login", "/signup"];
const publicRoutes = ["/login"];

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!request.auth;
  const isPublic = publicRoutes.includes(pathname);
  const isGuest = guestRoutes.includes(pathname);

  if (!isLoggedIn && !isPublic && !isGuest) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoggedIn && isGuest) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (pathname === "/analytics" && request.auth?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ], //This is matching all routes  api, static files, icons, etc. ?
};
