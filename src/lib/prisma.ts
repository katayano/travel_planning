import { PrismaClient } from "@/generated/prisma";

/**
 * PrismaClientのシングルトンインスタンス
 *
 * 開発環境でのホットリロード時にPrismaClientの複数インスタンス作成を防ぐため、
 * シングルトンパターンを使用してクライアントを管理する
 *
 * このファイルをインポートすることで、アプリケーション全体で
 * 同一のPrismaClientインスタンスが使用される
 */
const prisma = new PrismaClient();

export default prisma;
