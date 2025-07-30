import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Button from "./Button";

describe("Button", () => {
    it("基本的なレンダリングができる", () => {
        render(<Button>テストボタン</Button>);
        expect(screen.getByRole("button", { name: "テストボタン" })).toBeInTheDocument();
    });

    it("variantプロパティが正しく適用される", () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        const button = screen.getByRole("button");

        // Primary variant
        expect(button).toHaveClass("bg-orange-500");

        // Secondary variant
        rerender(<Button variant="secondary">Secondary</Button>);
        expect(button).toHaveClass("border-orange-500");

        // Danger variant
        rerender(<Button variant="danger">Danger</Button>);
        expect(button).toHaveClass("bg-red-500");
    });

    it("sizeプロパティが正しく適用される", () => {
        const { rerender } = render(<Button size="small">Small</Button>);
        const button = screen.getByRole("button");

        // Small size
        expect(button).toHaveClass("py-1", "px-2", "text-xs");

        // Medium size (default)
        rerender(<Button size="medium">Medium</Button>);
        expect(button).toHaveClass("py-3", "px-4", "text-base");

        // Large size
        rerender(<Button size="large">Large</Button>);
        expect(button).toHaveClass("py-4", "px-6", "text-lg");
    });

    it("loading状態でスピナーが表示される", () => {
        render(<Button loading>ローディングボタン</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        expect(button).toHaveClass("bg-gray-400", "cursor-not-allowed");

        // スピナーSVGが存在することを確認
        expect(screen.getByRole("button")).toContainHTML('class="animate-spin h-5 w-5"');
        expect(screen.getByText("ローディングボタン")).toBeInTheDocument();
    });

    it("disabled状態が正しく動作する", () => {
        render(<Button disabled>無効化ボタン</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("クリックイベントが正しく発火する", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();

        render(<Button onClick={handleClick}>クリック可能</Button>);

        const button = screen.getByRole("button");
        await user.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("loading中はクリックイベントが発火しない", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();

        render(
            <Button loading onClick={handleClick}>
                ローディング中
            </Button>,
        );

        const button = screen.getByRole("button");
        await user.click(button);

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("disabled中はクリックイベントが発火しない", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();

        render(
            <Button disabled onClick={handleClick}>
                無効化中
            </Button>,
        );

        const button = screen.getByRole("button");
        await user.click(button);

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("カスタムclassNameが適用される", () => {
        render(<Button className="custom-class">カスタムクラス</Button>);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("custom-class");
    });

    it("その他のHTML属性が適用される", () => {
        render(
            <Button type="submit" data-testid="submit-button" aria-label="送信">
                送信
            </Button>,
        );

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "submit");
        expect(button).toHaveAttribute("data-testid", "submit-button");
        expect(button).toHaveAttribute("aria-label", "送信");
    });
});
