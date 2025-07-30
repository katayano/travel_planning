# Issue #2 Task 3: ログインボタンコンポーネント作成

## 概要
再利用可能なButtonコンポーネント (`src/components/ui/Button.tsx`) を作成し、LoginFormコンポーネントと統合する。

## タスク分割

### Task 3.1: Buttonコンポーネントの設計・実装
**ファイル**: `src/components/ui/Button.tsx`

#### 要件
- **TypeScript厳密型定義**
  - ButtonPropsインターフェース定義
  - variant, size, loading, disabled等のプロパティ対応
  - HTMLButtonElementの属性を継承

- **デザイン仕様（コーディング規約準拠）**
  - Tailwind CSS orange-500基調
  - テキスト色: orange-50
  - レスポンシブデザイン対応
  - ホバー・アクティブ・フォーカス状態
  - 無効化・ローディング状態のスタイル

- **機能要件**
  - primary/secondary等のvariant対応
  - small/medium/large等のsize対応
  - loading状態でスピナー表示
  - disabled状態対応
  - 子要素（children）対応

#### 実装方針
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
}
```

### Task 3.2: Buttonコンポーネントのテスト作成
**ファイル**: `src/components/ui/Button.test.tsx`

#### テストケース
1. 基本的なレンダリング確認
2. variantプロパティのスタイル適用確認
3. sizeプロパティのスタイル適用確認
4. loading状態の動作確認（スピナー表示）
5. disabled状態の動作確認
6. クリックイベントの動作確認
7. カスタム属性（className等）の適用確認

### Task 3.3: LoginFormとButtonコンポーネントの統合
**ファイル**: `src/components/features/login/LoginForm.tsx`

#### 変更内容
- ハードコードされたbuttonエレメントをButtonコンポーネントに置き換え
- 既存のローディング状態、無効化状態をButtonのpropsとして渡す
- 既存のスタイルと機能を維持

#### 更新対象
- LoginFormのボタン部分を `<Button>` コンポーネントに変更
- loading, disabled プロパティの適切な受け渡し

### Task 3.4: LoginForm.test.tsxの更新
**ファイル**: `src/components/features/login/LoginForm.test.tsx`

#### 更新内容
- Buttonコンポーネント統合後のテスト修正
- 既存のテストケースが正常に動作することを確認

## 受け入れ基準
- [ ] TypeScript厳格な型定義（any型禁止）
- [ ] Tailwind CSS orange-500基調のスタイリング
- [ ] レスポンシブデザイン対応
- [ ] 関数コンポーネント使用
- [ ] デフォルトエクスポート
- [ ] Props drilling回避の設計
- [ ] エラーハンドリング含む
- [ ] 包括的なテストスイート
- [ ] ESLint/Prettier準拠
- [ ] 既存LoginForm機能の維持

## 完了後の確認項目
- [ ] 全テスト通過
- [ ] ESLint警告なし
- [ ] TypeScript型チェック成功
- [ ] Prettierフォーマット完了
- [ ] LoginFormの既存機能が正常動作
