import React from "react";

import type { InputProps } from "@/types/ui";

const Input: React.FC<InputProps> = ({
    label,
    className = "",
    id,
    disabled,
    required,
    ...props
}) => {
    const inputClasses = `
            w-full px-4 py-3 rounded-lg border border-gray-300 transition-colors duration-200
            bg-white text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            hover:border-orange-300
            sm:px-3 sm:py-2 sm:text-sm
            ${className}
        `
        .trim()
        .replace(/\s+/g, " ");

    // IDの生成（labelとの関連付けのため）
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
        <div className="space-y-2">
            {/* ラベル */}
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium">
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}

            {/* 入力フィールド */}
            <input
                {...props}
                id={inputId}
                disabled={disabled}
                required={required}
                className={inputClasses}
            />
        </div>
    );
};

export default Input;
