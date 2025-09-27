# Copilot Instructions

## ツール
- パッケージ管理はpnpmを使用

## コーディング規約

### 基本原則
- 関数コンポーネントを使用（クラスコンポーネント禁止）
- TypeScriptを厳密に使用（any型は避ける）
- Tailwind CSSでスタイリング
- エラーハンドリングを必ず含める
- 可読性とメンテナンス性を重視

### React/Next.js 規約
- Server ComponentsとClient Componentsを適切に使い分ける
- `use client`ディレクティブは必要最小限に留める
- カスタムHooksは`use`プレフィックスを付ける
- コンポーネントはデフォルトエクスポートを使用
- Propsの型定義は必須（interfaceまたはtype）

### パフォーマンス
- 動的インポート（lazy loading）を積極的に使用
- Image最適化のため`next/image`を必ず使用
- 重い処理はuseMemoやuseCallbackで最適化
- 不要な再レンダリングを避ける

### セキュリティ
- 環境変数は適切にプレフィックスを使用（NEXT_PUBLIC_）
- XSS対策としてdangerouslySetInnerHTMLは避ける
- APIルートでは適切な認証・認可を実装

## ファイル命名規則

### ディレクトリ構造
```
src/
├── app/              # App Router（Next.js 13+）
├── components/       # 再利用可能コンポーネント
│   ├── ui/          # 基本UIコンポーネント
│   └── features/    # 機能固有コンポーネント
├── lib/             # ユーティリティ・設定
├── hooks/           # カスタムHooks
├── types/           # TypeScript型定義
└── utils/           # ヘルパー関数
```

### 命名規約
- **コンポーネント名**: PascalCase（例：`UserProfileコンポーネント`）
- **ページファイル**: kebab-case（例：`user-profile/page.tsx`）
- **ユーティリティファイル**: camelCase（例：`formatDate.ts`）

## TypeScript規約

### 型定義
- interface vs type：Propsはinterface、Unionはtype
- 必須プロパティを先に、オプションを後に記述
- Generic型は意味のある名前を使用（T, K ではなく TUser, TResponse）

### インポート順序
1. React関連
2. Next.js関連
3. 外部ライブラリ
4. 内部ライブラリ
5. 相対インポート

例：
```typescript
import React from 'react';
import { NextPage } from 'next';
import { Button } from '@/components/ui/Button';
import { formatDate } from '../utils/formatDate';
```

## スタイリング規約

### Tailwind CSS
- ユーティリティクラスを優先
- カスタムCSSは最小限に
- レスポンシブデザインはモバイルファースト
- ダークモード対応は`dark:`プレフィックス使用

### コンポーネント設計
- Single Responsibility Principle（単一責任の原則）
- Props drilling を避け、Context APIやZustandを使用
- 共通UIコンポーネントは`src/components/ui/`に配置

## エラーハンドリング

### 必須実装
- try-catch文での例外処理
- Loading状態の表示
- Error Boundaryの実装
- APIエラーの適切なハンドリング

## テスト規約

### 必須テスト
- コンポーネントの単体テスト
- カスタムHooksのテスト
- APIルートのテスト

### テストファイル命名
- `ComponentName.test.tsx`
- `utils.test.ts`
- `__tests__`ディレクトリも可

## Git規約
- ブランチは必ずmasterブランチから作成してから作業を開始すること
- [コーディング](#コーディング)の作業前にブランチを切り、そのブランチで作業を行うこと
- [作業の完了](#作業の完了)で作業内容が正しいか確認したらコミットをすること

### ブランチ命名
- feature/機能名
- fix/修正内容
- docs/ドキュメント更新

### コミットメッセージ
- `feat: ～機能追加`（例：`feat: ユーザープロフィールページの追加`）
- `fix: ～バグ修正`（例：`fix: ユーザープロフィールページのバグ修正`）
- `docs: ～ドキュメント更新`（例：`docs: API仕様書の更新`）
- コミットメッセージは簡潔に書くこと

## 開発の進め方
1. 詳細要件の読み込み
2. タスク分割
3. コーディング
4. 静的解析、フォーマット、テスト

### 詳細要件の読み込み
- "docs/requirements/requirements.md"に記載の詳細要件の中から、プロンプトで指定された詳細要件の内容を読み込む
- 要件に基づいて実装方針を確認。疑問点がある場合はタスク分割を始める前に確認すること

### タスク分割
- 各機能をできるだけ小さなタスクに分割
- タスクの内容を次の通り書き出す
  - docs/requirementsフォルダ配下にmdファイルを作成（ファイル名はおまかせ）
  - mdファイルの中に分割したタスクの内容を記載。markdown形式で記載することとする
- タスク分割が完了したところで、コーディングを行う前に分割内容が問題ないか確認すること
- 確認が取れたら、GitHubのIssueにタスク分割した内容を記載すること
- Issueにenhancementラベルを付けること

### コーディング
- タスクをGithubのIssueに記載した内容に従って、コーディングを行う
- enhancementラベルが付いたIssueを優先すること
- タスクごとにブランチを切る
- コーディング規約に従う
- コーディングを完了した段階で、コードをコミットすること
- 曖昧な点があれば、都度確認すること

### 静的解析、フォーマット、テスト
- ESLintとPrettierを使用
- 静的解析、フォーマットを実行し、エラーがないことを確認した段階で、コードをコミットすること
- テストはJestとReact Testing Libraryを使用

### 作業の完了
- 1タスク分について、[静的解析、フォーマット、テスト](#静的解析、フォーマット、テスト)が終了したら作業をやめて、作業内容が正しいか確認すること
- 作業内容が正しいか確認したら、次を実施
  - コードをコミットすること
  - コードをGitHubにプッシュすること
  - GitHubのIssueに作業内容を記載すること
  - GitHubのPull Requestを作成すること

## コマンドの実行
- 必要に応じて、以下のコマンドを実行すること
  - `pnpm dev` - 開発サーバーの起動