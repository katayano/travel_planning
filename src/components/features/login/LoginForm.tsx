"use client";

import React, { useState, useCallback } from "react";

import type { LoginFormData } from "@/types/auth";

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
    loading?: boolean;
    error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false, error }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof LoginFormData;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                await onSubmit(formData);
            } catch (err) {
                // エラーハンドリングは親コンポーネントで行う
                console.error("Login form submission error:", err);
            }
        },
        [formData, onSubmit],
    );

    return (
        <div className="w-full max-w-md mx-auto font-['Noto_Sans_JP']">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ユーザー名入力フィールド */}
                <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-orange-50">
                        ユーザー名
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-colors duration-200 
              bg-white text-gray-900 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              hover:border-orange-300
              sm:px-3 sm:py-2 sm:text-sm"
                        placeholder="ユーザー名を入力してください"
                        autoComplete="username"
                        required
                    />
                </div>

                {/* パスワード入力フィールド */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-orange-50">
                        パスワード
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-colors duration-200 
              bg-white text-gray-900 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              hover:border-orange-300
              sm:px-3 sm:py-2 sm:text-sm"
                        placeholder="パスワードを入力してください"
                        autoComplete="current-password"
                        required
                    />
                </div>

                {/* API エラーメッセージ */}
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200" role="alert">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* ログインボタン */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
            sm:py-2 sm:px-3 sm:text-sm
            ${loading
                            ? "bg-gray-400 cursor-not-allowed text-gray-200"
                            : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-orange-50 shadow-lg hover:shadow-xl"
                        }`}
                    aria-disabled={loading}
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
                            <span>ログイン中...</span>
                        </span>
                    ) : (
                        "ログイン"
                    )}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
