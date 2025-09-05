import React from "react";

import type { AlertProps } from "@/types/ui";

/**
 * アラートメッセージ表示コンポーネント
 * 
 * フォームバリデーションエラーや認証エラー、成功メッセージなどの
 * ユーザーフィードバックメッセージを表示するコンポーネント
 * 
 * @param message - 表示するメッセージ
 * @param show - メッセージを表示するかどうか（デフォルト: true）
 * @param type - メッセージのタイプ（デフォルト: "error"）
 * @param className - 追加のCSSクラス
 * @param ariaLive - スクリーンリーダー用のaria-live属性
 */
const Alert: React.FC<AlertProps> = ({
    message,
    show = true,
    type = "error",
    className = "",
    ariaLive = "polite",
}) => {
    // メッセージが空文字列またはshowがfalseの場合は何も表示しない
    if (!message || !show) return null;

    // タイプ別のスタイルクラス
    const typeStyles = {
        error: "bg-red-50 border-red-200 text-red-600",
        success: "bg-green-50 border-green-200 text-green-600",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-600",
        info: "bg-blue-50 border-blue-200 text-blue-600",
    };

    // アイコン
    const typeIcons = {
        error: "⚠️",
        success: "✅",
        warning: "⚡",
        info: "ℹ️",
    };

    return (
        <div
            className={`
                p-3 rounded-lg border transition-all duration-200
                ${typeStyles[type]}
                ${className}
            `.trim()}
            role={type === "error" ? "alert" : "status"}
            aria-live={ariaLive}
        >
            <div className="flex items-start">
                {/* アイコン表示領域 */}
                <span className="mr-2 text-sm" aria-hidden="true">
                    {typeIcons[type]}
                </span>

                {/* メッセージテキスト */}
                <p className="text-sm font-medium flex-1">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Alert;
