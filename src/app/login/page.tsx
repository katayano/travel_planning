import { Metadata } from "next";

import LoginForm from "@/components/features/login/LoginForm";

export const metadata: Metadata = {
    title: "ログイン | 旅行計画アプリ",
    description: "ログインページ",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-orange-50 mb-2">旅行計画アプリ</h1>
                    <p className="text-orange-50">ログインしてご利用ください</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                        ログイン
                    </h2>

                    <LoginForm />
                </div>

                <div className="text-center text-sm text-orange-50">© 2025 旅行計画アプリ</div>
            </div>
        </div>
    );
}
