"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useCallback, useActionState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authenticate } from "@/lib/actions/login";

import type { LoginFormData } from "@/types/auth";


interface LoginFormProps {
    loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ loading = false }) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/travel-planning";
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
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

    return (
        <div className="w-full max-w-md mx-auto font-['Noto_Sans_JP']">
            <form action={formAction} className="space-y-6">
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
                {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200" role="alert">
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                )}

                {/* ログインボタン */}
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    className="w-full"
                    variant="primary"
                    size="medium"
                    aria-disabled={isPending}
                >
                    {loading ? "ログイン中..." : "ログイン"}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
