/**
 * 認証フローの統合テスト
 * LoginForm、authenticate action、auth.config の連携をテスト
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/features/login/LoginForm';

// 必要なモック

// Server Actionをモック
jest.mock("@/lib/actions/login", () => ({
  authenticate: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'callbackUrl') return '/travel-planning';
      return null;
    },
  }),
}));

// useActionState のモック
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

const mockAuthenticate = require("@/lib/actions/login").authenticate as jest.MockedFunction<any>;
const mockUseActionState = require('react').useActionState as jest.MockedFunction<any>;

describe('Authentication Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // デフォルトの useActionState モック設定
    mockUseActionState.mockReturnValue([
      undefined, // errorMessage
      mockAuthenticate, // formAction
      false, // isPending
    ]);
  });

  describe('成功時のフロー', () => {
    it('有効な認証情報でログインが成功する', async () => {
      const user = userEvent.setup();

      // 成功時の設定
      mockAuthenticate.mockResolvedValue(undefined);

      render(<LoginForm />);

      // フォーム入力
      const usernameInput = screen.getByLabelText(/ユーザー名/);
      const passwordInput = screen.getByLabelText(/パスワード/);

      await user.type(usernameInput, 'validuser');
      await user.type(passwordInput, 'validpassword');

      // フォーム送信
      const submitButton = screen.getByRole('button', { name: /ログイン/ });
      await user.click(submitButton);

      // authenticate が呼ばれることを確認
      expect(mockAuthenticate).toHaveBeenCalled();
    });
  });

  describe('エラー時のフロー', () => {
    it('無効な認証情報でエラーメッセージが表示される', async () => {
      const errorMessage = 'ユーザー名かパスワードが誤っています。';

      // エラー時の useActionState モック設定
      mockUseActionState.mockReturnValue([
        errorMessage, // errorMessage
        mockAuthenticate, // formAction
        false, // isPending
      ]);

      render(<LoginForm />);

      // エラーメッセージが表示されることを確認
      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(errorMessage);
    });

    it('aria-disabledがtrueになる', async () => {
      // ローディング中の useActionState モック設定
      mockUseActionState.mockReturnValue([
        undefined, // errorMessage
        mockAuthenticate, // formAction
        true, // isPending
      ]);

      render(<LoginForm />);

      const submitButton = screen.getByRole('button', { name: /ログイン/ });
      expect(submitButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('エラー状態でも再度送信が可能', async () => {
      const user = userEvent.setup();
      const errorMessage = 'ユーザー名かパスワードが誤っています。';

      // 最初はエラー状態
      mockUseActionState.mockReturnValue([
        errorMessage,
        mockAuthenticate,
        false,
      ]);

      render(<LoginForm />);

      // エラーメッセージが表示されている
      expect(screen.getByRole('alert')).toBeInTheDocument();

      // フォームは有効で再送信可能
      const usernameInput = screen.getByLabelText(/ユーザー名/);
      const passwordInput = screen.getByLabelText(/パスワード/);
      const submitButton = screen.getByRole('button', { name: /ログイン/ });

      expect(usernameInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();

      // 再度フォーム入力と送信
      await user.clear(usernameInput);
      await user.clear(passwordInput);
      await user.type(usernameInput, 'newuser');
      await user.type(passwordInput, 'newpassword');
      await user.click(submitButton);

      expect(mockAuthenticate).toHaveBeenCalled();
    });
  });

  describe('プロパティ経由のエラー表示', () => {
    it('error プロパティ経由でエラーメッセージが表示される', () => {
      const externalError = 'サーバーエラーが発生しました。';

      render(<LoginForm error={externalError} />);

      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(externalError);
    });

    it('プロパティのエラーが useActionState のエラーより優先される', () => {
      const externalError = 'サーバーエラーが発生しました。';
      const internalError = 'ユーザー名かパスワードが誤っています。';

      // useActionState からのエラー
      mockUseActionState.mockReturnValue([
        internalError,
        mockAuthenticate,
        false,
      ]);

      render(<LoginForm error={externalError} />);

      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toHaveTextContent(externalError);
      expect(errorAlert).not.toHaveTextContent(internalError);
    });
  });

  describe('フォームの基本機能', () => {
    it('callbackUrl が hidden input として設定される', () => {
      render(<LoginForm />);

      const hiddenInput = document.querySelector('input[name="redirectTo"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute('value', '/travel-planning');
    });

    it('適切な form action が設定される', () => {
      render(<LoginForm />);

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('action');
    });
  });
});
