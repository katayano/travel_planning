# TOPページ新規作成ボタン機能 タスク分割

## 概要
TOPページに画面右下固定配置の新規作成ボタンを実装し、旅行プラン作成ページへの遷移機能を提供する

## 要件詳細（最新版反映）
### UI・配置要件
- 画面右下に固定配置（フローティングボタン）
- 「＋」アイコン + 「旅行プランを作成」テキスト表示
- クリックで旅行プラン作成ページに遷移
- **注意**: 過去の旅行セクションの旅行記録作成ボタンとは別機能

### デザイン要件
- Tailwind CSS orange-500基調
- テキスト色: orange-50
- フォント: Noto Sans JP
- レスポンシブデザイン対応
- ホバー・アクティブ・フォーカス状態のスタイル

### 技術要件
- TypeScript厳密な型定義（any型禁止）
- Next.js App Router使用
- Next.js Link使用でナビゲーション
- 関数コンポーネント使用
- デフォルトエクスポート
- **既存Buttonコンポーネントの活用でデザインシステム統一**

## タスク分割

### Task 1: 旅行プラン作成用フローティングボタン作成
**ファイル**: `src/app/(authenticated)/travel-planning/components/CreatePlanFloatingButton.tsx`

#### 要件
- **既存Buttonコンポーネントの活用**
  - `src/components/ui/Button.tsx`を使用
  - 既存のvariant="primary"、size="medium"を活用
  - 一貫したデザインシステムの維持

- **実装内容**
  - 画面右下固定配置のコンテナ (fixed position)
  - Next.js Linkでラップしてページ遷移
  - Button内にアイコン+テキストを配置
  - レスポンシブ対応（モバイル：アイコンのみ、デスクトップ：アイコン+テキスト）

#### 実装方針
```typescript
// シンプルな組み合わせ（props不要）
export default function CreatePlanFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
  <Link href="/travel-planning/create">
        <Button variant="primary" size="medium">
          <div className="flex items-center space-x-2">
            <PlusIcon size={20} />
            <span className="hidden sm:inline">旅行プランを作成</span>
          </div>
        </Button>
      </Link>
    </div>
  );
}
```

### Task 2: 旅行プラン作成ボタンのテスト作成
**ファイル**: `src/app/(authenticated)/travel-planning/components/CreatePlanFloatingButton.test.tsx`

#### テストケース
1. 基本的なレンダリング確認
2. 正しいリンク遷移先の確認（/travel-planning/create）
3. プラスアイコンとテキストの表示確認
4. レスポンシブ表示の確認（モバイル：アイコンのみ、デスクトップ：アイコン+テキスト）
5. 既存Buttonコンポーネントのvariant="primary"適用確認
6. アクセシビリティ属性の確認

### Task 3: 旅行プラン作成ページ基本構造作成
**ファイル**: `src/app/(authenticated)/travel-planning/create/page.tsx`

#### 要件
- 基本的なページ構造作成
- 仮のフォーム表示（詳細実装は別タスク）
- TOPページへの戻るリンク
- ページタイトル設定

#### 実装内容
- 認証済みレイアウト使用
- ページヘッダー表示
- プレースホルダーコンテンツ
- ナビゲーション確認用

### Task 4: TOPページへの新規作成ボタン組み込み
**ファイル**: `src/app/(authenticated)/travel-planning/page.tsx`

#### 変更内容
- CreatePlanFloatingButtonコンポーネントのインポート
- 画面右下への配置
- 既存レイアウトとの調整

#### 組み込み仕様
- 遷移先: `/travel-planning/create`
- 表示内容: プラスアイコン + 「旅行プランを作成」テキスト
- 配置: 画面右下固定

### Task 5: プラスアイコンコンポーネント作成
**ファイル**: `src/app/(authenticated)/travel-planning/components/PlusIcon.tsx`

#### 要件
- SVGベースのプラスアイコン
- シンプルな実装（CreatePlanFloatingButton専用）
- size propsのみ対応

#### 実装仕様
```typescript
interface PlusIconProps {
  size?: number;
}

export default function PlusIcon({ size = 24 }: PlusIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
```

### Task 6: 統合テストと動作確認
**ファイル**: 複数ファイル

#### テスト内容
- TOPページでのボタン表示確認
- クリック時の正しいページ遷移
- レスポンシブ動作確認
- アクセシビリティ確認

#### 確認項目
- [ ] ボタンが画面右下に固定表示される
- [ ] クリックで旅行プラン作成ページに遷移する
- [ ] アイコンとテキストが適切に表示される
- [ ] モバイル・デスクトップで正常動作する
- [ ] ホバー・フォーカス状態が機能する

### Task 7: ESLint・Prettier・テスト実行
**対象**: 新規作成・変更ファイル全て

#### 実行内容
- ESLint静的解析実行
- Prettierフォーマット適用
- 全テストスイート実行
- TypeScript型チェック

## 受け入れ基準
- [ ] TypeScript厳格な型定義（any型禁止）
- [ ] 既存Buttonコンポーネントの活用
- [ ] レスポンシブデザイン対応（モバイル：アイコンのみ、デスクトップ：アイコン+テキスト）
- [ ] 関数コンポーネント使用
- [ ] デフォルトエクスポート
- [ ] Next.js App Router準拠
- [ ] 包括的なテストスイート
- [ ] ESLint/Prettier準拠
- [ ] アクセシビリティ対応

## 完了後の確認項目
- [ ] 全テスト通過
- [ ] ESLint警告なし
- [ ] TypeScript型チェック成功
- [ ] Prettierフォーマット完了
- [ ] ページ遷移が正常動作
- [ ] レスポンシブデザイン確認完了