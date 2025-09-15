import Alert from "./Alert";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: "UI/Alert",
    component: Alert,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "ユーザーフィードバックメッセージを表示するアラートコンポーネントです。エラー、成功、警告、情報の4つのタイプをサポートしています。",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        message: {
            control: "text",
            description: "表示するメッセージ",
        },
        type: {
            control: "select",
            options: ["error", "success", "warning", "info"],
            description: "アラートのタイプ",
        },
        show: {
            control: "boolean",
            description: "アラートを表示するかどうか",
        },
        ariaLive: {
            control: "select",
            options: ["polite", "assertive", "off"],
            description: "スクリーンリーダー用のaria-live属性",
        },
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Error: Story = {
    args: {
        message: "エラーが発生しました。入力内容を確認してください。",
        type: "error",
    },
};

export const Success: Story = {
    args: {
        message: "登録が正常に完了しました。",
        type: "success",
    },
};

export const Warning: Story = {
    args: {
        message: "パスワードの有効期限が近づいています。",
        type: "warning",
    },
};

export const Info: Story = {
    args: {
        message: "新機能が追加されました。詳細はヘルプページをご確認ください。",
        type: "info",
    },
};

// 長いメッセージの例
export const LongMessage: Story = {
    name: "長いメッセージ",
    args: {
        message:
            "ユーザー名またはパスワードが正しくありません。アカウントがロックされている可能性があります。管理者にお問い合わせいただくか、パスワードリセット機能をご利用ください。",
        type: "error",
    },
};

// 非表示の例
export const Hidden: Story = {
    name: "非表示",
    args: {
        message: "このメッセージは表示されません。",
        type: "info",
        show: false,
    },
};

// 実際の使用例
export const LoginError: Story = {
    name: "ログインエラー",
    args: {
        message: "ユーザー名かパスワードが誤っています。",
        type: "error",
    },
    parameters: {
        docs: {
            description: {
                story: "ログインページで表示されるエラーメッセージの例",
            },
        },
    },
};

export const PlanCreated: Story = {
    name: "旅行プラン作成成功",
    args: {
        message: "旅行プランが正常に作成されました。",
        type: "success",
    },
    parameters: {
        docs: {
            description: {
                story: "旅行プラン作成時の成功メッセージの例",
            },
        },
    },
};

export const DataLoss: Story = {
    name: "データ消失警告",
    args: {
        message: "編集中のデータが失われる可能性があります。保存してから続行してください。",
        type: "warning",
    },
    parameters: {
        docs: {
            description: {
                story: "データが失われる可能性がある場合の警告メッセージ",
            },
        },
    },
};

// アクセシビリティの例
export const AccessibilityExamples: Story = {
    name: "アクセシビリティ例",
    args: {
        message: "サンプルメッセージ",
        type: "info",
    },
    render: () => (
        <div className="space-y-4 max-w-md">
            <div>
                <h3 className="text-sm font-medium mb-2">通常（polite）</h3>
                <Alert
                    message="この情報は重要ですが、緊急ではありません。"
                    type="info"
                    ariaLive="polite"
                />
            </div>
            <div>
                <h3 className="text-sm font-medium mb-2">緊急（assertive）</h3>
                <Alert
                    message="これは緊急のエラーメッセージです。"
                    type="error"
                    ariaLive="assertive"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "スクリーンリーダー用のaria-live属性の違いを示す例",
            },
        },
    },
};

// 全タイプの表示
export const AllTypes: Story = {
    name: "全タイプ",
    args: {
        message: "サンプルメッセージ",
        type: "info",
    },
    render: () => (
        <div className="space-y-4 max-w-md">
            <Alert message="これはエラーメッセージです。" type="error" />
            <Alert message="これは成功メッセージです。" type="success" />
            <Alert message="これは警告メッセージです。" type="warning" />
            <Alert message="これは情報メッセージです。" type="info" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "すべてのアラートタイプを表示",
            },
        },
    },
};
