// ユーザーの型定義
export interface User {
    id: string;
    username: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
