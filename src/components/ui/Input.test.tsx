import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Input from "./Input";

describe("Input", () => {
    it("基本的なレンダリングができる", () => {
        render(<Input placeholder="テスト入力" />);

        const input = screen.getByPlaceholderText("テスト入力");
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass("w-full", "rounded-lg");
    });

    it("ラベルが正しく表示される", () => {
        render(<Input label="ユーザー名" />);

        const label = screen.getByText("ユーザー名");
        const input = screen.getByRole("textbox");

        expect(label).toBeInTheDocument();
        expect(input).toHaveAttribute("id", "input-ユーザー名");
        expect(label).toHaveAttribute("for", "input-ユーザー名");
    });

    it("必須フィールドの表示が正しく動作する", () => {
        render(<Input label="パスワード" required />);

        const label = screen.getByText(/パスワード/);
        const required = screen.getByText("*");

        expect(label).toBeInTheDocument();
        expect(required).toBeInTheDocument();
        expect(required).toHaveClass("text-red-400");
    });

    it("無効化状態が正しく動作する", () => {
        render(<Input disabled placeholder="無効化されたフィールド" />);

        const input = screen.getByPlaceholderText("無効化されたフィールド");

        expect(input).toBeDisabled();
        expect(input).toHaveClass("disabled:bg-gray-100", "disabled:cursor-not-allowed");
    });

    it("ユーザー入力が正しく処理される", async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        render(<Input onChange={handleChange} placeholder="入力テスト" />);

        const input = screen.getByPlaceholderText("入力テスト");
        await user.type(input, "test input");

        expect(handleChange).toHaveBeenCalledTimes(10); // "test input"の文字数分
        expect(input).toHaveValue("test input");
    });

    it("カスタムクラス名が適用される", () => {
        render(<Input className="custom-class" data-testid="custom-input" />);

        const input = screen.getByTestId("custom-input");
        expect(input).toHaveClass("custom-class");
    });

    it("type属性が正しく設定される", () => {
        render(<Input type="password" data-testid="password-input" />);

        const input = screen.getByTestId("password-input");
        expect(input).toHaveAttribute("type", "password");
    });
});
