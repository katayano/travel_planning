import prisma from "@/lib/prisma";
import { User } from "@/types/user";

/**
 * データベースからユーザー情報を取得する関数
 * @param username ユーザー名
 * @returns ユーザー情報またはnull
 */
export async function getUser(username: string): Promise<User | null> {
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
