import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './Button';

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: '旅行計画アプリで使用される基本的なボタンコンポーネントです。様々なバリアント、サイズ、状態をサポートしています。',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'danger'],
            description: 'ボタンのスタイルバリアント',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'ボタンのサイズ',
        },
        loading: {
            control: 'boolean',
            description: 'ローディング状態',
        },
        disabled: {
            control: 'boolean',
            description: '無効状態',
        },
        children: {
            control: 'text',
            description: 'ボタンのテキスト内容',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Primary: Story = {
    args: {
        children: 'プライマリボタン',
        variant: 'primary',
        size: 'medium',
    },
};

export const Secondary: Story = {
    args: {
        children: 'セカンダリボタン',
        variant: 'secondary',
        size: 'medium',
    },
};

export const Danger: Story = {
    args: {
        children: '削除',
        variant: 'danger',
        size: 'medium',
    },
};

// サイズバリエーション
export const Small: Story = {
    args: {
        children: '小さいボタン',
        variant: 'primary',
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        children: '大きいボタン',
        variant: 'primary',
        size: 'large',
    },
};

// 状態バリエーション
export const Loading: Story = {
    args: {
        children: 'ローディング中...',
        variant: 'primary',
        size: 'medium',
        loading: true,
    },
};

export const Disabled: Story = {
    args: {
        children: '無効なボタン',
        variant: 'primary',
        size: 'medium',
        disabled: true,
    },
};

// 実際の使用例
export const LoginButton: Story = {
    name: 'ログインボタン',
    args: {
        children: 'ログイン',
        variant: 'primary',
        size: 'medium',
        type: 'submit',
    },
    parameters: {
        docs: {
            description: {
                story: 'ログインページで使用されるボタンの例',
            },
        },
    },
};

export const DeletePlanButton: Story = {
    name: '旅行プラン削除ボタン',
    args: {
        children: '削除',
        variant: 'danger',
        size: 'small',
    },
    parameters: {
        docs: {
            description: {
                story: '旅行プランを削除する際に使用される危険なアクションのボタン',
            },
        },
    },
};

// インタラクティブな例
export const AllVariants: Story = {
    name: '全バリアント',
    args: {
        children: 'サンプルボタン'
    },
    render: () => (
        <div className="space-y-4">
            <div className="space-x-2">
                <Button variant="primary" size="small">小プライマリ</Button>
                <Button variant="primary" size="medium">中プライマリ</Button>
                <Button variant="primary" size="large">大プライマリ</Button>
            </div>
            <div className="space-x-2">
                <Button variant="secondary" size="small">小セカンダリ</Button>
                <Button variant="secondary" size="medium">中セカンダリ</Button>
                <Button variant="secondary" size="large">大セカンダリ</Button>
            </div>
            <div className="space-x-2">
                <Button variant="danger" size="small">小デンジャー</Button>
                <Button variant="danger" size="medium">中デンジャー</Button>
                <Button variant="danger" size="large">大デンジャー</Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'すべてのバリアントとサイズの組み合わせを表示',
            },
        },
    },
};
