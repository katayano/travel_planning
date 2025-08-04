import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';
import { User } from '@/types/user';

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
        console.error('Failed to fetch user:', error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ username: z.string(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { username, password } = parsedCredentials.data;
                const user = await getUser(username);
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
                if (passwordsMatch) return user;
            }

            return null;
        }
    })],
});