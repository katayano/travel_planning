import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Header from "@/components/features/common/Header";
import { logout } from "@/lib/actions/logout";

// logoutアクションをモック
jest.mock("@/lib/actions/logout", () => ({
    logout: jest.fn(),
}));

// モック化されたlogout関数の型定義
const mockLogout = logout as jest.MockedFunction<any>;

describe("Header Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("基本的な表示", () => {
        it("デフォルトのサイト名が表示される", () => {
            render(<Header />);

            const siteNameLink = screen.getByRole("link", { name: "Travel Planning" });
            expect(siteNameLink).toBeInTheDocument();
        });

        it("カスタムサイト名が表示される", () => {
            const customSiteName = "My Travel App";
            render(<Header siteName={customSiteName} />);

            const siteNameLink = screen.getByRole("link", { name: customSiteName });
            expect(siteNameLink).toBeInTheDocument();
        });

        it("ログアウトボタンが表示される", () => {
            render(<Header />);

            const logoutButton = screen.getByRole("button", { name: "ログアウト" });
            expect(logoutButton).toBeInTheDocument();
        });
    });

    describe("サイト名のリンク機能", () => {
        it("サイト名クリック時に正しいURLにリダイレクトする", () => {
            render(<Header />);

            const siteNameLink = screen.getByRole("link", { name: "Travel Planning" });
            expect(siteNameLink).toHaveAttribute("href", "/travel-planning");
        });
    });

    describe("ログアウト機能", () => {
        it("ログアウトボタンクリック時にlogout関数が呼ばれる", async () => {
            mockLogout.mockResolvedValue(undefined);
            render(<Header />);

            const logoutButton = screen.getByRole("button", { name: "ログアウト" });
            fireEvent.click(logoutButton);

            await waitFor(() => {
                expect(mockLogout).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe("スタイリング", () => {
        it("適切なCSSクラスが適用されている", () => {
            render(<Header />);

            // ヘッダー要素の基本スタイル
            const header = screen.getByRole("banner");
            expect(header).toHaveClass("bg-orange-500", "shadow-md");

            // サイト名リンクのスタイル
            const siteNameLink = screen.getByRole("link", { name: "Travel Planning" });
            expect(siteNameLink).toHaveClass(
                "text-xl",
                "font-bold",
                "text-orange-50",
                "hover:text-orange-100",
                "transition-colors",
                "duration-200",
            );

            // ログアウトボタンのスタイル
            const logoutButton = screen.getByRole("button", { name: "ログアウト" });
            expect(logoutButton).toHaveClass(
                "bg-orange-600",
                "hover:bg-orange-700",
                "text-orange-50",
                "font-medium",
                "py-2",
                "px-4",
                "rounded-md",
                "transition-colors",
                "duration-200",
            );
        });
    });

    describe("アクセシビリティ", () => {
        it("ヘッダーがbannerロールを持っている", () => {
            render(<Header />);

            const header = screen.getByRole("banner");
            expect(header).toBeInTheDocument();
        });

        it("ログアウトボタンが適切なtype属性を持っている", () => {
            render(<Header />);

            const logoutButton = screen.getByRole("button", { name: "ログアウト" });
            expect(logoutButton).toHaveAttribute("type", "button");
        });

        it("フォーカス時の適切なスタイルが適用される", () => {
            render(<Header />);

            const logoutButton = screen.getByRole("button", { name: "ログアウト" });
            expect(logoutButton).toHaveClass(
                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-orange-300",
                "focus:ring-offset-2",
            );
        });
    });

    describe("レスポンシブデザイン", () => {
        it("レスポンシブクラスが適用されている", () => {
            render(<Header />);

            // コンテナのレスポンシブクラス
            const container = screen.getByRole("banner").querySelector("div");
            expect(container).toHaveClass("px-4", "sm:px-6", "lg:px-8");
        });
    });
});
