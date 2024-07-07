import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   //return NextResponse.redirect(new URL('/home', request.url))
//   console.log("MIddleware triggeredDDDDDDDDDDDDDDddddddddddddddddddddd");
// }

console.log("MIDDLEWAREEEEEEEE TRIGGEREDDD");

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/api/:path*",
]);

export default clerkMiddleware(
  (auth, request) => {
    console.log("Middleware executed for request:", request.url);
    if (!isPublicRoute(request)) {
      auth().protect();
    }
  },
  { debug: true }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
