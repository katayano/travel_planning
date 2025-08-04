import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnTravelPlanningPage = nextUrl.pathname.startsWith("/travel-planning");

            if (isOnTravelPlanningPage) {
                if (isLoggedIn) return true;
                return false;   // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/travel-planning", nextUrl));
            }
            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;