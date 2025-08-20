/**
 * ユーザー情報関連の型定義
 */

/**
 * データベースに保存されるユーザー情報（完全版）
 */
export interface User {
    /** ユーザーの一意識別子 */
    id: string;
    /** ログインに使用するユーザー名 */
    username: string;
    /** bcryptでハッシュ化されたパスワード */
    passwordHash: string;
    /** ユーザー作成日時 */
    createdAt: Date;
    /** ユーザー情報最終更新日時 */
    updatedAt: Date;
}
