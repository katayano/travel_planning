"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

/**
 * ログイン認証を行うServer Action
 * フォームデータを受け取り、NextAuth.jsのsignIn関数でCredentials認証を実行
 *
 * @param prevState 前回の状態（エラーメッセージなど）
 * @param formData フォームから送信されたデータ
 * @returns 認証失敗時はエラーメッセージ、成功時は自動リダイレクト
 */
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
): Promise<string | undefined> {
    try {
        // NextAuth.jsのsignIn関数でCredentials認証を実行
        // バリデーションはauth.tsのzodスキーマで実行される
        await signIn("credentials", formData);
    } catch (error) {
        // NextAuth.jsの認証エラーをハンドリング
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "ユーザー名かパスワードが誤っています。";
                default:
                    return "予期しないエラーが発生しました。";
            }
        }
        throw error;
    }
}
