import type { NextAuthConfig } from "next-auth";

/**
 * NextAuth.js の基本設定
 * middleware.ts と auth.ts で共有される設定を定義
 */
export const authConfig = {
    // カスタムページの設定
    pages: {
        // ログインページのパス
        signIn: "/login",
    },
    callbacks: {
        /**
         * 認可コールバック
         * ページアクセス時の認証状態をチェックし、適切なリダイレクトを行う
         */
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnTravelPlanningPage = nextUrl.pathname.startsWith("/travel-planning");

            if (isOnTravelPlanningPage) {
                // 旅行計画ページにアクセスするには認証が必要
                if (isLoggedIn) return true;
                // 未認証ユーザーはログインページにリダイレクト
                return false;
            } else if (isLoggedIn) {
                // 認証済みユーザーは旅行計画ページにリダイレクト
                return Response.redirect(new URL("/travel-planning", nextUrl));
            }
            // その他のページは自由にアクセス可能
            return true;
        },
    },
    // プロバイダーは auth.ts で設定
    providers: [],
} satisfies NextAuthConfig;