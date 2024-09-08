import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const token = localStorage.getItem("accessToken");
  const url = request.url;

  if (!token && url.includes("/protected")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}
