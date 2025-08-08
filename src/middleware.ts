import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * Next.js Middleware として NextAuth の認証機能を設定
 * リクエストを受け取ると認証状態をチェックし、適切なリダイレクトを行う
 */
export default NextAuth(authConfig).auth;

/**
 * Middleware が適用されるパスを設定
 * 静的ファイルやAPIルート、Next.js内部ファイルは除外
 */
export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};