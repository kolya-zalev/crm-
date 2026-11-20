import { NextResponse, type NextRequest } from "next/server";

const guestRoutes = ["/login", "/signup"];
const publicRoutes = ["/login"];
const adminRoutes = ["/analytics", "/roles"];

type SessionResponse = { user: { id: string; role: string } } | null;

const getSession = async (request: NextRequest): Promise<SessionResponse> => {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;

  const response = await fetch(`${process.env.API_URL}/api/auth/get-session`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json();
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);
  const isLoggedIn = !!session;
  const isPublic = publicRoutes.includes(pathname);
  const isGuest = guestRoutes.includes(pathname);

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(isLoggedIn ? "/dashboard" : "/login", request.nextUrl),
    );
  }

  if (!isLoggedIn && !isPublic && !isGuest) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoggedIn && isGuest) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (adminRoutes.includes(pathname) && session?.user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
