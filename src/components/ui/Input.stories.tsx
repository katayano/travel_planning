import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Input from './Input';

const meta = {
    title: 'UI/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'フォーム入力用のテキストフィールドコンポーネントです。ラベル、バリデーション状態、各種入力タイプをサポートしています。',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: '入力フィールドのラベル',
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
            description: '入力フィールドのタイプ',
        },
        placeholder: {
            control: 'text',
            description: 'プレースホルダーテキスト',
        },
        disabled: {
            control: 'boolean',
            description: '無効状態',
        },
        required: {
            control: 'boolean',
            description: '必須項目',
        },
        autoComplete: {
            control: 'text',
            description: 'オートコンプリート属性',
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Default: Story = {
    args: {
        label: 'お名前',
        placeholder: 'お名前を入力してください',
        type: 'text',
    },
};

export const Email: Story = {
    args: {
        label: 'メールアドレス',
        placeholder: 'example@email.com',
        type: 'email',
        autoComplete: 'email',
    },
};

export const Password: Story = {
    args: {
        label: 'パスワード',
        placeholder: 'パスワードを入力してください',
        type: 'password',
        autoComplete: 'current-password',
    },
};

export const Required: Story = {
    name: '必須項目',
    args: {
        label: 'ユーザー名',
        placeholder: 'ユーザー名を入力してください',
        type: 'text',
        required: true,
        autoComplete: 'username',
    },
};

export const Disabled: Story = {
    name: '無効状態',
    args: {
        label: '読み取り専用フィールド',
        value: '編集できません',
        type: 'text',
        disabled: true,
    },
};

// 数値入力の例
export const Number: Story = {
    name: '数値入力',
    args: {
        label: '年齢',
        placeholder: '年齢を入力してください',
        type: 'number',
        min: 0,
        max: 120,
    },
};

// 電話番号の例
export const Telephone: Story = {
    name: '電話番号',
    args: {
        label: '電話番号',
        placeholder: '090-1234-5678',
        type: 'tel',
        autoComplete: 'tel',
    },
};

// 検索フィールドの例
export const Search: Story = {
    name: '検索',
    args: {
        label: '検索',
        placeholder: '旅行先を検索...',
        type: 'search',
    },
};

// ラベルなしの例
export const WithoutLabel: Story = {
    name: 'ラベルなし',
    args: {
        placeholder: 'ラベルなしのフィールド',
        type: 'text',
    },
};

// 実際の使用例
export const LoginUsername: Story = {
    name: 'ログイン - ユーザー名',
    args: {
        label: 'ユーザー名',
        placeholder: 'ユーザー名を入力してください',
        type: 'text',
        required: true,
        autoComplete: 'username',
    },
    parameters: {
        docs: {
            description: {
                story: 'ログインページで使用されるユーザー名入力フィールドの例',
            },
        },
    },
};

export const LoginPassword: Story = {
    name: 'ログイン - パスワード',
    args: {
        label: 'パスワード',
        placeholder: 'パスワードを入力してください',
        type: 'password',
        required: true,
        autoComplete: 'current-password',
    },
    parameters: {
        docs: {
            description: {
                story: 'ログインページで使用されるパスワード入力フィールドの例',
            },
        },
    },
};

export const TravelPlanTitle: Story = {
    name: '旅行プランタイトル',
    args: {
        label: '旅行プランのタイトル',
        placeholder: '例：東京3日間の旅',
        type: 'text',
        required: true,
    },
    parameters: {
        docs: {
            description: {
                story: '旅行プラン作成時のタイトル入力フィールドの例',
            },
        },
    },
};

// フォーカス状態の例
export const FocusStates: Story = {
    name: 'フォーカス状態',
    args: {
        label: 'サンプル入力',
        placeholder: 'フォーカス状態のテスト',
        type: 'text',
    },
    render: () => (
        <div className="space-y-4 max-w-md">
            <Input
                label="通常状態"
                placeholder="クリックしてフォーカス"
                type="text"
            />
            <Input
                label="必須項目"
                placeholder="必須項目です"
                type="text"
                required
            />
            <Input
                label="無効状態"
                value="編集不可"
                type="text"
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '通常、必須、無効状態の入力フィールドを比較',
            },
        },
    },
};

// 各種入力タイプの例
export const AllTypes: Story = {
    name: '全入力タイプ',
    args: {
        label: 'サンプル',
        type: 'text',
    },
    render: () => (
        <div className="space-y-4 max-w-md">
            <Input label="テキスト" placeholder="テキスト入力" type="text" />
            <Input label="メール" placeholder="email@example.com" type="email" />
            <Input label="パスワード" placeholder="password" type="password" />
            <Input label="数値" placeholder="123" type="number" />
            <Input label="電話番号" placeholder="090-1234-5678" type="tel" />
            <Input label="URL" placeholder="https://example.com" type="url" />
            <Input label="検索" placeholder="検索キーワード" type="search" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'サポートされているすべての入力タイプを表示',
            },
        },
    },
};
