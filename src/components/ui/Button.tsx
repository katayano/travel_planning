import React from "react";
import type { ButtonProps } from "@/types/ui";

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "medium",
    loading = false,
    disabled = false,
    className = "",
    children,
    ...props
}) => {
    // バリアントスタイル
    const variantStyles = {
        primary: loading
            ? "bg-gray-400 cursor-not-allowed text-gray-200"
            : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-orange-50 shadow-lg hover:shadow-xl",
        secondary:
            "bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-50 active:bg-orange-100",
        danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-lg hover:shadow-xl",
    };

    // サイズスタイル
    const sizeStyles = {
        small: "py-1 px-2 text-xs sm:py-1 sm:px-2",
        medium: "py-3 px-4 text-base sm:py-2 sm:px-3 sm:text-sm",
        large: "py-4 px-6 text-lg sm:py-3 sm:px-5 sm:text-base",
    };

    // 共通スタイル
    const baseStyles =
        "font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2";

    // 最終的なクラス名
    const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    // ローディング中または無効化されている場合の処理
    const isDisabled = loading || disabled;

    return (
        <button
            className={finalClassName}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center space-x-2">
                    <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>{children}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
