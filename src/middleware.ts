import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/", "/search", "/about", "/business/(.*)"]);
const signinRoutes = createRouteMatcher(['/sign-in', '/sign-up', '/onboarding'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const {userId, sessionClaims} = await auth();
  if (userId && !sessionClaims?.metadata?.onboardingComplete  && !signinRoutes(request)) {
      const onboarding = new URL("/onboarding?redirect=" + encodeURIComponent(request.nextUrl.pathname + "?" + request.nextUrl.searchParams.toString()), request.url)
      return NextResponse.redirect(onboarding)
  }

  return NextResponse.next()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
