# 旅行プラン作成ページ - フォーム実装タスク

## 概要
requirements.mdの「旅行プラン作成ページ」の中から、以下の要件を実装します:
- フォームを表示する。フォームの内容は次の通り
  - 旅行プランのタイトルを入力できるようにする
  - 旅行プランの説明を入力できるようにする
  - 「旅行スケジュール作成」ボタン押下で旅行スケジュール入力ダイアログから登録
  - 作成した旅行スケジュールを時系列で表示する（タイトルのみ表示）
  - フォーム下部に「作成」ボタンを配置し、クリックで旅行プランを作成
  - 作成成功時はTOPページにリダイレクト
  - 作成失敗時はエラーメッセージを表示

## タスク分割

### タスク1: 旅行スケジュール入力ダイアログコンポーネントの作成
**目的**: 旅行スケジュールを入力するダイアログコンポーネントを作成する

**実装内容**:
- `src/app/(authenticated)/travel-planning/create/components/TravelScheduleDialog.tsx`を作成
- ダイアログは`use client`ディレクティブを使用したClient Component
- ダイアログのUI（モーダル表示、背景オーバーレイ）を実装
- 以下のフィールドを含むフォーム:
  - タイトル入力欄（必須、type="text"）
  - 開始日時入力欄（必須、`<input type="datetime-local">`を使用）
  - 終了日時入力欄（必須、`<input type="datetime-local">`を使用）
  - 行き先入力欄（任意、type="text"）
  - 詳細入力欄（任意、`textarea`要素を使用）
- useState でフォームの状態を管理
- バリデーション:
  - タイトルは必須、1文字以上100文字以下
  - 開始日時は必須
  - 終了日時は必須、開始日時より後の時刻
  - 行き先は200文字以下
  - 詳細は500文字以下
- エラーメッセージの表示（各フィールドの下に赤色で表示）
- 「追加」ボタンと「キャンセル」ボタンを配置
- スタイリングはTailwind CSSのorange-500を基調とする

**Props定義**:
```typescript
interface TravelScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (schedule: TravelScheduleData) => void;
}

interface TravelScheduleData {
  title: string;
  startDateTime: string; // ISO 8601形式
  endDateTime: string; // ISO 8601形式
  destination?: string;
  details?: string;
}
```

**テスト内容**:
- isOpen=trueの場合、ダイアログが表示されること
- isOpen=falseの場合、ダイアログが非表示になること
- 各フィールドが正しくレンダリングされること
- 入力値が正しく反映されること
- バリデーションエラーが正しく表示されること
- タイトルが未入力の場合、エラーメッセージが表示されること
- 終了日時が開始日時より前の場合、エラーメッセージが表示されること
- 全ての入力が正常な場合、「追加」ボタン押下でonAddが呼ばれること
- 「キャンセル」ボタン押下でonCloseが呼ばれること
- 背景オーバーレイクリックでonCloseが呼ばれること

**ファイル**:
- `src/app/(authenticated)/travel-planning/create/components/TravelScheduleDialog.tsx`
- `src/app/(authenticated)/travel-planning/create/components/TravelScheduleDialog.test.tsx`

---

### タスク2: 旅行スケジュールリスト表示コンポーネントの作成
**目的**: 作成した旅行スケジュールを時系列で表示するコンポーネントを作成する

**実装内容**:
- `src/app/(authenticated)/travel-planning/create/components/TravelScheduleList.tsx`を作成
- 旅行スケジュールの配列を受け取り、開始日時の昇順で表示
- 各スケジュールには以下を表示:
  - タイトル
  - 開始日時（フォーマット: YYYY/MM/DD HH:mm）
- スケジュールが0件の場合は「旅行スケジュールがありません」と表示
- スタイリングはTailwind CSSのorange-500を基調とする

**Props定義**:
```typescript
interface TravelScheduleListProps {
  schedules: TravelScheduleData[];
}
```

**テスト内容**:
- スケジュールが0件の場合、「旅行スケジュールがありません」と表示されること
- スケジュールが複数件ある場合、開始日時の昇順で表示されること
- 各スケジュールのタイトルと開始日時が正しく表示されること

