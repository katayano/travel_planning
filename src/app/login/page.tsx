import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ログイン | 旅行計画アプリ",
    description: "ログインページ",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-sky-900 mb-2">旅行計画アプリ</h1>
                    <p className="text-sky-600">ログインしてご利用ください</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                        ログイン
                    </h2>

                    {/* ログインフォームコンポーネントは次のタスクで実装 */}
                    <div className="text-center text-gray-500">ログインフォームを実装中...</div>
                </div>

                <div className="text-center text-sm text-sky-600">© 2025 旅行計画アプリ</div>
            </div>
        </div>
    );
}
