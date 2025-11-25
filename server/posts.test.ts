import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createTestContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("posts router", () => {
  it("should list posts without authentication", async () => {
    const publicCtx: TrpcContext = {
      user: undefined,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(publicCtx);
    const result = await caller.posts.list({ limit: 10, offset: 0 });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should create a post when authenticated", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.posts.create({
      title: "Test Post",
      content: "This is a test post content",
      excerpt: "Test excerpt",
      category: "Testing",
      tags: ["test", "vitest"],
    });

    expect(result.success).toBe(true);
  });

  it("should get user's posts when authenticated", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.posts.myPosts();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should upload image when authenticated", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Create a small test image as base64
    const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    const result = await caller.posts.uploadImage({
      filename: "test.png",
      base64Data: testImageBase64,
      mimeType: "image/png",
    });

    expect(result.url).toBeDefined();
    expect(result.fileKey).toBeDefined();
    expect(typeof result.url).toBe("string");
  });
});
