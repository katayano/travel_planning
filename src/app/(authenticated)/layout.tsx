import Header from "@/components/features/common/Header";

/**
 * 認証済みユーザー用の共通レイアウト
 * ヘッダーとフッターを含む
 */
export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* ヘッダー */}
                <Header siteName="旅行計画アプリ" />

                {/* メインコンテンツ */}
                <main className="mt-6">
                    {children}
                </main>

                {/* フッター */}
                <footer className="mt-12 text-center text-sm text-gray-500">
                    © 2025 旅行計画アプリ - ログイン成功後のメインページ
                </footer>
            </div>
        </div>
    );
}