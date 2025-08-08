import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";

import Alert from "@/components/ui/Alert";

describe("Alert", () => {
    it("エラーメッセージが正常に表示される", () => {
        render(<Alert message="テストエラーメッセージ" />);

        expect(screen.getByText("テストエラーメッセージ")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("show=falseの場合は表示されない", () => {
        render(<Alert message="テストメッセージ" show={false} />);

        expect(screen.queryByText("テストメッセージ")).not.toBeInTheDocument();
    });

    it("空のメッセージの場合は表示されない", () => {
        render(<Alert message="" />);

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("成功メッセージが正しいスタイルで表示される", () => {
        render(<Alert message="成功メッセージ" type="success" />);

        const alertElement = screen.getByRole("status");
        expect(alertElement).toHaveClass("bg-green-50", "border-green-200", "text-green-600");
        expect(screen.getByText("✅")).toBeInTheDocument();
    });

    it("警告メッセージが正しいスタイルで表示される", () => {
        render(<Alert message="警告メッセージ" type="warning" />);

        const alertElement = screen.getByRole("status");
        expect(alertElement).toHaveClass("bg-yellow-50", "border-yellow-200", "text-yellow-600");
        expect(screen.getByText("⚡")).toBeInTheDocument();
    });

    it("情報メッセージが正しいスタイルで表示される", () => {
        render(<Alert message="情報メッセージ" type="info" />);

        const alertElement = screen.getByRole("status");
        expect(alertElement).toHaveClass("bg-blue-50", "border-blue-200", "text-blue-600");
        expect(screen.getByText("ℹ️")).toBeInTheDocument();
    });

    it("エラーメッセージが正しいスタイルで表示される（デフォルト）", () => {
        render(<Alert message="エラーメッセージ" />);

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveClass("bg-red-50", "border-red-200", "text-red-600");
        expect(screen.getByText("⚠️")).toBeInTheDocument();
    });

    it("カスタムクラス名が適用される", () => {
        render(<Alert message="テストメッセージ" className="custom-class" />);

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveClass("custom-class");
    });

    it("適切なアクセシビリティ属性が設定される", () => {
        render(<Alert message="テストメッセージ" ariaLive="assertive" />);

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveAttribute("aria-live", "assertive");
    });

    it("アイコンが適切にaria-hiddenに設定される", () => {
        render(<Alert message="テストメッセージ" />);

        const iconElement = screen.getByText("⚠️");
        expect(iconElement).toHaveAttribute("aria-hidden", "true");
    });
});
