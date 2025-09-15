import { authenticate } from './login';
import { signIn } from '@/auth';

// next-authを軽量にモック
jest.mock('next-auth', () => ({
    AuthError: class AuthError extends Error {
        type: string;
        constructor(message: string, type: string = '') {
            super(message);
            this.name = 'AuthError';
            this.type = type;
        }
    }
}));

jest.mock('@/auth', () => ({
    signIn: jest.fn(),
}));

// モック関数の型定義
const mockSignIn = signIn as jest.MockedFunction<any>;

describe('authenticate', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('有効な認証情報で成功する', async () => {
        // 成功時のモック設定
        mockSignIn.mockResolvedValue({} as any);

        const formData = new FormData();
        formData.append('username', 'validuser');
        formData.append('password', 'validpassword');
        formData.append('redirectTo', '/travel-planning');

        const result = await authenticate(undefined, formData);

        expect(mockSignIn).toHaveBeenCalledWith('credentials', formData);
        expect(result).toBeUndefined();
    });

    it('実際のAuthErrorでCredentialsSigninエラーメッセージを返す', async () => {
        // モックされたAuthErrorクラスを使用
        const { AuthError } = require('next-auth');
        const authError = new AuthError('Invalid credentials', 'CredentialsSignin');
        mockSignIn.mockRejectedValue(authError);

        const formData = new FormData();
        formData.append('username', 'invaliduser');
        formData.append('password', 'wrongpassword');
        formData.append('redirectTo', '/travel-planning');

        const result = await authenticate(undefined, formData);

        expect(mockSignIn).toHaveBeenCalledWith('credentials', formData);
        expect(result).toBe('ユーザー名かパスワードが誤っています。');
    });

    it('その他のAuthErrorタイプで予期しないエラーメッセージを返す', async () => {
        // モックされたAuthErrorクラスを使用（CredentialsSignin以外のタイプ）
        const { AuthError } = require('next-auth');
        const authError = new AuthError('Some other auth error', 'OtherAuthError');
        mockSignIn.mockRejectedValue(authError);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'testpassword');
        formData.append('redirectTo', '/travel-planning');

        const result = await authenticate(undefined, formData);

        expect(mockSignIn).toHaveBeenCalledWith('credentials', formData);
        expect(result).toBe('予期しないエラーが発生しました。');
    });

    it('AuthError以外のエラーは再スローされる', async () => {
        // 一般的なエラーのモック
        const generalError = new Error('Network error');
        mockSignIn.mockRejectedValue(generalError);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'testpassword');
        formData.append('redirectTo', '/travel-planning');

        await expect(authenticate(undefined, formData)).rejects.toThrow('Network error');
    });

    it('prevStateパラメータが入力されても正常に動作する', async () => {
        // prevStateがあっても正常に動作することをテスト
        mockSignIn.mockResolvedValue({} as any);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'testpassword');

        const result = await authenticate('previous error message', formData);

        expect(mockSignIn).toHaveBeenCalledWith('credentials', formData);
        expect(result).toBeUndefined();
    });
});
