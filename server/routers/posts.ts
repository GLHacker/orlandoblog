import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import * as db from "../db";
import { storagePut } from "../storage";

export const postsRouter = router({
  // Get all posts with pagination
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const posts = await db.getAllPosts(input?.limit, input?.offset);
      return posts;
    }),

  // Get single post by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const post = await db.getPostById(input.id);
      if (!post) {
        throw new Error("Post not found");
      }
      
      // Increment view count
      await db.incrementPostViews(input.id);
      
      // Get attachments
      const attachments = await db.getAttachmentsByPost(input.id);
      
      return { ...post, attachments };
    }),

  // Create new post (protected)
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        excerpt: z.string().max(500).optional(),
        imageUrl: z.string().optional(),
        category: z.string().max(100).optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db.createPost({
        userId: ctx.user.id,
        title: input.title,
        content: input.content,
        excerpt: input.excerpt,
        imageUrl: input.imageUrl,
        category: input.category,
        tags: input.tags ? JSON.stringify(input.tags) : null,
      });
      
      return { success: true };
    }),

  // Upload image for post
  uploadImage: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        base64Data: z.string(),
        mimeType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Decode base64
      const buffer = Buffer.from(input.base64Data, "base64");
      
      // Generate unique file key
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const fileKey = `posts/${ctx.user.id}/${timestamp}-${randomSuffix}-${input.filename}`;
      
      // Upload to S3
      const { url } = await storagePut(fileKey, buffer, input.mimeType);
      
      return { url, fileKey };
    }),

  // Get user's posts
  myPosts: protectedProcedure.query(async ({ ctx }) => {
    const posts = await db.getPostsByUser(ctx.user.id);
    return posts;
  }),
});
