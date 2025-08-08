import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import LoginForm from "@/components/features/login/LoginForm";

// Next.js のuseSearchParamsをモック
jest.mock("next/navigation", () => ({
    useSearchParams: () => ({
        get: (key: string) => {
            if (key === "callbackUrl") return "/travel-planning";
            return null;
        },
    }),
}));

// Server Actionをモック
jest.mock("@/lib/actions/login", () => ({
    authenticate: jest.fn(),
}));

describe("LoginForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("正常にレンダリングされる", () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/ユーザー名/)).toBeInTheDocument();
        expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
    });

    it("ユーザー名とパスワードを入力できる", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        await user.type(usernameInput, "testuser");
        await user.type(passwordInput, "password123");

        expect(usernameInput).toHaveValue("testuser");
        expect(passwordInput).toHaveValue("password123");
    });

    it("フォーム送信時にformActionが設定されている", () => {
        render(<LoginForm />);

        const form = document.querySelector("form");
        expect(form).toBeInTheDocument();
        // フォームアクションが設定されていることを確認
        expect(form).toHaveAttribute("action");
    });

    it("ローディング状態でボタンが正しく表示される", () => {
        render(<LoginForm loading={true} />);

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeDisabled();
        // ローディング中のテキストまたは通常のテキストが表示されることを確認
        expect(submitButton.textContent).toMatch(/ログイン中.../);
    });

    it("ローディング状態で入力フィールドが無効になる", () => {
        render(<LoginForm loading={true} />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        expect(usernameInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
    });

    // TODO: エラーメッセージのテストは useActionState のモックが必要なため後で作成

    it("必須属性が設定されている", () => {
        render(<LoginForm />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        expect(usernameInput).toBeRequired();
        expect(passwordInput).toBeRequired();
    });

    it("適切なautoComplete属性が設定されている", () => {
        render(<LoginForm />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        expect(usernameInput).toHaveAttribute("autocomplete", "username");
        expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
    });

    it("パスワードフィールドがマスクされている", () => {
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText(/パスワード/);
        expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("callbackUrl の hidden input が設定されている", () => {
        render(<LoginForm />);

        const hiddenInput = document.querySelector('input[name="redirectTo"]');
        expect(hiddenInput).toBeInTheDocument();
        expect(hiddenInput).toHaveAttribute("value", "/travel-planning");
    });
});
