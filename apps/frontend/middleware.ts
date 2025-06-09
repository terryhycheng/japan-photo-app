import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAction } from "./features/auth/data/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const decoded = await verifyAction();

  if (!decoded) {
    return NextResponse.redirect(
      new URL("/login?error=unauthorized", request.url),
    );
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
