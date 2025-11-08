import { render, screen } from "@testing-library/react";
import React from "react";

import CreatePlanFloatingButton from "./CreatePlanFloatingButton";

describe("CreatePlanFloatingButton", () => {
    it("基本的なレンダリングができる", () => {
        render(<CreatePlanFloatingButton />);

        // ボタンが表示される
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("正しいリンク遷移先が設定されている", () => {
        render(<CreatePlanFloatingButton />);

        // リンクが/travel-planning/createを指している
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/travel-planning/create");
    });

    it("プラスアイコンが表示される", () => {
        render(<CreatePlanFloatingButton />);

        // SVGアイコンが表示される
        const icon = screen.getByRole("button").querySelector("svg");
        expect(icon).toBeInTheDocument();
    });

    it("テキストが表示される", () => {
        render(<CreatePlanFloatingButton />);

        // テキストが表示される
        expect(screen.getByText("旅行プランを作成")).toBeInTheDocument();
    });

    it("レスポンシブ表示が適用されている（テキストがsm以上で表示）", () => {
        render(<CreatePlanFloatingButton />);

        // テキストにhidden sm:inlineクラスが適用されている
        const textElement = screen.getByText("旅行プランを作成");
        expect(textElement).toHaveClass("hidden", "sm:inline");
    });

    it("既存Buttonコンポーネントのvariant=primaryが適用されている", () => {
        render(<CreatePlanFloatingButton />);

        // ボタンにprimaryのスタイルが適用されている
        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-orange-500");
    });

    it("既存Buttonコンポーネントのsize=mediumが適用されている", () => {
        render(<CreatePlanFloatingButton />);

        // ボタンにmediumサイズのスタイルが適用されている
        const button = screen.getByRole("button");
        expect(button).toHaveClass("py-3", "px-4", "text-base");
    });

    it("画面右下に固定配置されている", () => {
        render(<CreatePlanFloatingButton />);

        // コンテナにfixed、bottom-6、right-6、z-50クラスが適用されている
        const container = screen.getByRole("link").parentElement;
        expect(container).toHaveClass("fixed", "bottom-6", "right-6", "z-50");
    });

    it("アクセシビリティ属性が適切に設定されている", () => {
        render(<CreatePlanFloatingButton />);

        // ボタンがアクセス可能
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();

        // リンクがアクセス可能
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();

        // SVGにaria-hidden属性が設定されている
        const icon = button.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });
});
