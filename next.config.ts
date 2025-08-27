import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // すべてのルートにセキュリティヘッダーを適用
        source: "/(.*)",
        headers: [
          // Content Security Policy - XSS攻撃を防ぐ
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'", // Next.jsの開発時に必要
              "style-src 'self' 'unsafe-inline'", // Tailwind CSSに必要
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'", // クリックジャッキング対策
            ].join("; "),
          },
          // X-Frame-Options - クリックジャッキング攻撃を防ぐ
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // X-Content-Type-Options - MIMEタイプスニッフィング攻撃を防ぐ
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer-Policy - リファラー情報の漏洩を防ぐ
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions-Policy - 不要なブラウザ機能を無効化
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
            ].join(", "),
          },
          // X-DNS-Prefetch-Control - DNS prefetchingを制御
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Strict-Transport-Security - HTTPS強制（本番環境でのみ有効）
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
