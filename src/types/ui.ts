/**
 * UI・フォーム関連の型定義
 */

/**
 * Buttonコンポーネントのvariant
 */
export type ButtonVariant = "primary" | "secondary" | "danger";

/**
 * Buttonコンポーネントのsize
 */
export type ButtonSize = "small" | "medium" | "large";

/**
 * Alertコンポーネントのtype
 */
export type AlertType = "error" | "success" | "warning" | "info";

/**
 * Inputコンポーネントのprops
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** ラベルテキスト */
    label?: string;
}

/**
 * Buttonコンポーネントのprops
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** ボタンのバリアント */
    variant?: ButtonVariant;
    /** ボタンのサイズ */
    size?: ButtonSize;
    /** ローディング状態 */
    loading?: boolean;
    /** 子要素 */
    children: React.ReactNode;
}

/**
 * Alertコンポーネントのprops
 */
export interface AlertProps {
    /** メッセージ内容 */
    message: string;
    /** アラートのタイプ */
    type?: AlertType;
    /** 表示フラグ */
    show?: boolean;
    /** 追加のCSSクラス */
    className?: string;
    /** ARIA live属性 */
    ariaLive?: "polite" | "assertive" | "off";
}
