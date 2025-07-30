"use client";

import React, { useState, useCallback } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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
                <Input
                    id="username"
                    name="username"
                    type="text"
                    label="ユーザー名"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="ユーザー名を入力してください"
                    autoComplete="username"
                    required
                />

                {/* パスワード入力フィールド */}
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="パスワード"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="パスワードを入力してください"
                    autoComplete="current-password"
                    required
                />

                {/* API エラーメッセージ */}
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200" role="alert">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* ログインボタン */}
                <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    className="w-full"
                    variant="primary"
                    size="medium"
                >
                    {loading ? "ログイン中..." : "ログイン"}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
