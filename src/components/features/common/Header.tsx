'use client';

import React from 'react';
import Link from 'next/link';
import { logout } from '@/lib/actions/logout';

interface HeaderProps {
    /** サイト名 */
    siteName?: string;
}

/**
 * ログイン後の画面で表示されるヘッダーコンポーネント
 */
const Header: React.FC<HeaderProps> = ({
    siteName = 'Travel Planning'
}) => {
    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="bg-orange-500 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* サイト名 */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/travel-planning"
                            className="text-xl font-bold text-orange-50 hover:text-orange-100 transition-colors duration-200"
                        >
                            {siteName}
                        </Link>
                    </div>

                    {/* ナビゲーション領域 */}
                    {/* 将来的に追加のナビゲーション項目がある場合に使用 */}
                    {/* <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                        </div>
                    </nav> */}

                    {/* ログアウトボタン */}
                    <div className="flex items-center">
                        <button
                            onClick={handleLogout}
                            className="bg-orange-600 hover:bg-orange-700 text-orange-50 font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                            type="button"
                        >
                            ログアウト
                        </button>
                    </div>

                    {/* モバイルメニューボタン（将来的な拡張用） */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="bg-orange-600 hover:bg-orange-700 text-orange-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                            aria-expanded="false"
                        >
                            <span className="sr-only">メニューを開く</span>
                            {/* ハンバーガーメニューアイコン */}
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
