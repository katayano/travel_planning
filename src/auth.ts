import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { getUser } from "@/lib/user";

import { authConfig } from "./auth.config";

/**
 * NextAuth.js の設定
 * Credentials プロバイダーを使用してユーザー名・パスワード認証を実装
 */
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            /**
             * 認証情報を検証する関数
             * @param credentials フォームから送信された認証情報
             * @returns 認証成功時はユーザー情報、失敗時はnull
             */
            async authorize(credentials) {
                // 入力値のバリデーション
                const parsedCredentials = z
                    .object({ username: z.string().min(3).max(50), password: z.string().min(8).max(20) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const user = await getUser(username);
                    if (!user) return null;

                    // パスワードの検証
                    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
                    if (passwordsMatch) return user;
                }

                // 認証失敗
                return null;
            },
        }),
    ],
});