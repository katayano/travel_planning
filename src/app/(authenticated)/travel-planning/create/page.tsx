import Link from "next/link";

const backLinkClasses =
    "inline-flex items-center gap-2 self-start rounded-lg border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition-colors hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2";
const inputBaseClasses =
    "mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400";

export default function TravelPlanCreatePage() {
    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">旅行プランを作成</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        旅行プランの基本情報を入力し、詳細設定は今後のタスクで追加します。
                    </p>
                </div>
                <Link href="/travel-planning" className={backLinkClasses}>
                    <span aria-hidden="true">←</span>
                    <span>旅行プラン一覧に戻る</span>
                </Link>
            </header>

            <form
                className="space-y-6 rounded-2xl bg-white p-6 shadow-lg"
                aria-labelledby="travel-plan-form-title"
            >
                <div>
                    <h2 id="travel-plan-form-title" className="text-lg font-semibold text-gray-900">
                        プラン情報
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        各入力欄はプレースホルダーです。実際の保存処理は別Issueで対応します。
                    </p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="plan-title">
                        旅行プランのタイトル
                    </label>
                    <input
                        id="plan-title"
                        name="planTitle"
                        type="text"
                        placeholder="例：春の京都旅行"
                        className={inputBaseClasses}
                        disabled
                        aria-disabled="true"
                    />
                    <p className="mt-1 text-xs text-gray-500">※ 入力欄は現在無効化されています。</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="plan-description">
                        旅行プランの説明
                    </label>
                    <textarea
                        id="plan-description"
                        name="planDescription"
                        placeholder="旅行プランの概要や目的を記入します"
                        rows={4}
                        className={`${inputBaseClasses} resize-none`}
                        disabled
                        aria-disabled="true"
                    />
                </div>

                <div>
                    <span className="text-sm font-medium text-gray-700">開始日</span>
                    <div className="mt-2 space-y-2 rounded-lg border border-dashed border-orange-300 bg-orange-50 p-4 text-sm text-orange-700">
                        <p>カレンダーコンポーネントは別タスクで実装予定です。</p>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-orange-400 px-3 py-2 font-medium text-orange-500 transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-70"
                            disabled
                            aria-disabled="true"
                        >
                            カレンダーを開く（準備中）
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full rounded-lg bg-gray-200 px-4 py-3 text-base font-semibold text-gray-500 transition-colors disabled:cursor-not-allowed disabled:opacity-80"
                    disabled
                    aria-disabled="true"
                >
                    プランを作成（準備中）
                </button>
            </form>

            <section className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6">
                <h2 className="text-lg font-semibold text-gray-900">選択した日のスケジュール</h2>
                <p className="mt-2 text-sm text-gray-600">
                    スケジュール一覧は今後のタスクで実装されます。ここに選択した開始日に紐づくスケジュールを表示する予定です。
                </p>
            </section>
        </div>
    );
}
