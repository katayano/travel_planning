import React from "react";

/**
 * PlusIconコンポーネントのProps
 */
interface PlusIconProps {
    /** アイコンのサイズ（px） */
    size?: number;
}

/**
 * プラスアイコンコンポーネント
 * CreatePlanFloatingButton専用のSVGアイコン
 *
 * @param size - アイコンのサイズ（デフォルト: 24px）
 */
const PlusIcon: React.FC<PlusIconProps> = ({ size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PlusIcon;
