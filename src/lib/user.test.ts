import { prismaMock } from "./singleton";
import { getUser } from "./user";

describe("getUser", () => {
    it("should return user data", async () => {
        const username = "testuser";
        const mockedUser = {
            id: "1",
            username: username,
            password: "hashedpassword",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.user.findUnique.mockResolvedValue(mockedUser);

        await expect(getUser(username)).resolves.toEqual({
            id: "1",
            username: username,
            passwordHash: "hashedpassword",
            // Dateクラスのインスタンスであることを確認
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should return null if user not found", async () => {
        const username = "nonexistentuser";

        prismaMock.user.findUnique.mockResolvedValue(null);

        await expect(getUser(username)).resolves.toBeNull();
    });

    it("should throw error on database failure", async () => {
        const username = "testuser";

        prismaMock.user.findUnique.mockRejectedValue(new Error("Database error"));

        await expect(getUser(username)).rejects.toThrow("Failed to fetch user.");
    });
});
