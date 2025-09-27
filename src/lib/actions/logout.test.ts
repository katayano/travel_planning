import { signOut } from "@/auth";
import { logout } from "@/lib/actions/logout";

jest.mock("@/auth", () => ({
    signOut: jest.fn(),
}));

const mockSignOut = signOut as jest.MockedFunction<any>;

describe("logout action", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("基本的な動作", () => {
        it("signOutが呼ばれることを確認", async () => {
            mockSignOut.mockResolvedValue(undefined as any);

            await logout();

            expect(mockSignOut).toHaveBeenCalledTimes(1);
            expect(mockSignOut).toHaveBeenCalledWith({
                redirectTo: "/login",
            });
        });
    });
});
