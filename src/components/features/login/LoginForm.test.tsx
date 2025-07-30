import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import LoginForm from "@/components/features/login/LoginForm";

describe("LoginForm", () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it("正常にレンダリングされる", () => {
        render(<LoginForm onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText(/ユーザー名/)).toBeInTheDocument();
        expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
    });

    it("ユーザー名とパスワードを入力できる", async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={mockOnSubmit} />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        await user.type(usernameInput, "testuser");
        await user.type(passwordInput, "password123");

        expect(usernameInput).toHaveValue("testuser");
        expect(passwordInput).toHaveValue("password123");
    });

    it("フォーム送信時にonSubmitが正しいデータで呼び出される", async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={mockOnSubmit} />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);
        const submitButton = screen.getByRole("button", { name: "ログイン" });

        await user.type(usernameInput, "testuser");
        await user.type(passwordInput, "password123");
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                username: "testuser",
                password: "password123",
            });
        });
    });

    it("ローディング状態でボタンが無効になる", () => {
        render(<LoginForm onSubmit={mockOnSubmit} loading={true} />);

        const submitButton = screen.getByRole("button", { name: "ログイン中..." });
        expect(submitButton).toBeDisabled();
        expect(screen.getByText("ログイン中...")).toBeInTheDocument();
    });

    it("ローディング状態で入力フィールドが無効になる", () => {
        render(<LoginForm onSubmit={mockOnSubmit} loading={true} />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        expect(usernameInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
    });

    it("エラーメッセージが表示される", () => {
        const errorMessage = "ログインに失敗しました";
        render(<LoginForm onSubmit={mockOnSubmit} error={errorMessage} />);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("必須属性が設定されている", () => {
        render(<LoginForm onSubmit={mockOnSubmit} />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        expect(usernameInput).toBeRequired();
        expect(passwordInput).toBeRequired();
    });

    it("適切なautoComplete属性が設定されている", () => {
        render(<LoginForm onSubmit={mockOnSubmit} />);

        const usernameInput = screen.getByLabelText(/ユーザー名/);
        const passwordInput = screen.getByLabelText(/パスワード/);

        expect(usernameInput).toHaveAttribute("autocomplete", "username");
        expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
    });

    it("パスワードフィールドがマスクされている", () => {
        render(<LoginForm onSubmit={mockOnSubmit} />);

        const passwordInput = screen.getByLabelText(/パスワード/);
        expect(passwordInput).toHaveAttribute("type", "password");
    });
});
