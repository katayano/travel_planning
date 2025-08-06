/**
 * ユーザー情報の型定義
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
