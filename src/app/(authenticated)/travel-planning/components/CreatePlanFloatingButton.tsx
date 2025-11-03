import Link from "next/link";
import React from "react";

import Button from "@/components/ui/Button";

import PlusIcon from "./PlusIcon";

/**
 * 旅行プラン作成用フローティングボタンコンポーネント
 * 画面右下に固定表示され、旅行プラン作成ページへ遷移する
 *
 * レスポンシブ対応:
 * - モバイル: プラスアイコンのみ表示
 * - デスクトップ: プラスアイコン + テキスト表示
 */
const CreatePlanFloatingButton: React.FC = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Link href="/travel-plan/create">
                <Button variant="primary" size="medium">
                    <div className="flex items-center space-x-2">
                        <PlusIcon size={20} />
                        <span className="hidden sm:inline">旅行プランを作成</span>
                    </div>
                </Button>
            </Link>
        </div>
    );
};

export default CreatePlanFloatingButton;
