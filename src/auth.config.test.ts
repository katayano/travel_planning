import { authConfig } from './auth.config';

// NextAuth の型をモック
interface MockSession {
  user?: {
    id: string;
    name?: string;
  };
  expires: string;
}

// NextRequest の最小限のモック
class MockNextRequest {
  nextUrl: {
    pathname: string;
    origin: string;
    href: string;
    toString(): string;
  };

  constructor(pathname: string) {
    const origin = 'http://localhost:3000';
    const href = `${origin}${pathname}`;
    this.nextUrl = {
      pathname,
      origin,
      href,
      toString: () => href
    };
  }
}

describe('authConfig', () => {
  const { authorized } = authConfig.callbacks;

  describe('authorized callback', () => {
    it('未認証ユーザーが/travel-planningにアクセスするとfalseを返す', () => {
      const mockAuth: MockSession | null = null;
      const mockRequest = new MockNextRequest('/travel-planning') as any;

      const result = authorized({ auth: mockAuth, request: mockRequest });
      expect(result).toBe(false);
    });

    it('認証済みユーザーが/travel-planningにアクセスするとtrueを返す', () => {
      const mockAuth: MockSession = {
        user: { id: '1', name: 'testuser' },
        expires: '2025-01-01'
      };
      const mockRequest = new MockNextRequest('/travel-planning') as any;

      const result = authorized({ auth: mockAuth, request: mockRequest });
      expect(result).toBe(true);
    });

    it('認証済みユーザーがその他のページにアクセスするとリダイレクトレスポンスを返す', () => {
      const mockAuth: MockSession = {
        user: { id: '1', name: 'testuser' },
        expires: '2025-01-01'
      };
      const mockRequest = new MockNextRequest('/login') as any;

      // Response.redirect をモック
      const mockResponse = {} as Response;
      const originalResponse = global.Response;
      global.Response = {
        ...originalResponse,
        redirect: jest.fn().mockReturnValue(mockResponse)
      } as any;

      const result = authorized({ auth: mockAuth, request: mockRequest });

      expect(global.Response.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          href: expect.stringContaining('/travel-planning')
        })
      );
      expect(result).toBe(mockResponse);

      // モックを元に戻す
      global.Response = originalResponse;
    });

    it('未認証ユーザーがその他のページにアクセスするとtrueを返す', () => {
      const mockAuth: MockSession | null = null;
      const mockRequest = new MockNextRequest('/login') as any;

      const result = authorized({ auth: mockAuth, request: mockRequest });
      expect(result).toBe(true);
    });

    it('未認証ユーザーがルートページにアクセスするとtrueを返す', () => {
      const mockAuth: MockSession | null = null;
      const mockRequest = new MockNextRequest('/') as any;

      const result = authorized({ auth: mockAuth, request: mockRequest });
      expect(result).toBe(true);
    });

    it('/travel-planning/subpageも保護される', () => {
      const mockAuth: MockSession | null = null;
      const mockRequest = new MockNextRequest('/travel-planning/create') as any;

      const result = authorized({ auth: mockAuth, request: mockRequest });
      expect(result).toBe(false);
    });

    it('認証済みユーザーが/travel-planning/subpageにアクセスできる', () => {
      const mockAuth: MockSession = {
        user: { id: '1', name: 'testuser' },
        expires: '2025-01-01'
      };
      const mockRequest = new MockNextRequest('/travel-planning/create') as any;

      const result = authorized({ auth: mockAuth, request: mockRequest });
      expect(result).toBe(true);
    });
  });

  describe('configuration', () => {
    it('正しいsignInページが設定されている', () => {
      expect(authConfig.pages.signIn).toBe('/login');
    });

    it('プロバイダーが空の配列として設定されている', () => {
      expect(authConfig.providers).toEqual([]);
    });

    it('authorizedコールバックが存在する', () => {
      expect(typeof authConfig.callbacks.authorized).toBe('function');
    });
  });
});
