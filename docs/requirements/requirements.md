# 要件定義

## 機能詳細

### 共通
#### デザイン
- サイト全体の色はTailWind CSSのorange-500を基調とする
- テキストの色はTailWind CSSのorange-50を使用する
- フォントはNoto Sans JPを使用する
- エラーメッセージは赤色で表示する
- 成功メッセージは緑色で表示する
- 全ページでレスポンシブデザインを適用する

#### ヘッダー
- [ ] ログイン後の全ページにヘッダーを表示
  - [ ] ヘッダーにはサイト名、ログアウトボタンを配置
  - [ ] サイト名をクリックするとTOPページにリダイレクト
  - [ ] ログアウトボタンはクリックでログアウト処理を実行し、ログインページにリダイレクト

#### ユーザー認証
- [ ] ログイン後の全ページについて、ページ遷移前にログイン状態を確認し、未ログインの場合はログインページにリダイレクトする

### ログインページ
- [ ] ユーザー名とパスワードを入力するフォームを表示
- [ ] ログインボタンを配置
- [ ] ログイン失敗時はエラーメッセージを表示
- [ ] ログイン成功時はTOPページにリダイレクト

### TOPページ
- [ ] ヘッダーの下に、「[予定タブ](#予定タブ)」「[記録タブ](#記録タブ)」を表示

#### 予定タブ
- [ ] タブの下に[旅行プラン一覧](#旅行プラン一覧)セクションを表示

##### 旅行プラン一覧
- [ ] ヘッダ右側に、旅行プランの「新規作成」ボタンを配置。ボタン押下すると[旅行プラン作成ページ](#旅行プラン作成ページ)に遷移
- [ ] セクションの内容は次の通り
  - [ ] ユーザーが作成した旅行プランのカードを表示
  - [ ] 各カードには、旅行プランのタイトル、作成日、旅行日を表示
  - [ ] カードをクリックすると、該当する旅行プランの詳細ページに遷移
  - [ ] カードの下に「編集」ボタンと「削除」ボタンを配置
  - [ ] 「編集」ボタンをクリックすると、該当する旅行プランの[旅行プラン編集ページ](#旅行プラン編集ページ)に遷移
  - [ ] 「削除」ボタンをクリックすると、該当する旅行プランを削除する確認ダイアログを表示
    - [ ] 確認ダイアログで「OK」をクリックすると、該当する旅行プランを削除し、TOPページにリダイレクト
    - [ ] 確認ダイアログで「キャンセル」をクリックすると、何もしない
  - [ ] 旅行プランが存在しない場合は「旅行プランがありません」と表示

### 旅行プラン作成ページ
- [ ] フォームを表示する。フォームの内容は次の通り
  - [ ] 旅行プランのタイトルを入力できるようにする
  - [ ] 旅行プランの説明を入力できるようにする
  - [ ] カレンダーを表示し、旅行プランの開始日を選択できるようにする
- [ ] 選択された開始日に登録されている旅行スケジュールを時系列で表示する
  - [ ] 各旅行スケジュールは、タイトルを表示する
- [ ] 旅行スケジュールは[旅行スケジュール入力ダイアログ](#旅行スケジュール入力ダイアログ)から登録
- [ ] 「作成」ボタンを配置し、クリックで旅行プランを作成
- [ ] 作成成功時はTOPページにリダイレクト
- [ ] 作成失敗時はエラーメッセージを表示

#### 旅行スケジュール入力ダイアログ
- [ ] 旅行スケジュールを入力するフォームを表示
  - [ ] フォームには、タイトル、開始日時、終了日時、行き先、詳細を入力できるようにする
- [ ] 「追加」ボタンを配置し、クリックで旅行スケジュールを追加
- [ ] 追加成功時はダイアログを閉じて、旅行プラン作成ページのフォームに反映
- [ ] 追加失敗時はエラーメッセージを表示

### 旅行プラン編集ページ
- [ ] 旅行プラン作成ページと同様のフォームを表示する
- [ ] 画面表示時に、現在設定されている旅行プランのタイトル、説明、開始日をフォームに反映する
  
#### 記録タブ
- [ ] タブの下に[旅行記録一覧](#旅行記録一覧)セクションを表示
- [ ] ヘッダ右側に、旅行記録の「新規作成」ボタンを配置。ボタン押下すると[旅行記録作成ページ](#旅行記録作成ページ)に遷移
- [ ] セクションの内容は次の通り
  - [ ] ユーザーが作成した旅行記録のカードを表示
  - [ ] 各カードには、旅行記録のタイトル、作成日、旅行日を表示
  - [ ] カードをクリックすると、該当する旅行記録の詳細ページに遷移
  - [ ] カードの下に「編集」ボタンと「削除」ボタンを配置
  - [ ] 「編集」ボタンをクリックすると、該当する旅行記録の[旅行記録編集ページ](#旅行記録編集ページ)に遷移
  - [ ] 「削除」ボタンをクリックすると、該当する旅行記録を削除する確認ダイアログを表示
    - [ ] 確認ダイアログで「OK」をクリックすると、該当する旅行記録を削除し、TOPページにリダイレクト
    - [ ] 確認ダイアログで「キャンセル」をクリックすると、何もしない
  - [ ] 旅行記録が存在しない場合は「旅行記録がありません」と表示

### 旅行記録作成ページ
- [ ] 旅行プラン作成ページと同様のフォームを表示する

### 旅行記録編集ページ
- [ ] 旅行記録作成ページと同様のフォームを表示する
- [ ] 画面表示時に、現在設定されている旅行記録のタイトル、説明、旅行日をフォームに反映する