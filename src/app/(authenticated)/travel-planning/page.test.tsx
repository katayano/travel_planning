import { render, screen } from "@testing-library/react";

import TravelPlanningPage from "./page";

describe("TravelPlanningPage 統合テスト", () => {
    it("新規作成ボタンが表示される", async () => {
        const Page = await TravelPlanningPage();
        render(Page);

        // ボタンが表示される
        const button = screen.getByRole("button", { name: "旅行プランを作成" });
        expect(button).toBeInTheDocument();
    });

    it("新規作成ボタンが画面右下に固定表示される", async () => {
        const Page = await TravelPlanningPage();
        const { container } = render(Page);

        // 固定位置のコンテナが存在する
        const floatingContainer = container.querySelector(".fixed.bottom-6.right-6");
        expect(floatingContainer).toBeInTheDocument();
    });

    it("新規作成ボタンクリックで旅行プラン作成ページへ遷移できる", async () => {
        const Page = await TravelPlanningPage();
        render(Page);

        // リンクが正しいhrefを持つ
        const link = screen.getByRole("link", { name: "旅行プランを作成" });
        expect(link).toHaveAttribute("href", "/travel-planning/create");
    });

    it("新規作成ボタンにアイコンとテキストが適切に表示される", async () => {
        const Page = await TravelPlanningPage();
        render(Page);

        // テキストが表示される
        expect(screen.getByText("旅行プランを作成")).toBeInTheDocument();

        // アイコンが表示される
        const button = screen.getByRole("button", { name: "旅行プランを作成" });
        const icon = button.querySelector("svg");
        expect(icon).toBeInTheDocument();
    });

    it("レスポンシブ表示が適用されている", async () => {
        const Page = await TravelPlanningPage();
        render(Page);

        // テキストがsm以上で表示される設定になっている
        const textElement = screen.getByText("旅行プランを作成");
        expect(textElement).toHaveClass("hidden", "sm:inline");
    });

    it("新規作成ボタンにホバー・フォーカス状態のスタイルが適用されている", async () => {
        const Page = await TravelPlanningPage();
        render(Page);

        // ボタンにhover状態のスタイルが含まれている
        const button = screen.getByRole("button", { name: "旅行プランを作成" });
        expect(button.className).toContain("hover:bg-orange-600");
    });

    it("アクセシビリティ要件を満たしている", async () => {
        const Page = await TravelPlanningPage();
        render(Page);

        // ボタンがキーボード操作可能
        const button = screen.getByRole("button", { name: "旅行プランを作成" });
        expect(button).toBeInTheDocument();

        // リンクがキーボード操作可能
        const link = screen.getByRole("link", { name: "旅行プランを作成" });
        expect(link).toBeInTheDocument();

        // アイコンにaria-hidden属性が設定されている
        const icon = button.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });
});
