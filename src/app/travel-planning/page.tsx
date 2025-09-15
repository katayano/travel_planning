import Header from "@/components/features/common/Header";
/**
 * 旅行計画メインページ
 * 認証が必要なページ（middleware.tsで保護）
 */
export default async function TravelPlanningPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* ヘッダー */}
                <Header siteName="旅行計画アプリ" />

                {/* メインコンテンツ */}
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 新しい旅行計画作成 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            新しい旅行計画
                        </h2>
                        <p className="text-gray-600 mb-4">
                            新しい旅行の計画を作成しましょう
                        </p>
                        <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                            計画を作成
                        </button>
                    </div>

                    {/* 過去の旅行計画 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            過去の旅行計画
                        </h2>
                        <p className="text-gray-600 mb-4">
                            これまでの旅行計画を確認できます
                        </p>
                        <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                            計画を見る
                        </button>
                    </div>

                    {/* 設定 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            設定
                        </h2>
                        <p className="text-gray-600 mb-4">
                            アカウント設定や通知設定を変更できます
                        </p>
                        <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                            設定を開く
                        </button>
                    </div>
                </main>

                {/* フッター */}
                <footer className="mt-12 text-center text-sm text-gray-500">
                    © 2025 旅行計画アプリ - ログイン成功後のメインページ
                </footer>
            </div>
        </div>
    );
}