**ファイル**:
- `src/app/(authenticated)/travel-planning/create/components/TravelScheduleList.tsx`
- `src/app/(authenticated)/travel-planning/create/components/TravelScheduleList.test.tsx`

---

### タスク3: 旅行プラン入力フォームコンポーネントの作成
**目的**: 旅行プランのタイトルと説明を入力できるフォームコンポーネントを作成する

**実装内容**:
- `src/app/(authenticated)/travel-planning/create/components/TravelPlanForm.tsx`を作成
- フォームは`use client`ディレクティブを使用したClient Component
- 以下のフィールドを含むフォーム:
  - タイトル入力欄（`Input`コンポーネントを使用、必須、type="text"）
  - 説明入力欄（`textarea`要素を使用、必須、複数行入力可能）
- 「旅行スケジュール作成」ボタンを配置
- TravelScheduleDialogコンポーネントを組み込み、ボタン押下で表示
- TravelScheduleListコンポーネントを組み込み、追加されたスケジュールを表示
- フォーム下部に「作成」ボタンを配置
- useState でフォームの状態（タイトル、説明、スケジュール配列、ダイアログ表示状態）を管理
- バリデーション:
  - タイトルは必須、1文字以上100文字以下
  - 説明は必須、1文字以上500文字以下
  - 旅行スケジュールは1件以上必須
- エラーメッセージの表示（各フィールドの下に赤色で表示）
- スタイリングはTailwind CSSのorange-500を基調とする

**Props定義**:
```typescript
interface TravelPlanFormProps {
  onSubmit: (data: TravelPlanFormData) => void;
  isSubmitting?: boolean;
}

interface TravelPlanFormData {
  title: string;
  description: string;
  schedules: TravelScheduleData[];
}
```

**テスト内容**:
- フォームの各フィールドが正しくレンダリングされること
- 入力値が正しく反映されること
- 「旅行スケジュール作成」ボタン押下でダイアログが表示されること
- ダイアログで追加したスケジュールがリストに表示されること
- バリデーションエラーが正しく表示されること
- タイトルが未入力の場合、エラーメッセージが表示されること
- 説明が未入力の場合、エラーメッセージが表示されること
- スケジュールが0件の場合、エラーメッセージが表示されること
- 全ての入力が正常な場合、onSubmitが呼ばれること
- isSubmitting=trueの場合、送信ボタンが無効化されること

**ファイル**:
- `src/app/(authenticated)/travel-planning/create/components/TravelPlanForm.tsx`
- `src/app/(authenticated)/travel-planning/create/components/TravelPlanForm.test.tsx`

---

### タスク4: 旅行プラン作成ページへのフォーム組み込み
**目的**: 作成したフォームコンポーネントを旅行プラン作成ページに組み込む

**実装内容**:
- `src/app/(authenticated)/travel-planning/create/page.tsx`を更新
- TravelPlanFormコンポーネントをインポートして配置
- 既存のプレースホルダーフォームを削除し、TravelPlanFormに置き換え
- フォーム送信時の処理（onSubmit）を実装:
  - 現時点ではコンソールログにフォームデータを出力
  - 成功メッセージを表示（後のタスクで実際の保存処理を実装）
- エラーハンドリングの実装
- ページ全体のレイアウトを維持

**テスト内容**:
- ページが正しくレンダリングされること
- TravelPlanFormコンポーネントが表示されること
- ヘッダーとリンクが正しく表示されること
- フォーム送信時にコンソールログが出力されること

**ファイル**:
- `src/app/(authenticated)/travel-planning/create/page.tsx`
- `src/app/(authenticated)/travel-planning/create/page.test.tsx`（既存ファイルを更新）

---

## 注意事項
- タスクは順番に実装すること（タスク1→タスク2→タスク3→タスク4）
- 実際のDB保存処理は別タスクで実装するため、現時点では含めない
- 既存のInputコンポーネント(`src/components/ui/Input.tsx`)を活用すること
- 過度な抽象化は避け、シンプルな実装を心がけること
- タスク3では、タスク1とタスク2で作成したコンポーネントを組み合わせて使用する
