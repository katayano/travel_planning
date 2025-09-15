"use server";

import { signOut } from "@/auth";

/**
 * ログアウト処理を行うServer Action
 * NextAuth.jsのsignOut関数でセッションを削除し、ログインページにリダイレクト
 *
 * @returns ログアウト処理の実行
 */
export async function logout(): Promise<void> {
    // NextAuth.jsのsignOut関数でセッションを削除
    // redirectToオプションでログインページにリダイレクト
    await signOut({
        redirectTo: "/login",
    });
}
