import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { User } from "@/types/user";

/**
 * データベースからユーザー情報を取得する関数
 * @param username ユーザー名
 * @returns ユーザー情報またはnull
 */
async function getUser(username: string): Promise<User | null> {
    try {
        const dbUser = await prisma.user.findUnique({
            where: { username },
        });
        if (!dbUser) return null;

        // Prismaのuser型からUser型へ変換
        const user: User = {
            id: dbUser.id,
            username: dbUser.username,
            passwordHash: dbUser.password,
            createdAt: dbUser.createdAt,
            updatedAt: dbUser.updatedAt,
        };
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

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
                    .object({ username: z.string(), password: z.string().min(6) })
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